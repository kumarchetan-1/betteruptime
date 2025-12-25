
import { Shield, Users, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  { name: "Alex Chen", role: "CEO & Co-Founder" },
  { name: "Sarah Miller", role: "CTO & Co-Founder" },
  { name: "James Wilson", role: "Head of Engineering" },
  { name: "Emily Brown", role: "Head of Customer Success" },
];

const About = () => {
  return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block text-sm font-medium text-primary mb-4">ABOUT US</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building the Future of <span className="gradient-text">Reliability</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Founded in 2020, UptimeGuard was born from a simple frustration: existing monitoring tools were either too
              complex or unreliable. We set out to build something better.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Shield, label: "99.99% SLA", desc: "Guaranteed uptime" },
              { icon: Users, label: "5,000+", desc: "Happy customers" },
              { icon: Globe, label: "180+", desc: "Global locations" },
              { icon: Zap, label: "<1s", desc: "Alert delivery" },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <s.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold gradient-text">{s.label}</div>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground">The people behind UptimeGuard</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {team.map((member, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center">
                <div className="h-20 w-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="glass-strong rounded-3xl p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Want to Join Our Team?</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented people to help us build the future of uptime monitoring.
            </p>
            <Button className="gradient-primary text-primary-foreground hover-glow">View Open Positions</Button>
          </div>
        </div>
      </section>
  );
};

export default About;
