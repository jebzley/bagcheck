export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col gap-8 justify-center items-center">
      {children}
    </div>
  );
}
