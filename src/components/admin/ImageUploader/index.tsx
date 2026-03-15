import { Button } from "@/components/Button";
import { ImageUpIcon } from "lucide-react";
import { useRef } from "react";

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  return (
    <div className="flex flex-col">
      <Button
        onClick={handleClick}
        color="default"
        size="md"
        type="button"
        className="self-start"
      >
        <ImageUpIcon />
        Escolher imagem
      </Button>

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
      />
    </div>
  );
}
