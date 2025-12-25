import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small projects and startups",
    features: [
      "10 monitors",
      "5-minute checks",
      "Email alerts",
      "7-day data retention",
      "Basic status page",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    description: "For growing teams and businesses",
    features: [
      "50 monitors",
      "1-minute checks",
      "SMS, Email, Slack alerts",
      "90-day data retention",
      "Custom status page",
      "API access",
      "Team collaboration",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Unlimited monitors",
      "30-second checks",
      "All integrations",
      "Unlimited data retention",
      "White-label status page",
      "Dedicated support",
      "SLA guarantee",
    ],
    highlighted: false,
  },
];

export function PricingSnippet() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary mb-4">PRICING</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start with a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "glass-strong border-primary/50 hover-glow scale-105"
                  : "glass hover:bg-secondary/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.price === "Custom" ? "/about" : "/signup"} className="block">
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "gradient-primary text-primary-foreground hover-glow"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/pricing" 
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            View full pricing details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
