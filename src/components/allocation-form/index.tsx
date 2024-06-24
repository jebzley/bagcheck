import { AllocationForm } from "./form";
import { AllocationTable } from "./allocation-table";

export function Allocations() {
  return (
    <section className="flex flex-col gap-4 w-96 h-full">
      <AllocationForm />
      <AllocationTable />
    </section>
  );
}
