import Link from "next/link";
import JsonLd from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";

type Crumb = { name: string; path: string };

// Visible breadcrumb trail plus matching structured data, so Google can show
// the same trail in search results.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {items.map((item, i) => (
            <li key={item.path}>
              {i < items.length - 1 ? (
                <Link href={item.path}>{item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
