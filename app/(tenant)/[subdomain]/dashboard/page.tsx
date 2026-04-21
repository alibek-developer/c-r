import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage({ params }: { params: Promise<{ subdomain: string }> }) {
  const { subdomain } = await params;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{subdomain} Dashboard</CardTitle>
        <CardDescription>Kassa, AI insights, and operational pulse.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Phase 1 routing is active for tenant dashboard.</CardContent>
    </Card>
  );
}
