import { Star } from "lucide-react";

const logos = [
  "TechCorp", "Innovate", "CloudBase", "DataFlow", "SecureNet", "AppStack"
];

const testimonials = [
  {
    quote: "UptimeGuard has been a game-changer for our DevOps team. We've reduced our incident response time by 80%.",
    author: "Sarah Chen",
    role: "CTO at TechCorp",
    rating: 5,
  },
  {
    quote: "The real-time alerts and beautiful dashboards make monitoring our infrastructure a breeze.",
    author: "Marcus Johnson",
    role: "Lead Engineer at Innovate",
    rating: 5,
  },
  {
    quote: "Finally, a monitoring solution that's both powerful and easy to use. Highly recommended!",
    author: "Emily Rodriguez",
    role: "VP Engineering at CloudBase",
    rating: 5,
  },
];

const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "10M+", label: "Checks Daily" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "180+", label: "Global Locations" },
];

export function SocialProof() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Company Logos */}
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-8">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center glass rounded-2xl p-8">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say about UptimeGuard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 hover:bg-secondary/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
