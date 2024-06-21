import { AllocationForm } from "@/app/allocations/AllocationForm";

export default function Allocations() {
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <div>
        <AllocationForm />
      </div>
    </div>
  );
}
