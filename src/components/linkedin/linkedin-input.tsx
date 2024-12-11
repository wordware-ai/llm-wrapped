import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Import the loading icon

export function LinkedinInput() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const getUsername = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2] ?? urlParts[urlParts.length - 1];
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const username = getUsername(url);
    try {
      router.push(`/linkedin/${username}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        className="bg-white sm:w-96"
        placeholder="LinkedIn url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isLoading}
      />
      <Button
        className="bg-[#0A66C2] hover:bg-[#0A66C2]/90"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          "View"
        )}
      </Button>
    </form>
  );
}
