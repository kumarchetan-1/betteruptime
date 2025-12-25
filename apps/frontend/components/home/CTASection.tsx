import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-strong rounded-3xl p-12 md:p-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Stop Losing Customers to{" "}
            <span className="gradient-text">Downtime?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join over 5,000 companies who trust UptimeGuard to keep their services running. 
            Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground hover-glow text-lg px-10 h-14"
              >
                Start Monitoring for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass border-border/50 text-lg px-10 h-14 hover:bg-secondary/50"
            >
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            14-day free trial • No credit card required • Setup in minutes
          </p>
        </div>
      </div>
    </section>
  );
}
