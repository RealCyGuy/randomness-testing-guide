import { ptSerif } from "@/src/app/fonts";

export function ArticleChapterTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className={`text-4xl font-bold ${ptSerif.className}`}>{children}</h1>
  );
}
