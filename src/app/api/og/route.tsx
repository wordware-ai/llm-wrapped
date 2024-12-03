// DESIGN OG IMAGE FOR LLMWRAPPED

import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontStyle: "normal",
              color: "#000",
              marginBottom: 40,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            LLMwrapped Results
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log({ e });
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
