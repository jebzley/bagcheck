import { SearchCoinResponse } from "@/app/api/search/route";
import { URL } from "@/constants/url";
import AsyncSelect from "react-select/async";

interface FormItemProps {
  amount: string | null;
  onDelete: () => void;
  onUpdateCoin: () => void;
  onUpdateAmount: (amount: string | null) => void;
  shouldEnableDelete: boolean;
}

async function handleSearch(term?: string) {
  try {
    const route = [URL.API.BASE_ROUTE, URL.API.SEARCH, term ?? ""].join("");
    const response = await fetch(route);
    const result: SearchCoinResponse = await response.json();
    return result.coins.map((coin) => {
      return { value: coin.id, label: coin.name };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function FormItem({
  amount,
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
        className="w-full"
        loadOptions={handleSearch}
        placeholder="HarryPotterObamaSonic10Inu"
        onMenuClose={onUpdateCoin}
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
