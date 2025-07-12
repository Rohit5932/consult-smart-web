import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2, BookmarkPlus, TrendingUp, FileText, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArticleDetail = () => {
  const { articleId } = useParams();

  // Sample article data - in a real app, this would come from an API
  const articlesData: Record<string, any> = {
    "gst-filing-deadlines-2024": {
      id: "gst-filing-deadlines-2024",
      title: "GST Filing Deadlines for 2024: Complete Guide",
      excerpt: "Stay updated with all GST filing deadlines and avoid penalties. Complete guide for businesses.",
      category: "GST Updates",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
      author: "Shivam Kumar",
      content: `
        <h2>Understanding GST Filing Deadlines</h2>
        <p>Goods and Services Tax (GST) filing is a crucial compliance requirement for all registered businesses in India. Missing deadlines can result in penalties and interest charges that can significantly impact your business finances.</p>
        
        <h3>Key GST Filing Deadlines for 2024</h3>
        <ul>
          <li><strong>GSTR-1 (Monthly):</strong> 11th of the following month</li>
          <li><strong>GSTR-3B (Monthly):</strong> 20th of the following month</li>
          <li><strong>GSTR-1 (Quarterly):</strong> 13th of the month following the quarter</li>
          <li><strong>GSTR-3B (Quarterly):</strong> 22nd of the month following the quarter</li>
        </ul>
        
        <h3>Important Changes in 2024</h3>
        <p>The government has introduced several changes to GST filing procedures this year. These include simplified forms, extended deadlines for certain categories, and enhanced digital infrastructure.</p>
        
        <h3>Penalties for Late Filing</h3>
        <p>Late filing attracts a penalty of ₹50 per day for CGST and ₹50 per day for SGST, with a maximum penalty of ₹5,000. For businesses with nil tax liability, the penalty is ₹20 per day for each tax (CGST and SGST).</p>
        
        <h3>Best Practices</h3>
        <ol>
          <li>Maintain proper books of accounts</li>
          <li>Set up calendar reminders for filing deadlines</li>
          <li>Reconcile your purchases and sales regularly</li>
          <li>Use reliable GST software for accurate calculations</li>
        </ol>
        
        <p>Stay compliant and avoid unnecessary penalties by following these guidelines and marking your calendar with the important dates mentioned above.</p>
      `
    },
    "income-tax-exemptions-80c": {
      id: "income-tax-exemptions-80c",
      title: "Income Tax Exemptions Under Section 80C",
      excerpt: "Maximize your tax savings with these Section 80C investment options and deductions.",
      category: "Tax Tips",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9",
      author: "Shivam Kumar",
      content: `
        <h2>Complete Guide to Section 80C Tax Savings</h2>
        <p>Section 80C of the Income Tax Act offers one of the most popular ways to reduce your taxable income. You can claim deductions up to ₹1.5 lakh annually under this section.</p>
        
        <h3>Investment Options Under Section 80C</h3>
        <ul>
          <li><strong>Public Provident Fund (PPF):</strong> 15-year lock-in period, tax-free returns</li>
          <li><strong>Equity Linked Savings Scheme (ELSS):</strong> 3-year lock-in, market-linked returns</li>
          <li><strong>Employee Provident Fund (EPF):</strong> Automatic deduction from salary</li>
          <li><strong>National Savings Certificate (NSC):</strong> 5-year term, fixed returns</li>
          <li><strong>Tax Saving Fixed Deposits:</strong> 5-year lock-in, guaranteed returns</li>
        </ul>
        
        <h3>Other Deductions Under 80C</h3>
        <ul>
          <li>Life insurance premium payments</li>
          <li>Home loan principal repayment</li>
          <li>Children's tuition fees</li>
          <li>Sukanya Samriddhi Yojana contributions</li>
        </ul>
        
        <h3>Smart Tax Planning Strategy</h3>
        <p>Diversify your 80C investments based on your risk appetite and financial goals. Consider a mix of ELSS for growth, PPF for stability, and life insurance for protection.</p>
        
        <h3>Important Points to Remember</h3>
        <ol>
          <li>Maximum deduction limit is ₹1.5 lakh per financial year</li>
          <li>Premature withdrawal may attract tax implications</li>
          <li>Keep all investment proofs for tax filing</li>
          <li>Start investing early in the financial year for better planning</li>
        </ol>
      `
    }
  };

  const article = articlesData[articleId || ""];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Breadcrumb */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-8 animate-fade-in">
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
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <BookmarkPlus className="w-4 h-4" />
                  Save
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none animate-fade-in prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:mb-2 prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl border border-primary/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Need Professional Tax Consultation?</h3>
                <p className="text-muted-foreground mb-6">
                  Get expert advice tailored to your specific tax situation. Our certified professionals are here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/book-appointment">
                    <Button size="lg" className="px-8">
                      Book Consultation
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="px-8">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2024 TaxConsult Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetail;