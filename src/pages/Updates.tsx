
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Calendar, Bell, Star, Building2, Gift, Users, FileText, Handshake } from "lucide-react";

const Updates = () => {
  const [expandedUpdate, setExpandedUpdate] = useState<number | null>(null);

  const updates = [
    {
      id: 1,
      title: "New Service: Digital Signature Certificate (DSC)",
      description: "We now offer Digital Signature Certificate services for secure online document signing and e-filing.",
      type: "New Service",
      date: "March 20, 2024",
      isNew: true,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
      icon: <FileText className="w-5 h-5" />,
      details: {
        content: "Our new Digital Signature Certificate service makes it easier than ever to sign documents digitally and file returns online. DSC is mandatory for company directors, authorized signatories, and businesses for various government filings.",
        benefits: [
          "Secure and legally valid digital signatures",
          "Required for ROC filings, GST returns, and income tax filings",
          "Available in Class 2 and Class 3 certificates",
          "Quick processing within 2-3 working days",
          "24/7 customer support for technical assistance"
        ],
        pricing: "Starting from ₹1,999 for Class 2 DSC",
        validity: "Valid for 1-3 years based on selection"
      }
    },
    {
      id: 2,
      title: "Special Offer: GST Registration + Filing Package",
      description: "Get GST registration and first 3 months filing at a discounted rate. Limited time offer!",
      type: "Special Offer",
      date: "March 18, 2024",
      isNew: true,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      icon: <Gift className="w-5 h-5" />,
      details: {
        content: "Take advantage of our comprehensive GST package that includes registration and the first three months of return filing at an unbeatable price. Perfect for new businesses starting their GST journey.",
        benefits: [
          "Complete GST registration process",
          "First 3 months of GSTR-1 and GSTR-3B filing included",
          "GST compliance consultation",
          "Dedicated account manager",
          "Priority customer support"
        ],
        pricing: "Package price: ₹7,999 (Regular price: ₹12,000)",
        validity: "Offer valid till March 31, 2024"
      }
    },
    {
      id: 3,
      title: "ITR Filing Season 2024 - Early Bird Discount",
      description: "File your Income Tax Returns early and save 20% on our professional ITR filing services.",
      type: "Seasonal Offer",
      date: "March 15, 2024",
      isNew: false,
      image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=800&h=400&fit=crop",
      icon: <Star className="w-5 h-5" />,
      details: {
        content: "Beat the rush and save money with our early bird ITR filing offer. Our tax experts ensure maximum deductions and error-free filing for individuals and businesses.",
        benefits: [
          "20% discount on all ITR filing services",
          "Expert review of your tax documents",
          "Maximum deduction optimization",
          "Quick turnaround time",
          "Free tax planning consultation"
        ],
        pricing: "Starting from ₹999 for ITR-1 (after discount)",
        validity: "Early bird offer valid till April 15, 2024"
      }
    },
    {
      id: 4,
      title: "New Branch Opening in Pune",
      description: "We're expanding! Our new Pune branch is now open to serve customers in Maharashtra region.",
      type: "Company News",
      date: "March 10, 2024",
      isNew: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      icon: <Building2 className="w-5 h-5" />,
      details: {
        content: "We're excited to announce the opening of our new branch in Pune to better serve our clients in Maharashtra. This expansion allows us to provide localized support and faster service delivery.",
        benefits: [
          "Convenient location in Pune city center",
          "Local team of certified professionals",
          "Same high-quality services as other branches",
          "In-person consultation available",
          "Regional language support"
        ],
        address: "Office 401, Business Plaza, FC Road, Pune - 411016",
        contact: "Phone: +91-9876543210 | Email: pune@taxconsultpro.com"
      }
    },
    {
      id: 5,
      title: "Updated: Company Registration Fees Reduced",
      description: "Government has reduced company registration fees. Pass on the savings to our customers with revised pricing.",
      type: "Government Update",
      date: "March 5, 2024",
      isNew: false,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
      icon: <Bell className="w-5 h-5" />,
      details: {
        content: "Following the government's decision to reduce company registration fees, we're pleased to pass on these savings directly to our clients. This makes company incorporation even more affordable.",
        benefits: [
          "Reduced government fees for new company registration",
          "Updated pricing reflects government fee reduction",
          "No hidden charges or additional costs",
          "Same comprehensive service package",
          "Faster processing with digital submissions"
        ],
        newPricing: "Company registration now starting from ₹6,999 (was ₹8,999)",
        effectiveDate: "Effective immediately for all new registrations"
      }
    },
    {
      id: 6,
      title: "Partnership with Leading Banks for Loan Assistance",
      description: "We've partnered with major banks to help our clients get business loans and financial assistance.",
      type: "Partnership",
      date: "February 25, 2024",
      isNew: false,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
      icon: <Handshake className="w-5 h-5" />,
      details: {
        content: "Through our strategic partnerships with leading banks, we now offer comprehensive loan assistance to help our clients secure funding for their business ventures.",
        benefits: [
          "Access to multiple bank partners",
          "Competitive interest rates",
          "Simplified application process",
          "Expert guidance on loan documentation",
          "Higher approval rates through our network"
        ],
        partners: "HDFC Bank, ICICI Bank, Axis Bank, SBI, and more",
        loanTypes: "Working capital, term loans, equipment financing, and startup loans"
      }
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "New Service":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "Special Offer":
        return "bg-gradient-to-r from-orange-500 to-orange-600";
      case "Seasonal Offer":
        return "bg-gradient-to-r from-blue-500 to-blue-600";
      case "Company News":
        return "bg-gradient-to-r from-purple-500 to-purple-600";
      case "Government Update":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "Partnership":
        return "bg-gradient-to-r from-teal-500 to-teal-600";
      case "Weekly Offer":
        return "bg-gradient-to-r from-pink-500 to-pink-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "New Service":
        return <Star className="w-4 h-4" />;
      case "Special Offer":
        return <Gift className="w-4 h-4" />;
      case "Seasonal Offer":
        return <Calendar className="w-4 h-4" />;
      case "Company News":
        return <Building2 className="w-4 h-4" />;
      case "Government Update":
        return <Bell className="w-4 h-4" />;
      case "Partnership":
        return <Handshake className="w-4 h-4" />;
      case "Weekly Offer":
        return <Users className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedUpdate(expandedUpdate === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary animate-fade-in">TaxConsult Pro</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link>
              <Link to="/services" className="hover:text-primary transition-colors duration-200">Services</Link>
              <Link to="/about" className="hover:text-primary transition-colors duration-200">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact</Link>
              <Link to="/blog" className="hover:text-primary transition-colors duration-200">Blog</Link>
              <Link to="/updates" className="hover:text-primary font-semibold">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2 mb-6 animate-fade-in">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Latest Updates</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-fade-in">
              Stay Updated
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in">
              Keep up with our latest services, special offers, government updates, and company news
            </p>
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Updates List */}
            <div className="space-y-8">
              {updates.map((update, index) => (
                <Card 
                  key={update.id} 
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in group ${
                    expandedUpdate === index ? 'ring-2 ring-primary/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => toggleExpand(index)}
                >
                  {update.isNew && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-red-500 text-white animate-pulse">NEW</Badge>
                    </div>
                  )}
                  
                  {/* Update Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={update.image} 
                      alt={update.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-3">
                        <Badge className={`text-white ${getTypeColor(update.type)} flex items-center gap-1`}>
                          {getTypeIcon(update.type)}
                          {update.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {update.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          {update.title}
                        </CardTitle>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {expandedUpdate === index ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {update.description}
                    </CardDescription>

                    {/* Expanded Details */}
                    {expandedUpdate === index && (
                      <div className="mt-6 pt-6 border-t animate-fade-in">
                        <div className="space-y-4">
                          <p className="text-foreground leading-relaxed">
                            {update.details.content}
                          </p>
                          
                          {update.details.benefits && (
                            <div>
                              <h4 className="font-semibold mb-2 text-primary">Key Benefits:</h4>
                              <ul className="space-y-1">
                                {update.details.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {update.details.pricing && (
                              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-1">Pricing</h5>
                                <p className="text-sm text-green-600 dark:text-green-300">{update.details.pricing}</p>
                              </div>
                            )}
                            
                            {update.details.validity && (
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Validity</h5>
                                <p className="text-sm text-blue-600 dark:text-blue-300">{update.details.validity}</p>
                              </div>
                            )}

                            {update.details.address && (
                              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Address</h5>
                                <p className="text-sm text-purple-600 dark:text-purple-300">{update.details.address}</p>
                              </div>
                            )}

                            {update.details.contact && (
                              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                <h5 className="font-semibold text-orange-700 dark:text-orange-400 mb-1">Contact</h5>
                                <p className="text-sm text-orange-600 dark:text-orange-300">{update.details.contact}</p>
                              </div>
                            )}
                          </div>

                          {(update.type === "Special Offer" || update.type === "Seasonal Offer" || update.type === "Weekly Offer") && (
                            <div className="pt-4">
                              <Button asChild className="w-full sm:w-auto">
                                <Link to="/contact">Get Started Today</Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="mt-16 bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground overflow-hidden relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90"></div>
              <CardContent className="pt-8 pb-8 text-center relative">
                <div className="max-w-2xl mx-auto">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-3xl font-bold mb-4">Never Miss an Update</h3>
                  <p className="mb-8 text-lg opacity-90">
                    Subscribe to get notified about new services, exclusive offers, and important announcements
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background border-0 focus:ring-2 focus:ring-white/20 outline-none"
                    />
                    <Button variant="secondary" size="lg" className="px-8">
                      Subscribe Now
                    </Button>
                  </div>
                  <p className="text-sm opacity-75 mt-4">
                    Join 1000+ subscribers who stay updated with our latest news
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2024 TaxConsult Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Updates;
