
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Calculator, TrendingUp, Shield, Building, ClipboardList, Target, Search, FileCheck, Stamp, UserCheck, CreditCard, Factory } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: "gst-registration",
      title: "GST Registration",
      description: "Complete GST registration process for new businesses",
      icon: FileText,
      color: "blue",
      price: "₹2,999",
      duration: "7-10 days"
    },
    {
      id: "gst-filing",
      title: "GST Filing",
      description: "Monthly and quarterly GST return filing services",
      icon: Calculator,
      color: "green",
      price: "₹999/month",
      duration: "Same day"
    },
    {
      id: "itr-filing",
      title: "Income Tax Returns",
      description: "ITR filing for individuals, HUF, and businesses",
      icon: TrendingUp,
      color: "purple",
      price: "₹1,499",
      duration: "3-5 days"
    },
    {
      id: "company-registration",
      title: "Company Registration",
      description: "Private Limited, LLP, and Partnership firm registration",
      icon: Building,
      color: "orange",
      price: "₹8,999",
      duration: "15-20 days"
    },
    {
      id: "business-license",
      title: "Business License",
      description: "Trade license and other business permits",
      icon: ClipboardList,
      color: "red",
      price: "₹2,499",
      duration: "10-15 days"
    },
    {
      id: "accounting-services",
      title: "Accounting Services",
      description: "Bookkeeping and financial statement preparation",
      icon: FileCheck,
      color: "cyan",
      price: "₹4,999/month",
      duration: "Monthly"
    },
    {
      id: "tax-planning",
      title: "Tax Planning",
      description: "Strategic tax planning to minimize tax liability",
      icon: Target,
      color: "indigo",
      price: "₹5,999",
      duration: "5-7 days"
    },
    {
      id: "audit-services",
      title: "Audit Services",
      description: "Statutory and internal audit services",
      icon: Search,
      color: "pink",
      price: "₹15,999",
      duration: "20-30 days"
    },
    {
      id: "compliance",
      title: "TDS Compliance",
      description: "TDS filing and compliance management",
      icon: Shield,
      color: "yellow",
      price: "₹1,999/quarter",
      duration: "Quarterly"
    },
    {
      id: "msme-registration",
      title: "MSME Registration",
      description: "Micro, Small & Medium Enterprise registration and certification",
      icon: Factory,
      color: "emerald",
      price: "₹1,999",
      duration: "5-7 days"
    },
    {
      id: "digital-signature",
      title: "Digital Signature",
      description: "Class 2 & Class 3 Digital Signature Certificate",
      icon: Stamp,
      color: "violet",
      price: "₹999",
      duration: "1-2 days"
    },
    {
      id: "firm-registration",
      title: "Firm Registration",
      description: "Partnership firm and proprietorship registration",
      icon: UserCheck,
      color: "teal",
      price: "₹3,999",
      duration: "7-10 days"
    },
    {
      id: "loan-precheck",
      title: "Loan Pre-check",
      description: "Business loan eligibility assessment and documentation",
      icon: CreditCard,
      color: "amber",
      price: "₹2,499",
      duration: "3-5 days"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TaxConsult Pro</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <Link to="/services" className="hover:text-primary font-semibold">Services</Link>
              <Link to="/about" className="hover:text-primary">About</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <Link to="/updates" className="hover:text-primary">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              Our Professional Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive tax and business consulting services designed to help your business thrive, 
              stay compliant, and achieve financial success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  <div className="h-2 bg-gradient-to-r from-primary to-primary/80" />
                  
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-center text-base text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{service.price}</div>
                        <div className="text-xs text-gray-500">Starting from</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-700">{service.duration}</div>
                        <div className="text-xs text-gray-500">Timeline</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        className="flex-1 border-2 border-primary/20 hover:border-primary/40 text-primary font-semibold py-3 rounded-full transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/services/${service.id}`);
                        }}
                      >
                        Learn More
                      </Button>
                      <Button 
                        className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/service-form', { state: { serviceType: service.id } });
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-orange-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Need Custom Solution?</h3>
                <p className="text-blue-100 mb-6">
                  Can't find what you're looking for? Our experts are here to provide tailored solutions for your unique business needs.
                </p>
                <Button 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full"
                  onClick={() => navigate('/contact')}
                >
                  Contact Our Experts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2024 TaxConsult Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
