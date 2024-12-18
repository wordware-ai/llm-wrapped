import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function LinkedinInput() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const validateLinkedInUrl = (url: string) => {
    const linkedInRegex = /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[\w-]+/;
    return linkedInRegex.test(url);
  };

  const getUsername = (url: string) => {
    try {
      // Create URL object to parse the URL
      const urlObject = new URL(url);
      // Get the pathname (e.g., "/in/username")
      const pathParts = urlObject.pathname.split("/").filter(Boolean);
      // Get the username (last part after /in/)
      return pathParts[pathParts.length - 1];
    } catch {
      return "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateLinkedInUrl(url)) {
      setError(
        "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)",
      );
      return;
    }

    const username = getUsername(url);
    if (!username) {
      setError("Could not extract username from URL");
      return;
    }

    router.push(`/linkedin/${username}`);

    setIsLoading(false);
  };

  return (
    <div className="flex w-min flex-col gap-6">
      <p className="w-full text-center text-sm text-white">
        In order for our scraper to work, your LinkedIn profile needs to be
        public. If it fails, you can upload a PDF instead.
      </p>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          className="bg-white sm:w-96"
          placeholder="LinkedIn url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          onFocus={(e) => e.target.select()}
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
