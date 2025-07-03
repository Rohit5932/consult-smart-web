
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">TaxConsult Pro</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <Link to="/services" className="hover:text-primary">Services</Link>
              <Link to="/about" className="hover:text-primary font-semibold">About</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
              <Link to="/updates" className="hover:text-primary">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Section */}
            <div className="text-center mb-16">
              <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Meet Your Consultant</h2>
              <h3 className="text-2xl text-primary mb-4">Shivam kumar</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                With over 8 years of experience in taxation and business consulting, 
                I help individuals and businesses navigate complex tax regulations and achieve financial compliance.
              </p>
            </div>

            {/* Mission */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide reliable, professional, and personalized tax and business consulting services 
                  that help our clients achieve their financial goals while maintaining full compliance 
                  with regulatory requirements. We believe in building long-term relationships based on 
                  trust, transparency, and exceptional service quality.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <div className="font-semibold">{exp.role}</div>
                        <div className="text-sm text-muted-foreground">{exp.company}</div>
                        <div className="text-sm text-primary">{exp.year}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why Choose Us */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Why Choose TaxConsult Pro?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <h4 className="font-semibold mb-2">Expertise</h4>
                    <p className="text-sm text-muted-foreground">Deep knowledge of tax laws and business regulations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⏱️</div>
                    <h4 className="font-semibold mb-2">Timely Service</h4>
                    <p className="text-sm text-muted-foreground">Quick turnaround times and deadline adherence</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🤝</div>
                    <h4 className="font-semibold mb-2">Personal Touch</h4>
                    <p className="text-sm text-muted-foreground">Personalized service tailored to your needs</p>
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
