import { AllocationForm } from "@/app/allocations/allocation-form";

export default function Allocations() {
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <div>
        <AllocationForm />
      </div>
    </div>
  );
}
