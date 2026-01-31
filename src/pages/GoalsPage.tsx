import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockGoals, goalTemplates, Goal, GoalTemplate } from "@/data/goals";
import { categoryInfo } from "@/data/assessmentQuestions";
import { Plus, Target, Calendar, CheckCircle2, Clock, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  not_started: { label: "Not Started", icon: Circle, color: "text-muted-foreground", bg: "bg-muted/50" },
  in_progress: { label: "In Progress", icon: Clock, color: "text-chart-4", bg: "bg-chart-4/10" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-chart-1", bg: "bg-chart-1/10" },
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [activeTab, setActiveTab] = useState("all");
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const filteredGoals = activeTab === "all" 
    ? goals 
    : goals.filter(g => g.status === activeTab);

  const completedCount = goals.filter(g => g.status === "completed").length;
  const inProgressCount = goals.filter(g => g.status === "in_progress").length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sustainability Goals</h1>
          <p className="text-muted-foreground">
            {completedCount} completed • {inProgressCount} in progress
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Target className="h-4 w-4" />
                Use Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Goal Templates</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 mt-4">
                {goalTemplates.map((template) => {
                  const cat = categoryInfo[template.category];
                  return (
                    <button
                      key={template.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent text-left transition-colors"
                      onClick={() => {
                        // Add template as goal (simplified)
                        setShowTemplateDialog(false);
                      }}
                    >
                      <div className={cn("h-3 w-3 rounded-full mt-1.5", cat.bgColor)} />
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{template.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Suggested target: {template.suggestedTarget} {template.unit}
                        </div>
                      </div>
                      <Badge variant="secondary">{cat.label}</Badge>
                    </button>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Custom Goal</DialogTitle>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input id="title" placeholder="e.g., Reduce water consumption" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe what you want to achieve" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="baseline">Baseline Value</Label>
                    <Input id="baseline" placeholder="Current state" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Value</Label>
                    <Input id="target" placeholder="Goal to achieve" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowNewGoalDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Goal</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-1/20">
                <CheckCircle2 className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{completedCount}</div>
                <div className="text-sm text-muted-foreground">Goals Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/20">
                <Clock className="h-6 w-6 text-chart-4" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{inProgressCount}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{goals.length}</div>
                <div className="text-sm text-muted-foreground">Total Goals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="not_started">Not Started</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredGoals.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No goals found in this category.</p>
              </CardContent>
            </Card>
          ) : (
            filteredGoals.map((goal) => {
              const cat = categoryInfo[goal.category];
              const status = statusConfig[goal.status];
              const StatusIcon = status.icon;

              return (
                <Card key={goal.id} className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0", status.bg)}>
                        <StatusIcon className={cn("h-5 w-5", status.color)} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{goal.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {goal.description}
                            </p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Badge variant="secondary">{cat.label}</Badge>
                            <Badge variant="outline" className={status.color}>
                              {status.label}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Baseline</div>
                            <div className="font-medium text-foreground">{goal.baselineValue}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Target</div>
                            <div className="font-medium text-foreground">{goal.targetValue}</div>
                          </div>
                          {goal.currentValue && (
                            <div>
                              <div className="text-muted-foreground">Current</div>
                              <div className="font-medium text-foreground">{goal.currentValue}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Deadline
                            </div>
                            <div className="font-medium text-foreground">
                              {new Date(goal.deadline).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
