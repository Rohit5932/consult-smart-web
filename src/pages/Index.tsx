
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CheckCircle, Users, Shield, Star, ArrowRight, FileText, Calculator, Building2, Award, Clock, Phone } from "lucide-react";

const Index = () => {
  const { t } = useTranslation();

  const featuredServices = [
    {
      title: "GST Registration & Filing",
      description: "Complete GST compliance solution with monthly returns and expert guidance",
      icon: "📊",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      link: "/services/gst"
    },
    {
      title: "Income Tax Returns",
      description: "Professional ITR filing for individuals, businesses, and startups",
      icon: "💰",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      link: "/services/itr"
    },
    {
      title: "Business Registration",
      description: "Company incorporation, LLP formation, and partnership registration",
      icon: "🏢",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      link: "/services/business"
    },
    {
      title: "Tax Planning",
      description: "Strategic tax planning to minimize liability and maximize savings",
      icon: "🎯",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      link: "/services/tax-planning"
    },
    {
      title: "Audit Services",
      description: "Statutory audits, internal audits, and compliance management",
      icon: "🔍",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      link: "/services/audit"
    },
    {
      title: "Accounting Services",
      description: "Bookkeeping, financial statements, and accounting management",
      icon: "📚",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
      link: "/services/accounting"
    }
  ];

  const trustIndicators = [
    { icon: Users, label: "500+ Happy Clients", value: "500+" },
    { icon: Award, label: "8+ Years Experience", value: "8+" },
    { icon: CheckCircle, label: "100% Compliance", value: "100%" },
    { icon: Clock, label: "24/7 Support", value: "24/7" }
  ];

  const whyChooseUs = [
    { icon: Shield, title: "Verified Expert", description: "Certified tax consultant with CA credentials" },
    { icon: CheckCircle, title: "Guaranteed Compliance", description: "100% compliant with latest tax regulations" },
    { icon: Clock, title: "Quick Turnaround", description: "Fast processing with timely delivery" },
    { icon: Phone, title: "Personal Support", description: "Dedicated support for all your queries" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO 
        title="TaxConsult Pro - Helping Individuals & Businesses Navigate Taxation Easily"
        description="Professional tax consultant with 8+ years experience. GST filing, ITR returns, business registration, and tax planning services. 500+ happy clients across India."
        keywords="tax consultant, GST filing, income tax returns, business registration, tax advisor, chartered accountant, India, tax planning"
      />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaxConsult Pro
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base">
              <LanguageSwitcher />
              <Link to="/" className="hover:text-blue-600 px-2 py-1 transition-colors">{t('navigation.home')}</Link>
              <Link to="/services" className="hover:text-blue-600 px-2 py-1 transition-colors">{t('navigation.services')}</Link>
              <Link to="/about" className="hover:text-blue-600 px-2 py-1 transition-colors">{t('navigation.about')}</Link>
              <Link to="/contact" className="hover:text-blue-600 px-2 py-1 transition-colors">{t('navigation.contact')}</Link>
              <Link to="/blog" className="hover:text-blue-600 px-2 py-1 transition-colors">{t('navigation.blog')}</Link>
              <Link to="/updates" className="hover:text-blue-600 px-2 py-1 transition-colors">{t('navigation.updates')}</Link>
              <Link to="/dashboard" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Dashboard
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 text-sm px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Certified Tax Expert
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight">
              Helping Individuals & Businesses Navigate Taxation Easily
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional tax filing, GST compliance, and business registration services with 8+ years of expertise. 
              Join 500+ satisfied clients who trust us for their financial success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300" asChild>
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <indicator.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="font-bold text-xl text-blue-600">{indicator.value}</div>
                  <div className="text-sm text-gray-600">{indicator.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Expert Services
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tax and business solutions tailored for your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredServices.map((service, index) => (
              <Link key={index} to={service.link} className="group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden bg-white">
                  <div className={`h-2 ${service.color}`}></div>
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose TaxConsult Pro?
            </h3>
            <p className="text-lg text-gray-600">Built on trust, expertise, and client satisfaction</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="pt-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('testimonials.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Rajesh Kumar",
                text: "Excellent service for GST filing. Very professional and timely.",
                rating: "⭐⭐⭐⭐⭐",
                role: "Business Owner"
              },
              {
                name: "Priya Sharma", 
                text: "Helped me with company registration. Smooth process throughout.",
                rating: "⭐⭐⭐⭐⭐",
                role: "Entrepreneur"
              },
              {
                name: "Amit Patel",
                text: "Best tax consultant in the area. Highly recommended!",
                rating: "⭐⭐⭐⭐⭐",
                role: "CA Professional"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4 text-2xl">{testimonial.rating}</div>
                  <p className="text-gray-600 mb-4 italic text-center">"{testimonial.text}"</p>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Simplify Your Taxes?</h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">Join 500+ satisfied clients and experience hassle-free tax management</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" asChild>
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300" asChild>
              <Link to="/contact">Call Now: +91-9038603090</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center">
                  <Calculator className="h-4 w-4 text-white" />
                </div>
                <h4 className="text-lg font-bold">TaxConsult Pro</h4>
              </div>
              <p className="text-gray-400 text-sm">Professional tax and business consulting services with 8+ years of expertise.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/services/gst" className="hover:text-white transition-colors">GST Filing</Link></li>
                <li><Link to="/services/itr" className="hover:text-white transition-colors">Income Tax Returns</Link></li>
                <li><Link to="/services/business" className="hover:text-white transition-colors">Business Registration</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 Main Road, UCO Bank, Barharwa</p>
                <p>📞 +91-9038603090</p>
                <p>✉️ ska.bhw@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
