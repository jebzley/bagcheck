import AllocationForm from "@/components/AllocationForm";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-bold">Risk pyramid</h1>
      <p>You ARE allocating your risk, right anon?</p>
      <AllocationForm />
    </div>
  );
}
