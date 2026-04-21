import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SuperAdminPage() {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Super Admin Control Plane</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Foundation route for feature flags, impersonation, health score, and billing lock logic.
      </CardContent>
    </Card>
  );
}
