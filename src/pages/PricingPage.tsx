import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get a preview of your ESG readiness",
    features: [
      { text: "Limited assessment preview (5 questions)", included: true },
      { text: "ESG score display", included: false },
      { text: "Dashboard access", included: false },
      { text: "Goal tracking", included: false },
      { text: "Carbon tracking", included: false },
      { text: "AI summaries", included: false },
      { text: "Report export", included: false },
      { text: "Shareable ESG link", included: false },
    ],
    cta: "Try Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹2,999",
    period: "per month",
    description: "Complete ESG tracking for growing businesses",
    features: [
      { text: "Full ESG assessment (20-30 questions)", included: true },
      { text: "Complete ESG score breakdown", included: true },
      { text: "Full dashboard access", included: true },
      { text: "Unlimited goal tracking", included: true },
      { text: "Carbon emissions tracking", included: true },
      { text: "AI-powered summaries", included: true },
      { text: "PDF & text export", included: true },
      { text: "Shareable ESG link", included: true },
      { text: "Document storage (up to 100 files)", included: true },
      { text: "Email support", included: true },
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For larger organizations with custom needs",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Multiple workspaces", included: true },
      { text: "Unlimited document storage", included: true },
      { text: "Custom assessment questions", included: true },
      { text: "API access", included: true },
      { text: "Priority support", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-card border-b border-border py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-foreground">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that fits your business. No hidden fees, no surprises.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`relative border-border ${
                    plan.popular ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature.text} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-muted flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link to={plan.name === "Enterprise" ? "/legal" : "/signup"}>
                      <Button 
                        className="w-full" 
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Questions About Pricing?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our Pro plan is designed for SMEs with 20-300 employees. 
                Need something different? Contact us for a custom quote.
              </p>
              <a href="mailto:sales@greentrack.in">
                <Button variant="outline">Contact Sales</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
