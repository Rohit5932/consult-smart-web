
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, TrendingUp, FileText, Building2 } from "lucide-react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const articles = [
    {
      id: "gst-filing-deadlines-2024",
      title: "GST Filing Deadlines for 2024: Complete Guide",
      excerpt: "Stay updated with all GST filing deadlines and avoid penalties. Complete guide for businesses.",
      category: "GST Updates",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
      featured: true
    },
    {
      id: "income-tax-exemptions-80c",
      title: "Income Tax Exemptions Under Section 80C",
      excerpt: "Maximize your tax savings with these Section 80C investment options and deductions.",
      category: "Tax Tips",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9",
      featured: false
    },
    {
      id: "company-registration-process-2024",
      title: "New Company Registration Process 2024",
      excerpt: "Step-by-step guide to register your company online with updated government procedures.",
      category: "Business Registration",
      date: "March 5, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      featured: false
    },
    {
      id: "tds-rates-fy-2024-25",
      title: "TDS Rates for FY 2024-25: What You Need to Know",
      excerpt: "Updated TDS rates and thresholds for the current financial year with practical examples.",
      category: "Government Updates",
      date: "February 28, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      featured: false
    },
    {
      id: "small-business-tax-planning",
      title: "Small Business Tax Planning Strategies",
      excerpt: "Effective tax planning strategies for small businesses to minimize tax liability legally.",
      category: "Tax Tips",
      date: "February 20, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      featured: false
    },
    {
      id: "gst-input-tax-credit-rules",
      title: "GST Input Tax Credit: Rules and Regulations",
      excerpt: "Understanding ITC rules, eligibility criteria, and common mistakes to avoid.",
      category: "GST Updates",
      date: "February 15, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1586880244386-2e291ba3f2c4",
      featured: false
    }
  ];

  const categories = ["All", "Tax Tips", "GST Updates", "Government Updates", "Business Registration"];

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tax Tips": return <TrendingUp className="w-4 h-4" />;
      case "GST Updates": return <FileText className="w-4 h-4" />;
      case "Government Updates": return <Building2 className="w-4 h-4" />;
      case "Business Registration": return <Building2 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
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
              <Link to="/blog" className="hover:text-primary font-semibold">Blog</Link>
              <Link to="/updates" className="hover:text-primary transition-colors duration-200">Updates</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Tax & Business Insights
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Stay informed with latest tax updates, business tips, and government regulations from industry experts
              </p>
              <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2 animate-bounce">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Expert Articles</span>
                </div>
                <div className="flex items-center gap-2 animate-bounce delay-100">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Latest Updates</span>
                </div>
                <div className="flex items-center gap-2 animate-bounce delay-200">
                  <User className="w-5 h-5 text-primary" />
                  <span>Professional Advice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
              {categories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 px-4 py-2 text-sm shadow-sm ${
                    selectedCategory === category 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {category !== "All" && getCategoryIcon(category)}
                  <span className={category !== "All" ? "ml-2" : ""}>{category}</span>
                </Badge>
              ))}
            </div>

            {/* Featured Article */}
            {filteredArticles.filter(article => article.featured).map((article, index) => (
              <Card key={index} className="mb-12 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getCategoryIcon(article.category)}
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                    <Link to={`/blog/${article.id}`}>
                      <h3 className="text-2xl font-bold mb-4 text-foreground hover:text-primary transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <Link to={`/blog/${article.id}`}>
                      <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 self-start shadow-lg">
                        Read Full Article
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.filter(article => !article.featured).map((article, index) => (
                <Link to={`/blog/${article.id}`} key={index}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 group border-primary/20 bg-gradient-to-br from-card to-secondary/5">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm"
                    >
                      {getCategoryIcon(article.category)}
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium text-sm group-hover:underline">
                        Read More →
                      </span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        Shivam Kumar
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12 animate-fade-in">
              <button className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                Load More Articles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="text-6xl mb-6 animate-bounce">📧</div>
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stay Updated with Expert Insights
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Subscribe to our newsletter for latest tax updates, business tips, and exclusive content from our experts
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Join 1000+ professionals who trust our insights. No spam, unsubscribe anytime.
              </p>
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
