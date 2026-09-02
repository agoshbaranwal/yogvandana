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
    lang: "en",
    routeKey: "ailment",
    slug,
    title: `${t(ailment.titleFull, "en")} | ${t(ailment.searchTerms, "en")}`,
    description: t(ailment.metaDescription, "en"),
    ogKey: `ailment-${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ailment = ailmentBySlug(slug);
  if (!ailment) notFound();
  return <AilmentView lang="en" ailment={ailment} />;
}
