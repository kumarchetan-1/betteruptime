import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqs = [
    {
      question: "How does UptimeGuard monitor my website?",
      answer: "We ping your website from over 180+ global locations at intervals you choose (from every 30 seconds to every 5 minutes). If we detect an issue, we verify it from multiple locations before alerting you to prevent false positives.",
    },
    {
      question: "What types of alerts are supported?",
      answer: "We support email, SMS, Slack, Microsoft Teams, PagerDuty, Discord, webhooks, and many more integrations. You can customize which team members receive alerts and set up escalation policies.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial on all plans with no credit card required. You'll have full access to all features during the trial period.",
    },
    {
      question: "Can I monitor APIs and servers?",
      answer: "Absolutely! Beyond simple uptime checks, we support HTTP/HTTPS, TCP/UDP ports, SSL certificate monitoring, DNS monitoring, and API endpoint testing with custom request headers and body.",
    },
    {
      question: "What happens if your monitoring goes down?",
      answer: "We have a distributed infrastructure with multiple redundant systems across different cloud providers. We guarantee 99.99% uptime for our monitoring service, backed by our SLA.",
    },
    {
      question: "Can I customize the status page?",
      answer: "Yes! You can fully customize your status page with your logo, colors, custom domain, and choose which monitors to display. Pro and Enterprise plans unlock additional customization options.",
    },
  ];
  
  export function FAQSection() {
    return (
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-primary mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about UptimeGuard.
            </p>
          </div>
  
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass rounded-xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  }
  