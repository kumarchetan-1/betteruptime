"use client"

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, RefreshCw, Globe, Clock, Loader2, AlertCircle, CheckCircle2, HelpCircle, Zap, TrendingUp } from "lucide-react";
import { getWebsites, addWebsite, getWebsiteStatus } from "@/lib/api";
import { useRouter } from "next/navigation";

// Types
interface Website {
  id: string;
  url: string;
  status: "up" | "down" | "unknown";
  responseTime?: number;
  lastChecked?: Date;
}

// Backend website type (what we get from API)
interface BackendWebsite {
  id: string;
  url: string;
  user_id: string;
  createdAt: string;
}

// Backend website with status (from status endpoint)
interface WebsiteWithStatus extends BackendWebsite {
  ticks: Array<{
    id: string;
    status: "up" | "down" | "unknown";
    responseTime_ms: number;
    createdAt: string;
  }>;
}

// URL validation schema
const addWebsiteSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "URL must start with http:// or https://",
    }),
});

type AddWebsiteForm = z.infer<typeof addWebsiteSchema>;

// Helper function to transform backend website to frontend format
function transformWebsite(backendWebsite: BackendWebsite, statusData?: WebsiteWithStatus): Website {
  // If we have status data, use it
  if (statusData && statusData.ticks && statusData.ticks.length > 0) {
    const latestTick = statusData.ticks[0];
    return {
      id: backendWebsite.id,
      url: backendWebsite.url,
      status: latestTick.status,
      responseTime: latestTick.responseTime_ms,
      lastChecked: new Date(latestTick.createdAt),
    };
  }
  
  // Otherwise, return with unknown status
  return {
    id: backendWebsite.id,
    url: backendWebsite.url,
    status: "unknown",
    responseTime: undefined,
    lastChecked: undefined,
  };
}

// Status indicator component
function StatusIndicator({ status }: { status: Website["status"] }) {
  const config = {
    up: { 
      icon: CheckCircle2, 
      label: "Operational", 
      bgClass: "bg-emerald-500/10", 
      textClass: "text-emerald-500",
      dotClass: "bg-emerald-500",
      glowClass: "shadow-emerald-500/50"
    },
    down: { 
      icon: AlertCircle, 
      label: "Down", 
      bgClass: "bg-red-500/10", 
      textClass: "text-red-500",
      dotClass: "bg-red-500",
      glowClass: "shadow-red-500/50"
    },
    unknown: { 
      icon: HelpCircle, 
      label: "Checking", 
      bgClass: "bg-amber-500/10", 
      textClass: "text-amber-500",
      dotClass: "bg-amber-500",
      glowClass: "shadow-amber-500/50"
    },
  };

  const { label, bgClass, textClass, dotClass, glowClass } = config[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgClass}`}>
      <span className={`relative flex h-2 w-2`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dotClass} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotClass} shadow-lg ${glowClass}`}></span>
      </span>
      <span className={`text-xs font-semibold uppercase tracking-wider ${textClass}`}>{label}</span>
    </div>
  );
}

// Response time badge
function ResponseTimeBadge({ time }: { time?: number }) {
  if (time === undefined) return <span className="text-muted-foreground">—</span>;
  
  const getColorClass = (ms: number) => {
    if (ms < 100) return "text-emerald-500";
    if (ms < 300) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="flex items-center gap-1.5">
      <Zap className={`w-3.5 h-3.5 ${getColorClass(time)}`} />
      <span className={`font-mono text-sm font-medium ${getColorClass(time)}`}>{time}ms</span>
    </div>
  );
}

// Stats cards
function StatsCards({ websites }: { websites: Website[] }) {
  const upCount = websites.filter(w => w.status === "up").length;
  const downCount = websites.filter(w => w.status === "down").length;
  const avgResponseTime = websites.filter(w => w.responseTime).reduce((acc, w) => acc + (w.responseTime || 0), 0) / (websites.filter(w => w.responseTime).length || 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-500/5 via-background to-background p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium">Operational</span>
          </div>
          <p className="text-4xl font-bold text-emerald-500">{upCount}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-red-500/5 via-background to-background p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Down</span>
          </div>
          <p className="text-4xl font-bold text-red-500">{downCount}</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 via-background to-background p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Avg Response</span>
          </div>
          <p className="text-4xl font-bold text-primary">{Math.round(avgResponseTime)}<span className="text-lg font-normal text-muted-foreground">ms</span></p>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
          <Globe className="w-10 h-10 text-primary/60" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">No websites monitored</h3>
      <p className="text-muted-foreground max-w-sm">
        Add your first website above to start tracking its uptime and performance.
      </p>
    </div>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
        <Loader2 className="w-12 h-12 text-primary animate-spin relative" />
      </div>
      <p className="text-muted-foreground mt-6">Loading your websites...</p>
    </div>
  );
}

export default function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AddWebsiteForm>({
    // @ts-expect-error - Version mismatch between Zod and @hookform/resolvers types
    resolver: zodResolver(addWebsiteSchema),
    defaultValues: {
      url: "",
    },
  });

  // Fetch websites from backend on load
  useEffect(() => {
    fetchWebsites();
  }, []);

  // Function to fetch websites from backend
  async function fetchWebsites() {
    setIsLoading(true);
    try {
      // Step 1: Get all websites
      const backendWebsites: BackendWebsite[] = await getWebsites();
      
      // Step 2: Fetch status for each website (in parallel for better performance)
      const websitesWithStatus = await Promise.all(
        backendWebsites.map(async (website) => {
          try {
            // Try to get status, but if it fails, just use unknown
            const statusData = await getWebsiteStatus(website.id);
            return transformWebsite(website, statusData);
          } catch (error) {
            // If status fetch fails, return website with unknown status
            return transformWebsite(website);
          }
        })
      );

      setWebsites(websitesWithStatus);
    } catch (error: any) {
      // Handle authentication errors
      if (error.response?.status === 401) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your websites.",
          variant: "destructive",
        });
        router.push("/signin");
        return;
      }

      // Handle other errors
      toast({
        title: "Error loading websites",
        description: error.response?.data?.message || "Failed to load websites. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching websites:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle adding a new website
  const onSubmit = async (data: AddWebsiteForm) => {
    setIsAdding(true);

    try {
      // Check if website already exists locally
      if (websites.some((w) => w.url === data.url)) {
        toast({
          title: "Website already exists",
          description: "This URL is already being monitored.",
          variant: "destructive",
        });
        setIsAdding(false);
        return;
      }

      // Call backend API to add website
      const response = await addWebsite(data.url);
      
      // Create new website object with unknown status (will be updated on refresh)
      const newWebsite: Website = {
        id: response.id,
        url: data.url,
        status: "unknown",
        responseTime: undefined,
        lastChecked: undefined,
      };

      // Add to local state
      setWebsites((prev) => [...prev, newWebsite]);
      form.reset();

      toast({
        title: "Website added",
        description: "Your website is now being monitored.",
      });

      // Optionally refresh to get the latest status
      // You can remove this if you want to keep it simple
      setTimeout(() => {
        fetchWebsites();
      }, 2000);
    } catch (error: any) {
      // Handle authentication errors
      if (error.response?.status === 401) {
        toast({
          title: "Authentication required",
          description: "Please sign in to add websites.",
          variant: "destructive",
        });
        router.push("/signin");
        return;
      }

      // Handle validation errors
      if (error.response?.status === 400) {
        toast({
          title: "Invalid URL",
          description: error.response?.data?.message || "Please enter a valid URL.",
          variant: "destructive",
        });
        return;
      }

      // Handle other errors
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add website. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding website:", error);
    } finally {
      setIsAdding(false);
    }
  };

  // Handle refresh - fetch latest data from backend
  const handleRefresh = async () => {
    await fetchWebsites();
    toast({
      title: "Refreshed",
      description: "All website statuses have been updated.",
    });
  };

  return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              Live Monitoring
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-lg">Real-time uptime monitoring for your websites</p>
          </div>

          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="gap-2 h-11 px-5 rounded-xl border-border/50 hover:bg-muted/50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh All
          </Button>
        </div>

        {/* Stats */}
        {!isLoading && websites.length > 0 && <StatsCards websites={websites} />}

        {/* Add Website Form */}
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-muted/30 via-background to-muted/30 p-6 mb-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Add New Website</h2>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="https://example.com"
                            className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50"
                            {...field}
                            disabled={isAdding}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isAdding} 
                  className="h-12 px-6 rounded-xl gradient-primary text-primary-foreground hover-glow"
                >
                  {isAdding ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Website
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Website Table */}
        {isLoading ? (
          <LoadingState />
        ) : websites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="rounded-2xl border border-border/50 overflow-hidden bg-gradient-to-b from-muted/20 to-background">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-4 pl-6">Website URL</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-4">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-4">Response Time</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground py-4 pr-6">Last Checked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {websites.map((website, index) => (
                  <TableRow 
                    key={website.id} 
                    className="border-border/30 hover:bg-muted/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="py-5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                          <Globe className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{website.url}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <StatusIndicator status={website.status} />
                    </TableCell>
                    <TableCell className="py-5">
                      <ResponseTimeBadge time={website.responseTime} />
                    </TableCell>
                    <TableCell className="py-5 pr-6">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{website.lastChecked?.toLocaleTimeString()}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
  );
}
