import { HeroSection } from "@/components/home/HeroSection";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { FeaturesOverview } from "@/components/home/FeaturesOverview";
import { SocialProof } from "@/components/home/SocialProof";
import { PricingSnippet } from "@/components/home/PricingSnippet";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";


const Index = () => {
  return (
<div>
      <HeroSection />
      <DashboardPreview />
      <FeaturesOverview />
      <SocialProof />
      <PricingSnippet />
      <FAQSection />
      <CTASection />
      </div>
  );
};

export default Index;
