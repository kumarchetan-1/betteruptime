import { Activity, Bell, TrendingUp, Globe, Zap, Shield } from "lucide-react";

const mockChartData = [35, 45, 42, 55, 48, 52, 58, 62, 55, 68, 72, 65, 70, 75, 80];

export function DashboardPreview() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Dashboard at Your Fingertips
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a complete overview of your infrastructure health with real-time metrics and beautiful visualizations.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative max-w-6xl mx-auto">
          {/* Glow Effect */}
          <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-3xl" />
          
          <div className="relative glass-strong rounded-3xl p-6 md:p-8 overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <span className="text-sm text-muted-foreground">UptimeGuard Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Last updated:</span>
                <span className="text-xs text-primary">Just now</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Activity, label: "Active Monitors", value: "24", trend: "+2" },
                { icon: Bell, label: "Alerts Today", value: "3", trend: "-5" },
                { icon: TrendingUp, label: "Avg. Response", value: "142ms", trend: "-12ms" },
                { icon: Globe, label: "Regions", value: "12", trend: "+3" },
              ].map((stat, index) => (
                <div key={index} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-xs text-primary">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="glass rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Response Time Trend</h3>
                <div className="flex gap-2">
                  {["1H", "24H", "7D", "30D"].map((period, i) => (
                    <button
                      key={period}
                      className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                        i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Chart Visualization */}
              <div className="h-48 flex items-end justify-between gap-2">
                {mockChartData.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 gradient-primary rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Now</span>
              </div>
            </div>

            {/* Monitors List */}
            <div className="space-y-3">
              {[
                { name: "api.example.com", status: "operational", uptime: "99.99%", response: "45ms" },
                { name: "app.example.com", status: "operational", uptime: "99.95%", response: "128ms" },
                { name: "cdn.example.com", status: "degraded", uptime: "98.50%", response: "340ms" },
              ].map((monitor, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass rounded-xl hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-3 w-3 rounded-full ${
                        monitor.status === "operational" ? "bg-primary" : "bg-yellow-500"
                      }`}
                    />
                    <span className="font-medium">{monitor.name}</span>
                  </div>
                  <div className="flex items-center gap-8 text-sm">
                    <div className="text-right">
                      <span className="text-muted-foreground">Uptime: </span>
                      <span className={monitor.status === "operational" ? "text-primary" : "text-yellow-500"}>
                        {monitor.uptime}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground">Response: </span>
                      <span>{monitor.response}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Badges */}
          <div className="absolute -right-4 top-1/4 glass rounded-xl p-4 hidden lg:block animate-float">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
          </div>

          <div className="absolute -left-4 bottom-1/4 glass rounded-xl p-4 hidden lg:block animate-float delay-200">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">99.99% SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
