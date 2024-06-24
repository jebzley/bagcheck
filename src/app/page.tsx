import { Allocations } from "@/components/allocation-form";

export default function Home() {
  return (
    <>
      <hgroup className="text-center">
        <h1>The Pyramid™</h1>
        <p>
          You <i>are</i> allocating your risk, right anon?
        </p>
      </hgroup>
      <p className="max-w-4xl text-center">
        {"I made this app for a friend who is terrible at managing their risk."}
        <br />
        {
          "Put your crypto investments in the form below and map it on a risk pyramid."
        }
      </p>
      <aside>
        <p className="text-xs">
          {
            "Note: This approximates risk from market cap size, which is absolute nonsense. Don't actually use this as a serious tool for managing your finances."
          }
        </p>
      </aside>
      <p className="max-w-4xl text-center">{}</p>
      <Allocations />
    </>
  );
}
