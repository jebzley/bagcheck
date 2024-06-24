import { AllocationForm } from "@/components/allocation-form";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">The Cobie risk pyramid</h1>
      <p>
        You <i>are</i> allocating your risk, right anon?
      </p>
      <AllocationForm />
    </>
  );
}
