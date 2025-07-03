
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Updates = () => {
  const updates = [
    {
      title: "New Service: Digital Signature Certificate (DSC)",
      description: "We now offer Digital Signature Certificate services for secure online document signing and e-filing.",
      type: "New Service",
      date: "March 20, 2024",
      isNew: true
    },
    {
      title: "Special Offer: GST Registration + Filing Package",
      description: "Get GST registration and first 3 months filing at a discounted rate. Limited time offer!",
      type: "Special Offer",
      date: "March 18, 2024",
      isNew: true
    },
    {
      title: "ITR Filing Season 2024 - Early Bird Discount",
      description: "File your Income Tax Returns early and save 20% on our professional ITR filing services.",
      type: "Seasonal Offer",
      date: "March 15, 2024",
      isNew: false
    },
    {
      title: "New Branch Opening in Pune",
      description: "We're expanding! Our new Pune branch is now open to serve customers in Maharashtra region.",
      type: "Company News",
      date: "March 10, 2024",
      isNew: false
    },
    {
      title: "Updated: Company Registration Fees Reduced",
      description: "Government has reduced company registration fees. Pass on the savings to our customers with revised pricing.",
      type: "Government Update",
      date: "March 5, 2024",
      isNew: false
    },
    {
      title: "New Service: MSME Registration & Udyam Certificate",
      description: "Now offering MSME registration and Udyam certificate services for small and medium enterprises.",
      type: "New Service",
      date: "February 28, 2024",
      isNew: false
    },
    {
      title: "Partnership with Leading Banks for Loan Assistance",
      description: "We've partnered with major banks to help our clients get business loans and financial assistance.",
      type: "Partnership",
      date: "February 25, 2024",
      isNew: false
    },
    {
      title: "Free Consultation Fridays",
      description: "Every Friday, get free 30-minute consultation for new clients. Book your slot in advance.",
      type: "Weekly Offer",
      date: "February 20, 2024",
      isNew: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "New Service":
        return "bg-green-500";
      case "Special Offer":
        return "bg-orange-500";
      case "Seasonal Offer":
        return "bg-blue-500";
      case "Company News":
        return "bg-purple-500";
      case "Government Update":
        return "bg-red-500";
      case "Partnership":
        return "bg-teal-500";
      case "Weekly Offer":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TaxConsult Pro</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <Link to="/services" className="hover:text-primary">Services</Link>
              <Link to="/about" className="hover:text-primary">About</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <Link to="/updates" className="hover:text-primary font-semibold">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Updates Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Latest Updates</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Stay informed about our new services, special offers, and important announcements
            </p>

            {/* Updates List */}
            <div className="space-y-6">
              {updates.map((update, index) => (
                <Card key={index} className="relative">
                  {update.isNew && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white">NEW</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`text-white ${getTypeColor(update.type)}`}>
                            {update.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{update.date}</span>
                        </div>
                        <CardTitle className="text-xl">{update.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {update.description}
                    </CardDescription>
                    {(update.type === "Special Offer" || update.type === "Seasonal Offer" || update.type === "Weekly Offer") && (
                      <Button asChild>
                        <Link to="/contact">Learn More</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter Signup */}
            <Card className="mt-12 bg-primary text-primary-foreground">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-4">Never Miss an Update</h3>
                <p className="mb-6">Subscribe to get notified about new services, offers, and important announcements</p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-2 rounded-md text-black"
                  />
                  <Button variant="secondary">
                    Subscribe
                  </Button>
                </div>
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

export default Updates;
