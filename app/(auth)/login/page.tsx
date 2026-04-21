import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md border-border/60 bg-card/90 backdrop-blur">
        <CardHeader>
          <CardTitle>Sova CRM Access</CardTitle>
          <CardDescription>Phase 1 foundation is ready. Connect auth actions next.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Use secure Server Actions for login and password reset in the next phase.</CardContent>
      </Card>
    </main>
  );
}
