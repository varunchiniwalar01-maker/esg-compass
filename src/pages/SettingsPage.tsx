import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Mail, Shield } from "lucide-react";

export default function SettingsPage() {
  const { signOut } = useAuth();
  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground mb-8">Settings</h1>

        {/* Company Profile */}
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" defaultValue="Acme Industries Pvt. Ltd." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue="Manufacturing" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Input id="employees" type="number" defaultValue="125" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Mumbai, Maharashtra" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/30">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    PS
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Priya Sharma</p>
                    <p className="text-sm text-muted-foreground">priya@acme.com</p>
                  </div>
                </div>
                <Badge>Admin</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/30">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold">
                    RK
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Rahul Kumar</p>
                    <p className="text-sm text-muted-foreground">rahul@acme.com</p>
                  </div>
                </div>
                <Badge variant="outline">Viewer</Badge>
              </div>
            </div>
            <Button variant="outline" className="mt-4">
              Invite Team Member
            </Button>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="priya@acme.com" />
            </div>
            <Button variant="outline">Change Password</Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-foreground">Pro Plan</p>
                <p className="text-sm text-muted-foreground">₹2,999/month</p>
              </div>
              <Badge className="bg-primary">Active</Badge>
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Your subscription renews on February 15, 2025
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Manage Subscription</Button>
              <Button variant="outline" className="text-destructive hover:text-destructive">
                Cancel Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20 mt-6 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Sign Out</p>
                <p className="text-sm text-muted-foreground">Log out of your account on this device</p>
              </div>
              <Button variant="destructive" onClick={signOut}>Sign Out</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
