
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "GST Registration",
      description: "Complete GST registration process for new businesses",
      icon: "📝"
    },
    {
      title: "GST Filing",
      description: "Monthly and quarterly GST return filing services",
      icon: "📊"
    },
    {
      title: "Income Tax Returns",
      description: "ITR filing for individuals, HUF, and businesses",
      icon: "💰"
    },
    {
      title: "Company Registration",
      description: "Private Limited, LLP, and Partnership firm registration",
      icon: "🏢"
    },
    {
      title: "Business License",
      description: "Trade license and other business permits",
      icon: "📋"
    },
    {
      title: "Accounting Services",
      description: "Bookkeeping and financial statement preparation",
      icon: "📚"
    },
    {
      title: "Tax Planning",
      description: "Strategic tax planning to minimize tax liability",
      icon: "🎯"
    },
    {
      title: "Audit Services",
      description: "Statutory and internal audit services",
      icon: "🔍"
    },
    {
      title: "TDS Compliance",
      description: "TDS filing and compliance management",
      icon: "📄"
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comprehensive tax and business consulting services to help your business grow and stay compliant
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
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
