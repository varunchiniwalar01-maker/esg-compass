import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">GreenTrack</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Helping Indian SMEs track and improve their ESG performance for sustainable growth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal" className="text-muted-foreground hover:text-primary transition-colors">
                  Legal & Disclaimer
                </Link>
              </li>
              <li>
                <a href="mailto:hello@greentrack.in" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@greentrack.in" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GreenTrack ESG. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-2xl">
              <strong>Disclaimer:</strong> GreenTrack is an internal ESG tracking and readiness tool. 
              It does not provide certification, regulatory compliance, or audit services. 
              All scores and summaries are for internal assessment purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
