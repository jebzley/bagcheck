import AsyncSelect from "react-select/async";

interface FormItemProps {
  amount: string | null;
  value: { label: string; value: string } | null;
  onDelete: () => void;
  onSearch: (term: string) => void;
  onUpdateCoin: (e: { label: string; value: string }) => void;
  onUpdateAmount: (amount: string | null) => void;
  shouldEnableDelete: boolean;
}

export function FormItem({
  amount,
  value,
  onSearch,
  onDelete,
  onUpdateCoin,
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
      <AsyncSelect
        className="w-full overflow-hidden"
        value={value}
        loadOptions={(term) => onSearch(term)}
        placeholder="HarryPotterObamaSonic10Inu"
        onChange={(e) => onUpdateCoin(e as { label: string; value: string })}
      />
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
