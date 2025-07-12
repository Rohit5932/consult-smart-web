import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle, Clock, FileText, Users, Phone, Mail, MapPin, Star, TrendingUp, BarChart3, IndianRupee, Award } from "lucide-react";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const serviceDetails = {
    "gst": {
      title: "GST Registration & Filing Services",
      description: "Complete GST compliance solution including registration, monthly filing, and expert consultation for businesses of all sizes",
      price: "₹2,999",
      originalPrice: "₹4,999",
      duration: "7-10 days",
      rating: 4.8,
      reviews: 127,
      color: "blue",
      whyNeeded: [
        "Legal requirement for businesses with turnover above ₹20 lakhs (₹10 lakhs for special category states)",
        "Mandatory for interstate transactions regardless of turnover",
        "Required for claiming input tax credit on business purchases",
        "Essential for government contracts and B2B transactions",
        "Builds business credibility and legal compliance"
      ],
      impact: [
        "Reduces overall tax burden through input tax credit mechanism",
        "Streamlines tax compliance across India with single registration",
        "Eliminates cascading effect of taxes, reducing product costs",
        "Improves business transparency and reduces tax evasion",
        "Facilitates easier interstate business operations"
      ],
      governmentRules: [
        "GST Act 2017 - Central Goods and Services Tax Act",
        "Turnover threshold: ₹20 lakhs for goods, ₹10 lakhs for services",
        "Mandatory e-filing of monthly returns (GSTR-1, GSTR-3B)",
        "Input tax credit rules under Section 16 of CGST Act",
        "Late filing penalties: ₹200 per day per return (max ₹5,000)",
        "Reverse charge mechanism for specified services",
        "Composition scheme available for small businesses (max 3% tax)"
      ],
      features: [
        "Complete GST registration within 7-10 days",
        "Monthly GSTR-1 and GSTR-3B filing",
        "Quarterly GSTR-9 annual return preparation",
        "Input tax credit optimization and reconciliation",
        "Expert consultation on GST compliance",
        "Real-time compliance monitoring",
        "Penalty protection and deadline management"
      ],
      process: [
        "Document collection and verification (PAN, Aadhaar, business proof)",
        "Online GST registration application on government portal",
        "Application review and verification by GST officer",
        "GST registration certificate issuance",
        "Monthly sales return filing (GSTR-1) by 11th of next month",
        "Purchase return auto-population and verification",
        "Monthly GST payment return filing (GSTR-3B) by 20th of next month",
        "Input tax credit reconciliation and optimization",
        "Annual return filing (GSTR-9) by December 31st"
      ],
      documents: [
        "PAN Card of business entity/proprietor",
        "Aadhaar Card of authorized signatory",
        "Business registration certificate/incorporation certificate",
        "Bank account statement or cancelled cheque",
        "Registered office address proof with NOC",
        "Rent agreement and NOC from landlord",
        "Photograph and signature of authorized signatory",
        "Board resolution for company authorization",
        "Digital signature certificate (for companies)",
        "Partnership deed (for partnership firms)"
      ],
      benefits: [
        "Legal compliance with Indian tax laws",
        "Input tax credit benefits reducing overall tax burden",
        "Enhanced business credibility with customers and vendors",
        "Eligibility for government tenders and schemes",
        "Simplified tax structure across India",
        "Online tax filing and digital record maintenance",
        "Professional consultation and ongoing support"
      ]
    },
    "itr": {
      title: "Income Tax Return Filing",
      description: "Professional ITR filing services for individuals, HUF, and businesses with maximum refund optimization and expert tax planning",
      price: "₹1,499",
      originalPrice: "₹2,499",
      duration: "3-5 days",
      rating: 4.7,
      reviews: 189,
      color: "green",
      whyNeeded: [
        "Legal obligation under Income Tax Act 1961 for eligible taxpayers",
        "Required for claiming tax refunds from excess TDS deductions",
        "Mandatory for loan applications and visa processing",
        "Essential for carrying forward losses to future years",
        "Required for high-value transactions (property purchase, etc.)"
      ],
      impact: [
        "Ensures compliance with tax laws and avoids penalties",
        "Enables claiming of tax refunds worth thousands of rupees",
        "Provides legal proof of income for various purposes",
        "Helps in proper tax planning and future financial decisions",
        "Maintains clean financial records for business growth"
      ],
      governmentRules: [
        "Income Tax Act 1961 - Central Direct Tax Law",
        "Filing deadline: July 31st for individuals, September 30th for audit cases",
        "Mandatory if annual income exceeds ₹2.5 lakhs",
        "Late filing penalty: ₹5,000 (₹1,000 if income below ₹5 lakhs)",
        "Section 80C deductions up to ₹1.5 lakhs available",
        "New tax regime vs old tax regime options",
        "TDS reconciliation mandatory for refund claims"
      ],
      features: [
        "All ITR forms supported (ITR-1 to ITR-7)",
        "Maximum refund optimization through deductions",
        "Capital gains and loss calculations",
        "Complete TDS and advance tax reconciliation",
        "Expert review and error-free filing",
        "Income tax notice assistance",
        "Future tax planning consultation"
      ],
      process: [
        "Financial document collection and analysis",
        "Income calculation from all sources (salary, business, capital gains)",
        "Deduction optimization under Chapter VIA (80C, 80D, etc.)",
        "Tax liability calculation and advance tax adjustment",
        "TDS reconciliation and refund calculation",
        "ITR preparation with appropriate form selection",
        "Online filing on income tax e-filing portal",
        "ITR-V submission and processing verification",
        "Refund tracking and status monitoring"
      ],
      documents: [
        "Form 16/16A from all employers",
        "Bank statements for all savings and current accounts",
        "Interest certificates from banks and financial institutions",
        "Investment proofs (80C): PPF, ELSS, Insurance, NSC",
        "Medical insurance premium receipts (80D)",
        "Home loan interest certificate (80EE/24b)",
        "Property sale/purchase documents for capital gains",
        "Business profit & loss statement (for business income)",
        "Previous year ITR acknowledgment",
        "Rental income agreements and property tax receipts"
      ],
      benefits: [
        "Maximum tax refund through expert optimization",
        "Legal compliance and penalty avoidance",
        "Professional tax planning for future years",
        "Quick refund processing within 30-45 days",
        "Expert consultation on tax-saving investments",
        "Clean financial records for loan applications",
        "Peace of mind with professional handling"
      ]
    },
    "business": {
      title: "Business Registration Services",
      description: "Complete business incorporation services including Private Limited Company, LLP, Partnership, and Proprietorship registration with legal compliance",
      price: "₹8,999",
      originalPrice: "₹12,999",
      duration: "15-20 days",
      rating: 4.6,
      reviews: 156,
      color: "purple",
      whyNeeded: [
        "Legal requirement for conducting business activities in India",
        "Provides separate legal identity and limited liability protection",
        "Essential for opening business bank accounts and raising funds",
        "Mandatory for obtaining business licenses and permits",
        "Required for participating in government tenders and schemes"
      ],
      impact: [
        "Limited liability protection for business owners",
        "Enhanced credibility with customers, vendors, and investors",
        "Access to formal banking system and credit facilities",
        "Eligibility for government subsidies and startup schemes",
        "Professional business structure enabling growth and expansion"
      ],
      governmentRules: [
        "Companies Act 2013 for Private Limited Companies",
        "Limited Liability Partnership Act 2008 for LLP registration",
        "Partnership Act 1932 for traditional partnerships",
        "Minimum 2 directors required for Private Limited Company",
        "DIN (Director Identification Number) mandatory for all directors",
        "DSC (Digital Signature Certificate) required for online filing",
        "Minimum authorized capital: ₹1 lakh (can be ₹1 also post-2015 amendment)"
      ],
      features: [
        "Complete company incorporation with Certificate of Incorporation",
        "DIN and DSC arrangement for all directors",
        "Memorandum and Articles of Association drafting",
        "PAN and TAN registration for the company",
        "Bank account opening assistance",
        "Compliance calendar setup",
        "Post-incorporation annual compliance guidance"
      ],
      process: [
        "Business name search and availability check on MCA portal",
        "Name reservation application (RUN - Reserve Unique Name)",
        "Director identification number (DIN) application",
        "Digital signature certificate (DSC) procurement",
        "Memorandum and Articles of Association preparation",
        "Incorporation application filing with ROC",
        "Certificate of Incorporation issuance",
        "PAN and TAN application for company",
        "Bank account opening with incorporation documents"
      ],
      documents: [
        "Directors' PAN cards and Aadhaar cards",
        "Registered office address proof with ownership documents",
        "NOC from property owner for using address",
        "Passport size photographs of all directors",
        "Directors' mobile numbers and email addresses",
        "Utility bills (electricity/water) for address verification",
        "Identity and address proof of beneficial owners",
        "Professional address proof if different from registered office"
      ],
      benefits: [
        "Limited liability protection for personal assets",
        "Separate legal entity status with perpetual succession",
        "Easy access to funding from investors and banks",
        "Enhanced business credibility and professional image",
        "Tax benefits and exemptions available to companies",
        "Easier business expansion and partnership opportunities",
        "Professional legal structure for business operations"
      ]
    },
    "tax-planning": {
      title: "Tax Planning & Advisory Services",
      description: "Strategic tax planning services to minimize tax liability, optimize investments, and ensure compliance with ever-changing tax laws",
      price: "₹5,999",
      originalPrice: "₹8,999",
      duration: "5-7 days",
      rating: 4.7,
      reviews: 167,
      color: "orange",
      whyNeeded: [
        "Complex and frequently changing tax laws require expert guidance",
        "Opportunity to save significant amounts through legal tax optimization",
        "Strategic investment planning needed for long-term wealth creation",
        "Compliance requirements vary based on income sources and amounts",
        "Proactive planning prevents last-minute financial decisions"
      ],
      impact: [
        "Significant tax savings through legal deductions and exemptions",
        "Optimized investment portfolio aligned with tax benefits",
        "Better financial planning for retirement and major goals",
        "Reduced stress through proactive compliance management",
        "Enhanced wealth creation through tax-efficient strategies"
      ],
      governmentRules: [
        "Income Tax Act 1961 - Central taxation framework",
        "Section 80C: Investment deductions up to ₹1.5 lakhs",
        "Section 80D: Health insurance premium deductions",
        "Section 24(b): Home loan interest deduction up to ₹2 lakhs",
        "New Tax Regime vs Old Tax Regime comparison",
        "Capital gains tax rules for equity and real estate",
        "HRA exemption rules for salaried individuals"
      ],
      features: [
        "Comprehensive financial position analysis",
        "Tax-saving investment recommendations",
        "Deduction optimization across all sections",
        "Future tax liability projections",
        "Personalized tax strategy development",
        "Regular updates on tax law changes",
        "Investment portfolio review and rebalancing"
      ],
      process: [
        "Complete financial assessment and income analysis",
        "Current year tax liability calculation",
        "Identification of available deductions and exemptions",
        "Tax-saving investment strategy formulation",
        "Implementation roadmap with timelines",
        "Quarterly review and strategy adjustment",
        "Year-end tax planning and final optimization",
        "Next year planning and goal setting"
      ],
      documents: [
        "Previous 2-3 years' ITR documents",
        "Current year salary slips and Form 16",
        "Existing investment statements and certificates",
        "Bank statements and fixed deposit receipts",
        "Insurance policy documents and premium receipts",
        "Property documents and home loan statements",
        "Mutual fund and equity investment statements",
        "EPF and PPF account statements"
      ],
      benefits: [
        "Substantial tax savings through expert planning",
        "Optimized investment portfolio for better returns",
        "Future financial security through systematic planning",
        "Legal compliance with all tax regulations",
        "Expert guidance on complex financial decisions",
        "Regular monitoring and strategy updates",
        "Peace of mind with professional financial management"
      ]
    },
    "audit": {
      title: "Audit & Assurance Services",
      description: "Professional statutory and internal audit services ensuring regulatory compliance, risk management, and business process optimization",
      price: "₹15,999",
      originalPrice: "₹22,999",
      duration: "20-30 days",
      rating: 4.6,
      reviews: 89,
      color: "red",
      whyNeeded: [
        "Legal requirement for companies above specified turnover limits",
        "Mandatory for companies seeking bank loans and credit facilities",
        "Required for regulatory compliance and avoiding penalties",
        "Essential for investor confidence and transparency",
        "Helps identify business risks and operational inefficiencies"
      ],
      impact: [
        "Enhanced stakeholder confidence through independent verification",
        "Improved internal controls and risk management systems",
        "Better financial reporting and transparency",
        "Identification of business process improvements",
        "Regulatory compliance and penalty avoidance"
      ],
      governmentRules: [
        "Companies Act 2013 - Mandatory audit requirements",
        "Audit mandatory for companies with turnover > ₹1 crore",
        "Tax audit under Section 44AB if turnover > ₹1 crore",
        "GST audit for businesses with turnover > ₹2 crores",
        "Statutory auditor appointment in Annual General Meeting",
        "Audit report submission within specified timelines",
        "Internal audit mandatory for large companies"
      ],
      features: [
        "Comprehensive statutory audit as per Companies Act",
        "Internal audit procedures and control evaluation",
        "Risk assessment and management framework",
        "Detailed audit reports with findings and recommendations",
        "Management letter with process improvement suggestions",
        "Compliance verification across all regulations",
        "Ongoing audit support and consultation"
      ],
      process: [
        "Audit planning and scope definition with management",
        "Understanding of business processes and internal controls",
        "Risk assessment and materiality determination",
        "Detailed audit procedures execution",
        "Testing of transactions and account balances",
        "Internal control evaluation and testing",
        "Audit findings documentation and discussion",
        "Audit report preparation and management letter",
        "Follow-up on audit recommendations implementation"
      ],
      documents: [
        "Complete books of accounts and ledgers",
        "Financial statements (Balance Sheet, P&L, Cash Flow)",
        "Bank statements and reconciliations for all accounts",
        "Supporting vouchers and documentary evidence",
        "Board meeting minutes and resolutions",
        "Previous year audit reports and management responses",
        "Statutory registers and compliance records",
        "Tax returns and assessment orders",
        "Material contracts and agreements"
      ],
      benefits: [
        "Full regulatory compliance and penalty avoidance",
        "Enhanced stakeholder confidence and credibility",
        "Improved internal controls and risk management",
        "Business process optimization and cost reduction",
        "Better financial reporting and transparency",
        "Expert recommendations for operational improvements",
        "Professional assurance on financial statements accuracy"
      ]
    },
    "accounting": {
      title: "Accounting & Bookkeeping Services",
      description: "Professional accounting services including daily bookkeeping, financial statements preparation, and comprehensive business financial management",
      price: "₹4,999/month",
      originalPrice: "₹6,999/month",
      duration: "Monthly",
      rating: 4.8,
      reviews: 234,
      color: "teal",
      whyNeeded: [
        "Legal requirement to maintain proper books of accounts",
        "Essential for accurate financial reporting and decision making",
        "Required for tax compliance and statutory filings",
        "Necessary for business performance monitoring and analysis",
        "Critical for loan applications and investor presentations"
      ],
      impact: [
        "Accurate financial tracking and business performance insights",
        "Timely compliance with all statutory requirements",
        "Better cash flow management and financial control",
        "Professional financial statements for stakeholders",
        "Reduced accounting costs compared to in-house staff"
      ],
      governmentRules: [
        "Companies Act 2013 - Books of accounts maintenance",
        "Income Tax Act - Business records maintenance for 8 years",
        "GST Act - Invoice and transaction records maintenance",
        "Accounting Standards as prescribed by ICAI",
        "Monthly GST return filing requirements",
        "Annual financial statements preparation and filing",
        "TDS compliance and return filing obligations"
      ],
      features: [
        "Daily transaction recording and bookkeeping",
        "Monthly financial statements preparation",
        "Bank reconciliation and cash flow monitoring",
        "Expense categorization and tracking",
        "Tax-ready financial reports preparation",
        "Monthly management reports and insights",
        "Year-end accounts finalization support"
      ],
      process: [
        "Initial chart of accounts setup and configuration",
        "Daily transaction recording from source documents",
        "Weekly bank reconciliation and variance analysis",
        "Monthly expense allocation and categorization",
        "Monthly financial statements preparation",
        "Management reporting with key performance indicators",
        "Quarterly review and accounts reconciliation",
        "Annual accounts finalization and audit support"
      ],
      documents: [
        "All sales invoices and credit notes",
        "Purchase invoices and supplier bills",
        "Bank statements for all business accounts",
        "Cash receipts and payment vouchers",
        "Expense receipts and supporting documents",
        "Salary and employee expense records",
        "Asset purchase and disposal documents",
        "Loan agreements and EMI schedules",
        "Previous financial records and opening balances"
      ],
      benefits: [
        "Accurate and up-to-date financial records",
        "Timely compliance with all statutory requirements",
        "Better business insights through regular reporting",
        "Cost-effective alternative to in-house accounting",
        "Professional financial management and advisory",
        "Reduced errors and improved financial control",
        "More time to focus on core business activities"
      ]
    }
  };

  const service = serviceDetails[serviceId as keyof typeof serviceDetails];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Service Not Found</h2>
            <p className="text-gray-600 mb-4">The requested service could not be found.</p>
            <Button onClick={() => navigate('/services')}>Back to Services</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/services')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <Badge className={`bg-${service.color}-100 text-${service.color}-700 mb-4`}>
                Professional Service
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-semibold">{service.rating}</span>
                  <span className="text-gray-500">({service.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{service.price}</div>
                  <div className="text-lg text-gray-500 line-through">{service.originalPrice}</div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span>{service.duration}</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className={`bg-gradient-to-r from-${service.color}-600 to-${service.color}-700 hover:from-${service.color}-700 hover:to-${service.color}-800 text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300`}
                onClick={() => navigate(`/service-form/${serviceId}`)}
              >
                Get Started Now
              </Button>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">What's Included:</h3>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className={`h-5 w-5 text-${service.color}-600 mt-0.5 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">2.3M+</div>
                <div className="text-sm text-blue-600">Users in India</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">98.5%</div>
                <div className="text-sm text-green-600">Success Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6 text-center">
                <IndianRupee className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-700">₹50K+</div>
                <div className="text-sm text-orange-600">Avg. Savings</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">24/7</div>
                <div className="text-sm text-purple-600">Expert Support</div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="why-needed" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="why-needed">Why Needed</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="rules">Gov. Rules</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="why-needed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    Why Do You Need This Service?
                  </CardTitle>
                  <CardDescription>
                    Understanding the importance and necessity of {service.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {service.whyNeeded.map((reason, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className={`w-8 h-8 rounded-full bg-${service.color}-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <p className="text-gray-800 leading-relaxed">{reason}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    What Impact Will You Get?
                  </CardTitle>
                  <CardDescription>
                    Positive outcomes and benefits you can expect from {service.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.impact.map((impact, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                        <CheckCircle className={`h-6 w-6 text-${service.color}-600 mt-1 flex-shrink-0`} />
                        <p className="text-gray-800 leading-relaxed">{impact}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Government Rules & Regulations
                  </CardTitle>
                  <CardDescription>
                    Legal framework and compliance requirements for {service.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {service.governmentRules.map((rule, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-orange-200">
                        <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          ⚖️
                        </div>
                        <p className="text-gray-800 leading-relaxed">{rule}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Our Process
                  </CardTitle>
                  <CardDescription>
                    Step-by-step process we follow to deliver your service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {service.process.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full bg-${service.color}-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>
                    Documents you need to provide for this service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.documents.map((document, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <FileText className={`h-5 w-5 text-${service.color}-600`} />
                        <span className="text-gray-700">{document}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Benefits</CardTitle>
                  <CardDescription>
                    Why choose this service for your business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`h-6 w-6 text-${service.color}-600 mt-1`} />
                        <div>
                          <p className="text-gray-800 font-medium">{benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

          {/* CTA Section */}
          <Card className={`mt-12 bg-gradient-to-r from-${service.color}-600 to-${service.color}-700 text-white border-0`}>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of satisfied customers who trust us with their {service.title.toLowerCase()}
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-full font-semibold"
                onClick={() => navigate(`/service-form/${serviceId}`)}
              >
                Start Your Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;