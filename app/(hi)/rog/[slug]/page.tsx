import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AilmentView from "@/views/Ailment";
import { ailmentBySlug, ailments, t } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export function generateStaticParams() {
  return ailments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ailment = ailmentBySlug(slug);
  if (!ailment) return {};
  return pageMeta({
    lang: "hi",
    routeKey: "ailment",
    slug,
    title: `${t(ailment.titleFull, "hi")} | ${t(ailment.searchTerms, "hi")}`,
    description: t(ailment.metaDescription, "hi"),
    ogKey: `ailment-${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ailment = ailmentBySlug(slug);
  if (!ailment) notFound();
  return <AilmentView lang="hi" ailment={ailment} />;
}
