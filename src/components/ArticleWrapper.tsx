export function ArticleWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 pt-12 md:pt-8 max-w-4xl">
      <div className="flex flex-col gap-6">{children}</div>
      <div className="h-[200px]"></div>
    </div>
  );
}
