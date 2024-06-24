export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-8 justify-center">
      {children}
    </div>
  );
}
