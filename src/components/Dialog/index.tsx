import { Button } from "../Button";

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onCancel,
  onConfirm,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;

    onCancel();
  }

  return (
    <div
      className="fixed bg-black/50 inset-0 backdrop-blur-xs flex items-center justify-center text-center"
      onClick={handleCancel}
    >
      <div
        className="flex flex-col gap-6 bg-slate-100 p-6 rounded-xl max-w-2xl mx-8 shadow-lg shadow-black/30"
        role="dialog"
        aria-modal={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        onClick={e => e.stopPropagation()}
      >
        <h3
          id="dialog-title"
          className="text-xl font-bold"
        >
          {title}
        </h3>
        <div id="dialog-description">{content}</div>
        <div className="flex items-center justify-around">
          <Button
            color="ghost"
            size="md"
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button
            color="default"
            size="md"
            onClick={onConfirm}
            disabled={disabled}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
