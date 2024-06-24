import { Allocations } from "@/components/allocation-form";

export default function Home() {
  return (
    <>
      <hgroup>
        <h1 className="text-4xl font-bold">The Cobie risk pyramid</h1>
        <p>
          You <i>are</i> allocating your risk, right anon?
        </p>
      </hgroup>
      <p className="max-w-4xl text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas error
        cumque perferendis quibusdam facere accusantium molestiae temporibus
        nulla vero aliquid consequatur qui corrupti deleniti vitae ipsa ut
        veniam, exercitationem explicabo.
      </p>
      <Allocations />
    </>
  );
}
