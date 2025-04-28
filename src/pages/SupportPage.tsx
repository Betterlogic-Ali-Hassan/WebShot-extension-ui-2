import { ContactSection } from "@/components/support/Contact";
import { FaqSection } from "@/components/support/FaqSection";
import { FeedbackSection } from "@/components/support/FeedbackSection";
import { SupportHeader } from "@/components/support/Header";
import { ResourcesSection } from "@/components/support/Resource";

const SupportPage = () => {
  return (
    <div className='max-h-screen bg-background overflow-y-auto'>
      <SupportHeader />

      {/* Main Content */}
      <main className='max-w-4xl mx-auto py-10 px-4 sm:px-8 space-y-12 animate-in fade-in duration-500'>
        <FaqSection />
        <FeedbackSection />
        <ContactSection />
        <ResourcesSection />
      </main>
    </div>
  );
};

export default SupportPage;
