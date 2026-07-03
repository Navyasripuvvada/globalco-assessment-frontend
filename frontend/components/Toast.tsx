interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose?: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  return (
    <div
      role="status"
      className={`fixed right-6 top-6 z-50 max-w-sm rounded-3xl border px-5 py-4 shadow-2xl transition-all duration-300 ${
        type === "success"
          ? "border-emerald-200 bg-emerald-600 text-white"
          : "border-rose-200 bg-rose-600 text-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.24em]">
          {type === "success" ? "Success" : "Error"}
        </span>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto text-white/80 transition hover:text-white"
          >
            ×
          </button>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6">{message}</p>
    </div>
  );
}
