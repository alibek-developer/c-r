import { notFound } from "next/navigation";

const RESERVED_SUBDOMAINS = new Set(["www", "api", "admin", "super-admin"]);

export default async function TenantLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;

  if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain.toLowerCase())) {
    notFound();
  }

  return <section className="min-h-screen bg-background p-6">{children}</section>;
}
