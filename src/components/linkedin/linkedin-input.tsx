import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function LinkedinInput() {
  return (
    <div className="flex gap-2">
      <Input className="bg-white" placeholder="LinkedIn url" />
      <Button>View</Button>
    </div>
  );
}
