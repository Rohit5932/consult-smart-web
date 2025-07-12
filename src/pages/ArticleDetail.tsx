import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2, BookmarkPlus, TrendingUp, FileText, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const { toast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: url,
        });
      } catch (error) {
        // User cancelled the share
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Article link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not copy link to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = () => {
    // Save to localStorage
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    const isAlreadySaved = savedArticles.find((saved: any) => saved.id === articleId);
    
    if (isAlreadySaved) {
      toast({
        title: "Already saved",
        description: "This article is already in your saved list.",
      });
    } else {
      savedArticles.push({ id: articleId, title: article.title, savedAt: new Date().toISOString() });
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      toast({
        title: "Article saved!",
        description: "You can find this article in your saved list.",
      });
    }
  };

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
    },
    "company-registration-process-2024": {
      id: "company-registration-process-2024",
      title: "Complete Company Registration Process 2024",
      excerpt: "Step-by-step guide to register your company in India. Simplified process, required documents, and timelines.",
      category: "Business Registration",
      date: "March 8, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      author: "Shivam Kumar",
      content: `
        <h2>Company Registration Made Simple</h2>
        <p>Starting a company in India has become significantly easier with online processes and government initiatives. This comprehensive guide will walk you through every step of the company registration process for 2024.</p>
        
        <h3>Types of Company Registration</h3>
        <ul>
          <li><strong>Private Limited Company:</strong> Most popular choice for startups and small businesses</li>
          <li><strong>Public Limited Company:</strong> For larger businesses planning to go public</li>
          <li><strong>One Person Company (OPC):</strong> Ideal for solo entrepreneurs</li>
          <li><strong>Limited Liability Partnership (LLP):</strong> Good for professional services</li>
        </ul>
        
        <h3>Required Documents</h3>
        <ul>
          <li>PAN Card of all directors and shareholders</li>
          <li>Aadhaar Card of all directors and shareholders</li>
          <li>Passport size photographs</li>
          <li>Address proof of registered office</li>
          <li>Digital Signature Certificate (DSC)</li>
          <li>Director Identification Number (DIN)</li>
        </ul>
        
        <h3>Step-by-Step Process</h3>
        <ol>
          <li><strong>Name Reservation:</strong> Apply for company name approval through RUN (Reserve Unique Name)</li>
          <li><strong>DSC and DIN:</strong> Obtain Digital Signature Certificate and Director Identification Number</li>
          <li><strong>Draft Documents:</strong> Prepare Memorandum and Articles of Association</li>
          <li><strong>File SPICe+:</strong> Submit incorporation application with required forms</li>
          <li><strong>PAN and TAN:</strong> Obtain company PAN and TAN</li>
          <li><strong>Bank Account:</strong> Open company bank account</li>
        </ol>
        
        <h3>Timeline and Costs</h3>
        <p>The entire process typically takes 10-15 working days and costs between ₹15,000 to ₹25,000 including government fees and professional charges.</p>
        
        <h3>Post-Incorporation Compliance</h3>
        <ul>
          <li>File annual returns and financial statements</li>
          <li>Conduct board meetings quarterly</li>
          <li>Maintain statutory registers</li>
          <li>Comply with GST and income tax requirements</li>
        </ul>
      `
    },
    "digital-signature-guide-2024": {
      id: "digital-signature-guide-2024",
      title: "Digital Signature Certificate Guide 2024",
      excerpt: "Everything you need to know about Digital Signature Certificates for business compliance and online filing.",
      category: "Government Updates",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
      author: "Shivam Kumar",
      content: `
        <h2>Digital Signature Certificate Explained</h2>
        <p>Digital Signature Certificate (DSC) is a digital equivalent of a physical signature that ensures the authenticity and integrity of electronic documents. It's mandatory for various government filings and online transactions.</p>
        
        <h3>Types of Digital Signature</h3>
        <ul>
          <li><strong>Class 1:</strong> Basic email verification</li>
          <li><strong>Class 2:</strong> Most common for business use (ROC filings, GST, ITR)</li>
          <li><strong>Class 3:</strong> Highest level of security for e-commerce and banking</li>
        </ul>
        
        <h3>When Do You Need DSC?</h3>
        <ul>
          <li>Company incorporation and ROC filings</li>
          <li>GST registration and returns</li>
          <li>Income tax returns for companies</li>
          <li>EPF and ESI registrations</li>
          <li>Import-export documentation</li>
          <li>Tender submissions</li>
        </ul>
        
        <h3>How to Obtain DSC</h3>
        <ol>
          <li>Choose a certified Registration Authority (RA)</li>
          <li>Submit application with required documents</li>
          <li>Complete verification process</li>
          <li>Receive DSC on USB token or download</li>
        </ol>
        
        <h3>Required Documents</h3>
        <ul>
          <li>PAN Card</li>
          <li>Aadhaar Card</li>
          <li>Passport size photograph</li>
          <li>Address proof</li>
          <li>For organizations: Certificate of incorporation</li>
        </ul>
        
        <h3>Validity and Renewal</h3>
        <p>DSC is typically valid for 1-3 years depending on the type chosen. It's important to renew before expiry to avoid disruption in filing processes.</p>
        
        <h3>Cost and Processing Time</h3>
        <p>Class 2 DSC costs around ₹1,500-₹3,000 and is processed within 2-3 working days after verification.</p>
      `
    },
    "annual-filing-requirements-2024": {
      id: "annual-filing-requirements-2024",
      title: "Annual Filing Requirements for Companies 2024",
      excerpt: "Complete checklist of annual compliance requirements for companies including due dates and penalties.",
      category: "Government Updates",
      date: "March 3, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
      author: "Shivam Kumar",
      content: `
        <h2>Annual Compliance Calendar for Companies</h2>
        <p>Every company in India must comply with various annual filing requirements under the Companies Act, Income Tax Act, and other applicable laws. Missing deadlines can result in hefty penalties and legal consequences.</p>
        
        <h3>ROC Filings (Companies Act)</h3>
        <ul>
          <li><strong>Annual Return (MGT-7):</strong> Within 60 days of AGM</li>
          <li><strong>Financial Statements (AOC-4):</strong> Within 30 days of AGM</li>
          <li><strong>Board Resolution:</strong> For AGM approval within 15 days</li>
          <li><strong>DIR-3 KYC:</strong> Annual KYC for all directors</li>
        </ul>
        
        <h3>Income Tax Filings</h3>
        <ul>
          <li><strong>ITR Filing:</strong> By 31st October (extended deadline)</li>
          <li><strong>Tax Audit Report:</strong> By 31st October (if applicable)</li>
          <li><strong>Advance Tax:</strong> Quarterly payments</li>
          <li><strong>TDS Returns:</strong> Quarterly filing</li>
        </ul>
        
        <h3>GST Compliance</h3>
        <ul>
          <li><strong>GSTR-9:</strong> Annual return by 31st December</li>
          <li><strong>GSTR-9C:</strong> Reconciliation statement (if turnover > ₹2 crore)</li>
          <li><strong>Monthly/Quarterly Returns:</strong> As per registration type</li>
        </ul>
        
        <h3>Other Important Filings</h3>
        <ul>
          <li><strong>EPF Annual Return:</strong> ECR and annual return</li>
          <li><strong>ESI Returns:</strong> Monthly/quarterly as applicable</li>
          <li><strong>Professional Tax:</strong> State-wise compliance</li>
          <li><strong>Labour Law Compliance:</strong> Various returns based on applicability</li>
        </ul>
        
        <h3>Penalties for Non-Compliance</h3>
        <p>Late filing attracts significant penalties ranging from ₹5,000 to ₹5 lakh depending on the type of default and company size.</p>
        
        <h3>Best Practices</h3>
        <ol>
          <li>Maintain a compliance calendar</li>
          <li>Engage qualified professionals</li>
          <li>Keep all documents ready well in advance</li>
          <li>Set up reminder systems</li>
          <li>Regular review of compliance status</li>
        </ol>
      `
    },
    "tax-planning-strategies-2024": {
      id: "tax-planning-strategies-2024",
      title: "Tax Planning Strategies for 2024",
      excerpt: "Smart tax planning strategies to minimize your tax liability legally and maximize savings for the year 2024.",
      category: "Tax Tips",
      date: "March 1, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1554224154-26032fced8bd",
      author: "Shivam Kumar",
      content: `
        <h2>Strategic Tax Planning for 2024</h2>
        <p>Effective tax planning is not just about saving money; it's about making informed financial decisions that align with your long-term goals. Here are proven strategies to optimize your tax liability for 2024.</p>
        
        <h3>Investment-Based Tax Savings</h3>
        <ul>
          <li><strong>Section 80C Investments:</strong> ELSS, PPF, NSC, life insurance premiums</li>
          <li><strong>Section 80D:</strong> Health insurance premiums for self and family</li>
          <li><strong>Section 80G:</strong> Donations to approved charitable organizations</li>
          <li><strong>NPS (Section 80CCD):</strong> Additional ₹50,000 deduction</li>
        </ul>
        
        <h3>Business Tax Planning</h3>
        <ul>
          <li><strong>Capital Expenditure:</strong> Time purchases for depreciation benefits</li>
          <li><strong>Revenue Expenses:</strong> Pre-pay expenses before year-end</li>
          <li><strong>Bonus Provisions:</strong> Accrue bonus payments within due dates</li>
          <li><strong>Bad Debt Write-offs:</strong> Write off genuinely bad debts</li>
        </ul>
        
        <h3>Income Shifting Strategies</h3>
        <ul>
          <li><strong>Family Trusts:</strong> Distribute income among family members</li>
          <li><strong>Salary to Family:</strong> Employ family members legitimately</li>
          <li><strong>Gift Strategies:</strong> Utilize annual gift exemptions</li>
        </ul>
        
        <h3>Long-term vs Short-term Gains</h3>
        <p>Plan your investment exits to benefit from lower long-term capital gains tax rates. Hold equity investments for more than one year to enjoy tax-free gains.</p>
        
        <h3>Retirement Planning</h3>
        <ol>
          <li><strong>EPF Maximization:</strong> Contribute maximum to EPF</li>
          <li><strong>VPF Contribution:</strong> Voluntary provident fund for additional savings</li>
          <li><strong>NPS Investment:</strong> Benefit from dual deduction</li>
          <li><strong>Pension Plans:</strong> Consider tax-efficient pension products</li>
        </ol>
        
        <h3>Year-End Tax Moves</h3>
        <ul>
          <li>Review and rebalance investment portfolio</li>
          <li>Harvest tax losses from equity investments</li>
          <li>Pay advance tax to avoid interest charges</li>
          <li>Review salary structure for tax optimization</li>
        </ul>
        
        <h3>New Tax Regime Considerations</h3>
        <p>Evaluate whether the new tax regime with lower rates and no deductions suits your financial situation better than the old regime with deductions.</p>
        
        <h3>Documentation and Record Keeping</h3>
        <p>Maintain proper documentation for all investments, expenses, and transactions. Good record-keeping is essential for claiming deductions and during tax assessments.</p>
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
                <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={handleSave}>
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