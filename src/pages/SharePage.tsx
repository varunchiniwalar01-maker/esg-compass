import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Share2, Copy, ExternalLink, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function SharePage() {
  const [isLinkActive, setIsLinkActive] = useState(true);
  const [showScores, setShowScores] = useState(true);
  const [showGoals, setShowGoals] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  
  const shareLink = "https://greentrack.app/share/acme-industries-7x9k2m";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Share ESG Summary</h1>
          <p className="text-muted-foreground">
            Create a read-only link for stakeholders
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Link Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Shareable Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="link-active" className="font-medium">Enable Public Link</Label>
                <p className="text-sm text-muted-foreground">
                  Anyone with the link can view your ESG summary
                </p>
              </div>
              <Switch 
                id="link-active"
                checked={isLinkActive}
                onCheckedChange={setIsLinkActive}
              />
            </div>

            {isLinkActive && (
              <>
                <div className="space-y-2">
                  <Label>Your Share Link</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={shareLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="icon" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={shareLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground">What to include:</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {showScores ? (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Label htmlFor="show-scores">ESG Scores</Label>
                    </div>
                    <Switch 
                      id="show-scores"
                      checked={showScores}
                      onCheckedChange={setShowScores}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {showGoals ? (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Label htmlFor="show-goals">Goals in Progress</Label>
                    </div>
                    <Switch 
                      id="show-goals"
                      checked={showGoals}
                      onCheckedChange={setShowGoals}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {showSummary ? (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Label htmlFor="show-summary">AI Summary</Label>
                    </div>
                    <Switch 
                      id="show-summary"
                      checked={showSummary}
                      onCheckedChange={setShowSummary}
                    />
                  </div>
                </div>

                <Button className="w-full gap-2">
                  <Share2 className="h-4 w-4" />
                  Update Shared View
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isLinkActive ? (
              <div className="py-12 text-center text-muted-foreground">
                Enable the public link to see preview
              </div>
            ) : (
              <div className="border border-border rounded-lg p-6 bg-background">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground">Acme Industries Pvt. Ltd.</h3>
                  <p className="text-sm text-muted-foreground">ESG Summary • January 2025</p>
                </div>

                {showScores && (
                  <div className="mb-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-primary">72</div>
                      <div className="text-sm text-muted-foreground">Overall ESG Score</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 rounded bg-accent">
                        <div className="font-bold text-chart-1">68</div>
                        <div className="text-xs text-muted-foreground">Environmental</div>
                      </div>
                      <div className="p-2 rounded bg-accent">
                        <div className="font-bold text-chart-2">78</div>
                        <div className="text-xs text-muted-foreground">Social</div>
                      </div>
                      <div className="p-2 rounded bg-accent">
                        <div className="font-bold text-chart-3">70</div>
                        <div className="text-xs text-muted-foreground">Governance</div>
                      </div>
                    </div>
                  </div>
                )}

                {showGoals && (
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-3">Active Goals</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-4" />
                        <span className="text-foreground">Reduce electricity by 10%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-chart-4" />
                        <span className="text-foreground">Complete POSH training</span>
                      </div>
                    </div>
                  </div>
                )}

                {showSummary && (
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      Developing ESG readiness with strong social practices. 
                      Actively improving environmental tracking and governance documentation.
                    </p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground text-center mt-6 pt-4 border-t border-border">
                  Powered by GreenTrack • For internal assessment only
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card className="border-border mt-6">
        <CardContent className="py-6">
          <h3 className="font-semibold text-foreground mb-2">About Shareable Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Viewers do not need to create an account</li>
            <li>• You control exactly what information is visible</li>
            <li>• Updates to your ESG data automatically reflect in the shared view</li>
            <li>• Disable the link anytime to revoke access</li>
          </ul>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
