import { redirect } from "next/navigation";

export default async function TenantHomePage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;
  redirect(`/${subdomain}/dashboard`);
}
