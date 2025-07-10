
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const About = () => {
  const certifications = [
    "Chartered Accountant (CA)",
    "Certified Public Accountant (CPA)",
    "GST Practitioner Certificate",
    "Income Tax Practitioner"
  ];

  const experience = [
    {
      year: "2020-Present",
      role: "Senior Tax Consultant",
      company: "TaxConsult Pro"
    },
    {
      year: "2017-2020",
      role: "Tax Manager",
      company: "ABC Associates"
    },
    {
      year: "2015-2017",
      role: "Junior Accountant",
      company: "XYZ Chartered Accountants"
    }
  ];

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
              <Link to="/about" className="text-primary font-semibold">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact</Link>
              <Link to="/blog" className="hover:text-primary transition-colors duration-200">Blog</Link>
              <Link to="/updates" className="hover:text-primary transition-colors duration-200">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Professional Image */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="animate-fade-in">
                <div className="mb-8">
                  <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                    Meet Your Trusted Tax Expert
                  </h2>
                  <h3 className="text-3xl text-primary mb-6 font-semibold animate-pulse">Shivam Kumar</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    With over 8 years of experience in taxation and business consulting, 
                    I help individuals and businesses navigate complex tax regulations and achieve financial compliance.
                  </p>
                  <div className="flex gap-4">
                    <Link to="/contact" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Get Consultation
                    </Link>
                    <Link to="/services" className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105">
                      View Services
                    </Link>
                  </div>
                </div>
              </div>

              {/* Professional Image */}
              <div className="animate-fade-in delay-200">
                <div className="relative">
                  <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                      alt="Professional tax consultant working with clients"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                  </div>
                  {/* Floating Stats */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border animate-bounce">
                    <div className="text-2xl font-bold text-primary">8+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border animate-bounce delay-300">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-3 text-3xl">
                  <span className="text-4xl animate-bounce">🎯</span>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To provide reliable, professional, and personalized tax and business consulting services 
                  that help our clients achieve their financial goals while maintaining full compliance 
                  with regulatory requirements. We believe in building long-term relationships based on 
                  trust, transparency, and exceptional service quality.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Experience */}
              <Card className="border-primary/20 bg-gradient-to-br from-card to-secondary/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-3 text-2xl">
                    <span className="text-3xl group-hover:animate-bounce">💼</span>
                    Professional Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {experience.map((exp, index) => (
                      <div key={index} className="relative border-l-4 border-primary/50 pl-6 hover:border-primary transition-colors duration-200 hover:bg-primary/5 p-4 rounded-r-lg group/item">
                        <div className="absolute -left-2 top-4 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                        <div className="font-semibold text-foreground text-lg group-hover/item:text-primary transition-colors">{exp.role}</div>
                        <div className="text-muted-foreground mb-1">{exp.company}</div>
                        <div className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded inline-block">{exp.year}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-3 text-2xl">
                    <span className="text-3xl group-hover:animate-bounce">🏆</span>
                    Certifications & Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 transform hover:scale-105 group/cert">
                        <span className="text-primary mr-4 text-2xl group-hover/cert:animate-pulse">✓</span>
                        <span className="text-foreground group-hover/cert:text-primary transition-colors">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Us */}
            <Card className="mt-12 border-primary/20 bg-gradient-to-br from-card to-accent/5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-primary text-center text-4xl mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Why Choose TaxConsult Pro?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-8 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 transform hover:scale-110 group shadow-lg">
                    <div className="text-5xl mb-6 group-hover:animate-bounce">🎯</div>
                    <h4 className="font-bold mb-4 text-primary text-xl">Expertise</h4>
                    <p className="text-muted-foreground leading-relaxed">Deep knowledge of tax laws and business regulations with 8+ years of experience</p>
                  </div>
                  <div className="text-center p-8 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 hover:from-accent/10 hover:to-primary/10 transition-all duration-300 transform hover:scale-110 group shadow-lg">
                    <div className="text-5xl mb-6 group-hover:animate-bounce">⏱️</div>
                    <h4 className="font-bold mb-4 text-primary text-xl">Timely Service</h4>
                    <p className="text-muted-foreground leading-relaxed">Quick turnaround times and deadline adherence for all your tax needs</p>
                  </div>
                  <div className="text-center p-8 rounded-xl bg-gradient-to-br from-secondary/5 to-accent/5 hover:from-secondary/10 hover:to-accent/10 transition-all duration-300 transform hover:scale-110 group shadow-lg">
                    <div className="text-5xl mb-6 group-hover:animate-bounce">🤝</div>
                    <h4 className="font-bold mb-4 text-primary text-xl">Personal Touch</h4>
                    <p className="text-muted-foreground leading-relaxed">Personalized service tailored to your specific business requirements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your tax and business needs. Schedule a free consultation today!
            </p>
            <div className="flex gap-6 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold">
                Schedule Consultation
              </Link>
              <Link to="/services" className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 text-lg font-semibold">
                Explore Services
              </Link>
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

export default About;
