import { Button } from "@/components/Button";
import { BugIcon } from "lucide-react";

export default async function AdminNewPostPage() {
  return (
    <>
      <div className="flex gap-2 py-1 items-center">
        <Button
          color="default"
          size="sm"
        >
          <BugIcon />
          Default
        </Button>

        <Button
          color="ghost"
          size="md"
        >
          <BugIcon />
          Ghost
        </Button>

        <Button
          color="danger"
          size="lg"
        >
          <BugIcon />
          Danger
        </Button>
      </div>

      <div className="flex gap-2 py-1 items-center">
        <Button
          color="default"
          size="sm"
          disabled
        >
          <BugIcon />
          Default
        </Button>
        <Button
          color="ghost"
          size="md"
          disabled
        >
          <BugIcon />
          Ghost
        </Button>
        <Button
          color="danger"
          size="lg"
          disabled
        >
          <BugIcon />
          Danger
        </Button>
      </div>
    </>
  );
}
