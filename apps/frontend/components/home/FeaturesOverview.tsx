import { Activity, Bell, BarChart3, Globe } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Monitor your websites, APIs, and servers from 180+ global locations with checks every 30 seconds.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Get notified instantly via SMS, email, Slack, or webhook when something goes wrong.",
  },
  {
    icon: BarChart3,
    title: "Performance Insights",
    description: "Track response times, SSL certificates, and performance metrics with detailed analytics.",
  },
  {
    icon: Globe,
    title: "Status Pages",
    description: "Beautiful, customizable status pages to keep your customers informed about system health.",
  },
];

export function FeaturesOverview() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary mb-4">FEATURES</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="gradient-text">Peace of Mind</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive monitoring tools to ensure your services are always running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 hover:bg-secondary/30 transition-all duration-300 hover-glow"
            >
              <div className="mb-4 relative">
                <div className="absolute inset-0 gradient-primary opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl gradient-primary">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
