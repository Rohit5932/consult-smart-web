
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleWhatsApp = () => {
    const message = "Hi, I would like to inquire about your tax consulting services.";
    const whatsappUrl = `https://wa.me/919038603090?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
              <Link to="/contact" className="hover:text-primary font-semibold">Contact</Link>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <Link to="/updates" className="hover:text-primary">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Contact Us</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Get in touch with us for professional tax and business consulting services
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info & Map */}
              <div className="space-y-8">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <div className="font-semibold">Address</div>
                        <div className="text-muted-foreground">Main Road,UCO Bank,Barharwa-816101</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-muted-foreground">+91 9038603090</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📧</span>
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-muted-foreground">ska.bhw@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🕒</span>
                      <div>
                        <div className="font-semibold">Business Hours</div>
                        <div className="text-muted-foreground">Mon-Sat: 9:00 AM - 6:00 PM</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WhatsApp Button */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-2">Need Quick Help?</h3>
                      <p className="text-muted-foreground mb-4">Chat with us on WhatsApp for instant support</p>
                      <Button onClick={handleWhatsApp} className="bg-green-500 hover:bg-green-600">
                        💬 Chat on WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Embedded Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Find Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <span className="text-4xl block mb-2">🗺️</span>
                        <p>Google Maps Integration</p>
                        <p className="text-sm">Main Road,UCO Bank,Barharwa-816101</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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

export default Contact;
