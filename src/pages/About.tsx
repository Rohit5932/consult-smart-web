
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

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Section */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-6 flex items-center justify-center shadow-lg border-2 border-primary/10 hover-scale transition-all duration-300">
                <span className="text-4xl animate-pulse">👨‍💼</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Meet Your Consultant</h2>
              <h3 className="text-2xl text-primary mb-4 font-semibold">Shivam Kumar</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                With over 8 years of experience in taxation and business consulting, 
                I help individuals and businesses navigate complex tax regulations and achieve financial compliance.
              </p>
            </div>

            {/* Mission */}
            <Card className="mb-12 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide reliable, professional, and personalized tax and business consulting services 
                  that help our clients achieve their financial goals while maintaining full compliance 
                  with regulatory requirements. We believe in building long-term relationships based on 
                  trust, transparency, and exceptional service quality.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Experience */}
              <Card className="border-primary/20 bg-gradient-to-br from-card to-secondary/10 shadow-lg hover-scale transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <span className="text-2xl">💼</span>
                    Professional Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-primary/50 pl-4 hover:border-primary transition-colors duration-200 hover:bg-primary/5 p-2 rounded-r">
                        <div className="font-semibold text-foreground">{exp.role}</div>
                        <div className="text-sm text-muted-foreground">{exp.company}</div>
                        <div className="text-sm text-primary font-medium">{exp.year}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/10 shadow-lg hover-scale transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    Certifications & Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center p-2 rounded hover:bg-primary/5 transition-colors duration-200">
                        <span className="text-primary mr-3 text-lg">✓</span>
                        <span className="text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Us */}
            <Card className="mt-12 border-primary/20 bg-gradient-to-br from-card to-accent/5 shadow-lg hover-scale transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-primary text-center text-3xl mb-6">Why Choose TaxConsult Pro?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 hover-scale group">
                    <div className="text-4xl mb-4 group-hover:animate-bounce">🎯</div>
                    <h4 className="font-semibold mb-3 text-primary text-lg">Expertise</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Deep knowledge of tax laws and business regulations</p>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-accent/5 to-primary/5 hover:from-accent/10 hover:to-primary/10 transition-all duration-300 hover-scale group">
                    <div className="text-4xl mb-4 group-hover:animate-bounce">⏱️</div>
                    <h4 className="font-semibold mb-3 text-primary text-lg">Timely Service</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Quick turnaround times and deadline adherence</p>
                  </div>
                  <div className="text-center p-6 rounded-lg bg-gradient-to-br from-secondary/5 to-accent/5 hover:from-secondary/10 hover:to-accent/10 transition-all duration-300 hover-scale group">
                    <div className="text-4xl mb-4 group-hover:animate-bounce">🤝</div>
                    <h4 className="font-semibold mb-3 text-primary text-lg">Personal Touch</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">Personalized service tailored to your needs</p>
                  </div>
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

export default About;
