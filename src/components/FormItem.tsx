import Select from "react-select";

interface FormItemProps {
  amount: string | null;
  onDelete: () => void;
  onUpdateAmount: (amount: string | null) => void;
  shouldEnableDelete: boolean;
}
export function FormItem({
  amount,
  onDelete,
  onUpdateAmount,
  shouldEnableDelete,
}: FormItemProps) {
  return (
    <div className="relative flex gap-6 mb-4">
      <input
        style={{ appearance: "textfield" }}
        type="number"
        value={amount ? amount : ""}
        className="w-20 border rounded p-1 text-right"
        placeholder={"0"}
        required
        onChange={(e) => onUpdateAmount(e.target.value)}
      />
      <Select placeholder="HarryPotterObamaSonic10Inu" />
      {shouldEnableDelete && (
        <button
          aria-label="Delete item"
          type="button"
          className="absolute -right-6 h-full flex items-center"
          onClick={onDelete}
        >
          ✕
        </button>
      )}
    </div>
  );
}
