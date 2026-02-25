import { notFound } from 'next/navigation';
import { siteContent } from '@/content/site';
import ResourceDetailContent from '@/components/ResourceDetailContent';

/* ── Static params (required for output: 'export') ── */
export function generateStaticParams() {
  return siteContent.resources.items.map((item) => ({
    slug: item.slug,
  }));
}

/* ── Page component (server) ── */
export default function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const resource = siteContent.resources.items.find((r) => r.slug === params.slug);

  if (!resource) return notFound();

  return <ResourceDetailContent slug={params.slug} />;
}
