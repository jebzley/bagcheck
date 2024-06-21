import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-bold">The Cobie risk pyramid</h1>
      <p>
        You <i>are</i> allocating your risk, right anon?
      </p>
      <Link href={"/allocations"}>{"Let's find out"}</Link>
    </div>
  );
}
