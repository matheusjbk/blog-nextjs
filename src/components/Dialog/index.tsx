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
          <button
            className="flex items-center justify-center bg-slate-300 text-slate-950 hover:bg-slate-400 rounded-md transition py-2 px-4 cursor-pointer disabled:text-slate-600 disabled:bg-slate-300 disabled:cursor-not-allowed"
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button
            className="flex items-center justify-center bg-blue-500 text-blue-50 hover:bg-blue-600 rounded-md transition py-2 px-4 cursor-pointer disabled:text-slate-600 disabled:bg-slate-300 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={disabled}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
