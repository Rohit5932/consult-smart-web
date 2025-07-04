import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Index = () => {
  const featuredServices = [
    {
      title: "GST Registration & Filing",
      description: "Complete GST compliance and filing services",
      icon: "📋"
    },
    {
      title: "Income Tax Returns", 
      description: "Professional ITR filing for individuals and businesses",
      icon: "💼"
    },
    {
      title: "Business Registration",
      description: "Company registration and incorporation services",
      icon: "🏢"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      text: "Excellent service for GST filing. Very professional and timely.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Priya Sharma",
      text: "Helped me with company registration. Smooth process throughout.",
      rating: "⭐⭐⭐⭐⭐"
    },
    {
      name: "Amit Patel",
      text: "Best tax consultant in the area. Highly recommended!",
      rating: "⭐⭐⭐⭐⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="TaxConsult Pro - Professional Tax & Business Consulting Services"
        description="Expert tax filing, GST compliance, and business registration services in India. Professional tax consultant with 8+ years experience. Book consultation today."
        keywords="tax consultant, GST filing, income tax returns, business registration, tax advisor, chartered accountant, India"
      />
      
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
              <Link to="/updates" className="hover:text-primary">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-4">Your Trusted Tax & Business Consultant</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional tax filing, GST compliance, and business registration services. 
            Get expert guidance for all your financial needs.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link to="/contact">Book Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4">{testimonial.rating}</div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8">Contact us today for professional tax and business consulting services</p>
          <div className="space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Book Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
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

export default Index;
