import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Understand your current ESG standing in under 30 minutes",
  "Identify gaps before investors or clients ask about them",
  "Set realistic sustainability goals with progress tracking",
  "Generate professional summaries for stakeholder meetings",
  "Track carbon footprint without complex calculations",
  "Build a documented ESG journey for future readiness",
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why Indian SMEs Choose GreenTrack
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sustainability reporting shouldn't require a dedicated team or expensive consultants. 
              GreenTrack makes ESG tracking accessible for businesses of all sizes.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Overall ESG Score</span>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">Good Progress</span>
                </div>
                
                <div className="flex items-end gap-4">
                  <span className="text-5xl font-bold text-primary">72</span>
                  <span className="text-lg text-muted-foreground mb-2">/100</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-chart-1">68</div>
                    <div className="text-xs text-muted-foreground mt-1">Environmental</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">78</div>
                    <div className="text-xs text-muted-foreground mt-1">Social</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-chart-3">70</div>
                    <div className="text-xs text-muted-foreground mt-1">Governance</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ESG Readiness Level</span>
                    <span className="font-medium text-primary">Developing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-accent/50 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
