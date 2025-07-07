
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
import AIChatbot from "@/components/AIChatbot";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <SEO 
        title="Dashboard - TaxConsult Pro"
        description="Advanced tax consulting dashboard with GST calculator, client management, and AI assistance."
        keywords="tax dashboard, GST calculator, client portal, tax tools"
      />
      
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-center md:text-left bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              TaxConsult Pro - Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Link 
                to="/" 
                className="hover:text-primary text-sm md:text-base px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid gap-8 md:gap-10">
          {/* Tools Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-orange-600/5 rounded-3xl"></div>
            <div className="relative p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  Tax & Financial Calculators
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Powerful tools to help you calculate GST, plan your investments, and manage loan EMIs
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                <div className="flex justify-center">
                  <GSTCalculator />
                </div>
                <div className="flex justify-center">
                  <SIPCalculator />
                </div>
                <div className="flex justify-center">
                  <EMICalculator />
                </div>
              </div>
            </div>
          </section>

          {/* Client Portal */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5 rounded-3xl"></div>
            <div className="relative p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Client Portal
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Manage your appointments, documents, and access quick services
                </p>
              </div>
              <ClientDashboard />
            </div>
          </section>

          {/* Communication Tools */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-3xl"></div>
            <div className="relative p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Communication & CRM
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Connect with us through video calls and manage your client relationship
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <ZoomIntegration />
                <CRMIntegration />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 md:py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">TaxConsult Pro</h3>
            <p className="text-gray-300">Your trusted partner in tax and financial consulting</p>
          </div>
          <p className="text-gray-400 text-sm md:text-base">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
