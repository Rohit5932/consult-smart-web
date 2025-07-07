
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import GSTCalculator from "@/components/GSTCalculator";
import SIPCalculator from "@/components/SIPCalculator";
import EMICalculator from "@/components/EMICalculator";
import ClientDashboard from "@/components/ClientDashboard";
import ZoomIntegration from "@/components/ZoomIntegration";
import CRMIntegration from "@/components/CRMIntegration";
import AppointmentBooking from "@/components/AppointmentBooking";
import DocumentUpload from "@/components/DocumentUpload";
import AIChatbot from "@/components/AIChatbot";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Dashboard - TaxConsult Pro"
        description="Advanced tax consulting dashboard with GST calculator, client management, and AI assistance."
        keywords="tax dashboard, GST calculator, client portal, tax tools"
      />
      
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">TaxConsult Pro - Dashboard</h1>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link to="/" className="hover:text-primary text-sm md:text-base">Back to Home</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid gap-6 md:gap-8">
          {/* Tools Section */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Tax & Financial Calculators</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              <div className="flex justify-center lg:justify-start">
                <GSTCalculator />
              </div>
              <div className="flex justify-center lg:justify-start">
                <SIPCalculator />
              </div>
              <div className="flex justify-center lg:justify-start">
                <EMICalculator />
              </div>
            </div>
          </section>

          {/* Client Services */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Client Services</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <AppointmentBooking />
              <DocumentUpload />
            </div>
          </section>

          {/* Client Dashboard */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Client Portal</h2>
            <ClientDashboard />
          </section>

          {/* Communication Tools */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Communication & CRM</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <ZoomIntegration />
              <CRMIntegration />
            </div>
          </section>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Footer */}
      <footer className="bg-muted py-6 md:py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm md:text-base">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
