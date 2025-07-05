
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import GSTCalculator from "@/components/GSTCalculator";
import ClientDashboard from "@/components/ClientDashboard";
import ZoomIntegration from "@/components/ZoomIntegration";
import CRMIntegration from "@/components/CRMIntegration";
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
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TaxConsult Pro - Dashboard</h1>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link to="/" className="hover:text-primary">Back to Home</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Tools Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Tax Tools & Calculators</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GSTCalculator />
            </div>
          </section>

          {/* Client Dashboard */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Client Portal</h2>
            <ClientDashboard />
          </section>

          {/* Communication Tools */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Communication & CRM</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ZoomIntegration />
              <CRMIntegration />
            </div>
          </section>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
