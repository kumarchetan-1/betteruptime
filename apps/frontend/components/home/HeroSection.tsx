"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [uptimeCount, setUptimeCount] = useState(0);

  useEffect(() => {
    const target = 99.99;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setUptimeCount(target);
        clearInterval(timer);
      } else {
        setUptimeCount(parseFloat(current.toFixed(2)));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">
              Currently monitoring <span className="text-primary font-semibold">50,000+</span> websites
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-up delay-100">
            Never Miss a Moment of{" "}
            <span className="gradient-text">Downtime</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-up delay-200">
            Enterprise-grade uptime monitoring with instant alerts. Know the moment your 
            website goes down and fix issues before your customers notice.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up delay-300">
            <Link href="/signup">
              <Button size="lg" className="gradient-primary text-primary-foreground hover-glow text-lg px-8 h-14">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="glass border-border/50 text-lg px-8 h-14 hover:bg-secondary/50">
              View Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground animate-fade-up delay-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Uptime Counter */}
          <div className="mt-16 glass rounded-2xl p-8 animate-fade-up delay-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                  {uptimeCount}%
                </div>
                <p className="text-sm text-muted-foreground">Average Uptime</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-border/30" />
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                  &lt;1s
                </div>
                <p className="text-sm text-muted-foreground">Alert Response</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-border/30" />
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                  180+
                </div>
                <p className="text-sm text-muted-foreground">Global Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
