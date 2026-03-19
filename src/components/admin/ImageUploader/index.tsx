import { uploadImageAction } from "@/actions/upload/uploadImageAction";
import { showMessage } from "@/adapters/showMessage";
import { Button } from "@/components/Button";
import { IMAGE_MAX_SIZE_IN_BYTES } from "@/lib/constants";
import { ImageUpIcon } from "lucide-react";
import { useRef, useState, useTransition } from "react";

export function ImageUploader() {
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState("");

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

      setImgUrl(result.url);
      showMessage.success("Imagem enviada com sucesso");
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={handleClick}
        color="default"
        size="md"
        type="button"
        className="self-start"
        disabled={isUploading}
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
        disabled={isUploading}
      />

      {imgUrl && (
        <div className="flex flex-col gap-2">
          <p>URL da imagem: {imgUrl}</p>

          {/* eslint-disable-next-line */}
          <img src={imgUrl} />
        </div>
      )}
    </div>
  );
}
