import { env } from "@/env";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ promptId: string }> },
) {
  const promptId = (await params).promptId;

  const response = await fetch(
    `https://app.wordware.ai/api/released-app/${promptId}/run`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.WORDWARE_API_KEY}`,
      },
      body: JSON.stringify(await request.json()),
    },
  );

  console.log(response);

  if (!response.ok) {
    return Response.json(
      { error: `API responded with status ${response.status}` },
      { status: response.status },
    );
  }

  const reader = response.body?.getReader();
  if (!reader) {
    return Response.json({ error: "No reader available" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer: string[] = [];

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            controller.close();
            return;
          }

          const chunk = decoder.decode(value);

          for (const char of chunk) {
            if (char === "\n") {
              const line = buffer.join("").trim();
              if (!line) {
                buffer = [];
                continue;
              }

              try {
                const content = JSON.parse(line) as {
                  type: "chunk";
                  value: {
                    type: string;
                    value?: string | Record<string, unknown>;
                    state?: string;
                    id?: string;
                    label?: string;
                    isStructured?: boolean;
                    path?: string;
                    output?: Record<string, unknown>;
                  };
                };

                if (
                  content.type === "chunk" &&
                  content.value?.type === "chunk" &&
                  typeof content.value.value === "string"
                ) {
                  controller.enqueue(encoder.encode(content.value.value));
                }

                buffer = [];
              } catch (error) {
                console.error("Error parsing JSON:", error);
                buffer = [];
              }
            } else {
              buffer.push(char);
            }
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
