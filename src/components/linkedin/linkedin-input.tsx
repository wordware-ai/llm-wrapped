import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export function LinkedinInput() {
  const [url, setUrl] = useState("");

  const router = useRouter();

  const getUsername = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2] ?? urlParts[urlParts.length - 1];
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const username = getUsername(url);
    router.push(`/linkedin/${username}`);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        className="bg-white sm:w-96"
        placeholder="LinkedIn url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button className="bg-[#0A66C2] hover:bg-[#0A66C2]/90" type="submit">
        View
      </Button>
    </form>
  );
}
