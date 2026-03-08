import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Target, FileText, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-sustainability.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Sustainable cityscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container relative z-10 py-24 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Built for Indian SMEs
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Track Your ESG Journey,{" "}
            <span className="text-primary">Build Investor Trust</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A simple, powerful platform to assess your sustainability readiness, 
            set meaningful ESG goals, and generate investor-ready reports — 
            designed specifically for growing Indian businesses.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Start Free Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <BarChart3 className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">ESG Scoring</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Target className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Goal Tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <FileText className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">AI Summaries</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">Report Generation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
