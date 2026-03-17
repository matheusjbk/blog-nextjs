import { uploadImageAction } from "@/actions/upload/uploadImageAction";
import { showMessage } from "@/adapters/showMessage";
import { Button } from "@/components/Button";
import { IMAGE_MAX_SIZE_IN_BYTES } from "@/lib/constants";
import { ImageUpIcon } from "lucide-react";
import { useRef, useTransition } from "react";

export function ImageUploader() {
  const [isUploading, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleFileChange() {
    showMessage.dismiss();

    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;

    const file = fileInput.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_MAX_SIZE_IN_BYTES) {
      const maxSizeInKB = IMAGE_MAX_SIZE_IN_BYTES / 1024;
      showMessage.error(
        `Imagem muito grande. O tamanho máximo permitido é de ${maxSizeInKB}KB`,
      );

      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        showMessage.error(result.error);

        return;
      }

      showMessage.success(result.url);
    });

    fileInput.value = "";
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
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
      />
    </div>
  );
}
