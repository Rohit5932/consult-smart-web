
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { openWhatsAppChat, getDefaultWhatsAppMessage } from "@/utils/whatsapp";
import SEO from "@/components/SEO";
import BookingForm from "@/components/BookingForm";
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, FileCheck, Users } from "lucide-react";

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
    openWhatsAppChat("919038603090", getDefaultWhatsAppMessage());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <SEO 
        title="Contact Us - TaxConsult Pro"
        description="Get in touch with TaxConsult Pro for professional tax and business consulting services. Contact form, WhatsApp chat available."
        keywords="contact tax consultant, tax advisor contact, business consultant contact"
      />
      
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TaxConsult Pro
            </h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary font-semibold text-primary">Contact</Link>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/updates" className="hover:text-primary transition-colors">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your business with expert tax and consulting services? 
              We're here to help you succeed every step of the way.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 animate-bounce" style={{animationDelay: '0s'}}>
                <Users className="h-5 w-5 text-primary" />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2 animate-bounce" style={{animationDelay: '0.5s'}}>
                <FileCheck className="h-5 w-5 text-primary" />
                <span>Expert Tax Solutions</span>
              </div>
              <div className="flex items-center space-x-2 animate-bounce" style={{animationDelay: '1s'}}>
                <Clock className="h-5 w-5 text-primary" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-8">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Send us a Message
                    </CardTitle>
                    <CardDescription className="text-base">
                      Fill out the form below and we'll get back to you within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="John Doe"
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+91 98765 43210"
                            className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john.doe@example.com"
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium">Your Message</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Tell us about your tax and business consulting needs..."
                          rows={5}
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md resize-none"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg text-lg py-6"
                      >
                        Send Message ✨
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Professional Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Professional consultation"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Professional Consultation</h3>
                    <p className="text-sm opacity-90">Expert guidance for your business success</p>
                  </div>
                </div>
              </div>

              {/* Contact Info & Services */}
              <div className="space-y-8">
                {/* Contact Information */}
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-muted/50 to-transparent hover:from-muted transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Our Office</div>
                        <div className="text-muted-foreground">Main Road, UCO Bank, Barharwa-816101</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-muted/50 to-transparent hover:from-muted transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Call Us</div>
                        <div className="text-muted-foreground">+91 9038603090</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-muted/50 to-transparent hover:from-muted transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Email Us</div>
                        <div className="text-muted-foreground">ska.bhw@gmail.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-muted/50 to-transparent hover:from-muted transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">Business Hours</div>
                        <div className="text-muted-foreground">Mon-Sat: 9:00 AM - 6:00 PM</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Booking Section */}
                  <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.05]">
                    <CardContent className="pt-6 text-center">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Book Consultation</h3>
                      <p className="text-sm text-muted-foreground mb-4">Schedule a one-on-one meeting</p>
                      <BookingForm />
                    </CardContent>
                  </Card>

                  {/* WhatsApp Section */}
                  <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.05]">
                    <CardContent className="pt-6 text-center">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce" style={{animationDelay: '0.5s'}}>
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Quick Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">Get instant support on WhatsApp</p>
                      <Button 
                        onClick={handleWhatsApp} 
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                      >
                        💬 Chat Now
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Office Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Modern office space"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Modern Office</h3>
                    <p className="text-sm opacity-90">Visit us for in-person consultations</p>
                  </div>
                </div>

                {/* Map Placeholder */}
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Find Our Location</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-64 bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="text-center text-muted-foreground z-10">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-primary animate-bounce" />
                        <p className="font-semibold text-lg">Interactive Map Coming Soon</p>
                        <p className="text-sm mt-2">Main Road, UCO Bank, Barharwa-816101</p>
                        <Button variant="outline" className="mt-4 group-hover:bg-primary group-hover:text-white transition-colors">
                          Get Directions
                        </Button>
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
      <footer className="bg-gradient-to-r from-muted to-muted/50 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              TaxConsult Pro
            </h3>
            <p className="text-muted-foreground">Your trusted partner in tax and business consulting</p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 9038603090</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span>ska.bhw@gmail.com</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 TaxConsult Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
