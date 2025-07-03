
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Blog = () => {
  const articles = [
    {
      title: "GST Filing Deadlines for 2024: Complete Guide",
      excerpt: "Stay updated with all GST filing deadlines and avoid penalties. Complete guide for businesses.",
      category: "GST Updates",
      date: "March 15, 2024",
      readTime: "5 min read"
    },
    {
      title: "Income Tax Exemptions Under Section 80C",
      excerpt: "Maximize your tax savings with these Section 80C investment options and deductions.",
      category: "Tax Tips",
      date: "March 10, 2024",
      readTime: "7 min read"
    },
    {
      title: "New Company Registration Process 2024",
      excerpt: "Step-by-step guide to register your company online with updated government procedures.",
      category: "Business Registration",
      date: "March 5, 2024",
      readTime: "10 min read"
    },
    {
      title: "TDS Rates for FY 2024-25: What You Need to Know",
      excerpt: "Updated TDS rates and thresholds for the current financial year with practical examples.",
      category: "Government Updates",
      date: "February 28, 2024",
      readTime: "6 min read"
    },
    {
      title: "Small Business Tax Planning Strategies",
      excerpt: "Effective tax planning strategies for small businesses to minimize tax liability legally.",
      category: "Tax Tips",
      date: "February 20, 2024",
      readTime: "8 min read"
    },
    {
      title: "GST Input Tax Credit: Rules and Regulations",
      excerpt: "Understanding ITC rules, eligibility criteria, and common mistakes to avoid.",
      category: "GST Updates",
      date: "February 15, 2024",
      readTime: "9 min read"
    }
  ];

  const categories = ["All", "Tax Tips", "GST Updates", "Government Updates", "Business Registration"];

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
              <Link to="/blog" className="hover:text-primary font-semibold">Blog</Link>
              <Link to="/updates" className="hover:text-primary">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Tax & Business Blog</h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Stay informed with latest tax updates, business tips, and government regulations
            </p>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {category}
                </Badge>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{article.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{article.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for latest tax updates and business tips
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 border border-input rounded-md"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                Subscribe
              </button>
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

export default Blog;
