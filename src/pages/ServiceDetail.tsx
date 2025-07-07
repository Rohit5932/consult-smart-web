
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { ArrowLeft, CheckCircle, Users, Scale, Calendar, Phone } from "lucide-react";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  const services = {
    gst: {
      title: "GST Registration & Filing",
      icon: "📊",
      color: "from-blue-500 to-blue-600",
      description: "Complete GST compliance solution with registration, monthly returns, and expert guidance for businesses of all sizes.",
      whatIs: "GST (Goods and Services Tax) is a comprehensive indirect tax levied on the supply of goods and services across India. It replaced multiple indirect taxes and created a unified tax structure.",
      benefits: [
        "Input tax credit benefits",
        "Nationwide business expansion",
        "Simplified tax structure",
        "Reduced tax burden",
        "Digital compliance system",
        "Improved supply chain efficiency"
      ],
      laws: [
        "Central Goods and Services Tax Act, 2017 (CGST Act)",
        "State Goods and Services Tax Act, 2017 (SGST Act)", 
        "Integrated Goods and Services Tax Act, 2017 (IGST Act)",
        "GST Rules and Notifications by CBIC"
      ],
      whoNeeds: [
        "Businesses with annual turnover above ₹20 lakhs (₹10 lakhs for special category states)",
        "Inter-state suppliers regardless of turnover",
        "E-commerce operators and aggregators",
        "Casual taxable persons",
        "Non-resident taxable persons"
      ],
      process: [
        "Document collection and verification",
        "Online GST registration application",
        "Processing and approval",
        "Regular return filing (GSTR-1, GSTR-3B)",
        "Annual return filing",
        "Ongoing compliance management"
      ]
    },
    itr: {
      title: "Income Tax Returns",
      icon: "💰",
      color: "from-green-500 to-green-600",
      description: "Professional ITR filing services for individuals, businesses, and startups with maximum refund optimization.",
      whatIs: "Income Tax Return (ITR) is a mandatory annual filing that reports your income, deductions, and tax liability to the Income Tax Department of India.",
      benefits: [
        "Claim tax refunds",
        "Proof of income for loans",
        "Carry forward losses",
        "Avoid penalties and interest",
        "Compliance with tax laws",
        "Build financial credibility"
      ],
      laws: [
        "Income Tax Act, 1961",
        "Income Tax Rules, 1962",
        "Finance Act (Annual amendments)",
        "CBDT Circulars and Notifications"
      ],
      whoNeeds: [
        "Individuals with income above ₹2.5 lakhs",
        "Senior citizens with income above ₹3 lakhs",
        "Super senior citizens with income above ₹5 lakhs",
        "Anyone claiming tax refunds",
        "Foreign asset holders",
        "Directors and high net worth individuals"
      ],
      process: [
        "Income and investment document collection",
        "Tax computation and optimization",
        "ITR form selection and preparation",
        "Online filing and verification",
        "Response to notices if any",
        "Refund tracking and follow-up"
      ]
    },
    business: {
      title: "Business Registration",
      icon: "🏢",
      color: "from-purple-500 to-purple-600",
      description: "Complete business incorporation services including company registration, LLP formation, and partnership registration.",
      whatIs: "Business registration is the legal process of incorporating your business entity, providing it with a separate legal identity and enabling it to operate within the regulatory framework.",
      benefits: [
        "Limited liability protection",
        "Legal entity status",
        "Access to funding and investments",
        "Tax benefits and deductions",
        "Enhanced credibility",
        "Perpetual succession"
      ],
      laws: [
        "Companies Act, 2013",
        "Limited Liability Partnership Act, 2008",
        "Indian Partnership Act, 1932",
        "Foreign Exchange Management Act (FEMA)"
      ],
      whoNeeds: [
        "Entrepreneurs starting new ventures",
        "Existing partnerships wanting incorporation",
        "Foreign investors entering India",
        "Professionals forming LLPs",
        "Startups seeking funding",
        "Businesses expanding operations"
      ],
      process: [
        "Business structure consultation",
        "Name reservation and approval",
        "Document preparation and filing",
        "Incorporation certificate issuance",
        "PAN and TAN registration",
        "Bank account opening assistance"
      ]
    },
    "tax-planning": {
      title: "Tax Planning Services",
      icon: "🎯",
      color: "from-orange-500 to-orange-600",
      description: "Strategic tax planning to minimize tax liability and maximize savings through legal optimization techniques.",
      whatIs: "Tax planning is the strategic arrangement of financial affairs to minimize tax liability through legitimate deductions, exemptions, and investment planning.",
      benefits: [
        "Reduced tax liability",
        "Improved cash flow",
        "Investment optimization",
        "Retirement planning benefits",
        "Estate planning advantages",
        "Long-term wealth creation"
      ],
      laws: [
        "Income Tax Act, 1961 - Chapter VI-A",
        "Securities Transaction Tax provisions",
        "Capital Gains Tax regulations",
        "International Tax provisions"
      ],
      whoNeeds: [
        "High-income individuals",
        "Business owners and entrepreneurs",
        "Senior management professionals",
        "NRIs with Indian income",
        "Investors and traders",
        "Retirees and pensioners"
      ],
      process: [
        "Financial situation analysis",
        "Tax liability assessment",
        "Investment strategy formulation",
        "Implementation of tax-saving instruments",
        "Regular monitoring and review",
        "Year-end optimization"
      ]
    },
    audit: {
      title: "Audit Services",
      icon: "🔍",
      color: "from-red-500 to-red-600",
      description: "Comprehensive audit services including statutory audits, internal audits, and compliance management for businesses.",
      whatIs: "Audit services involve systematic examination of financial records, transactions, and compliance procedures to ensure accuracy, transparency, and adherence to regulations.",
      benefits: [
        "Enhanced financial transparency",
        "Risk mitigation",
        "Regulatory compliance",
        "Improved internal controls",
        "Stakeholder confidence",
        "Operational efficiency"
      ],
      laws: [
        "Companies Act, 2013 - Audit provisions",
        "Income Tax Act, 1961 - Tax Audit",
        "GST Act - GST Audit provisions",
        "Banking Regulation Act for NBFCs"
      ],
      whoNeeds: [
        "Companies above specified thresholds",
        "Businesses with turnover above ₹1 crore",
        "Listed companies",
        "Financial institutions",
        "Non-profit organizations",
        "Government contractors"
      ],
      process: [
        "Audit planning and risk assessment",
        "Document and record examination",
        "Testing of internal controls",
        "Financial statement verification",
        "Audit report preparation",
        "Management consultation"
      ]
    },
    accounting: {
      title: "Accounting Services",
      icon: "📚",
      color: "from-teal-500 to-teal-600",
      description: "Complete accounting solutions including bookkeeping, financial statements, and accounting management for businesses.",
      whatIs: "Accounting services encompass systematic recording, measuring, and communication of financial information to help businesses make informed decisions.",
      benefits: [
        "Accurate financial records",
        "Better decision making",
        "Tax compliance readiness",
        "Improved cash flow management",
        "Financial planning support",
        "Reduced operational costs"
      ],
      laws: [
        "Accounting Standards (AS/Ind AS)",
        "Companies Act, 2013 - Accounting provisions",
        "Income Tax Act - Maintenance of books",
        "GST Act - Record maintenance"
      ],
      whoNeeds: [
        "Small and medium businesses",
        "Startups and new ventures",
        "Professional service firms",
        "Trading and manufacturing units",
        "Non-profit organizations",
        "Individual professionals"
      ],
      process: [
        "Chart of accounts setup",
        "Daily transaction recording",
        "Monthly reconciliation",
        "Financial statement preparation",
        "Tax provision calculation",
        "Management reporting"
      ]
    }
  };

  const service = services[serviceId as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <SEO 
        title={`${service.title} - TaxConsult Pro`}
        description={service.description}
        keywords={`${service.title.toLowerCase()}, tax consultant, professional services`}
      />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TaxConsult Pro
              </span>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-6">{service.icon}</div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className={`bg-gradient-to-r ${service.color} text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`} asChild>
                <Link to="/contact">Get This Service</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 px-8 py-4 rounded-full font-semibold" asChild>
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* What is this service */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className={`bg-gradient-to-r ${service.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  What is {service.title}?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">{service.whatIs}</p>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className={`bg-gradient-to-r ${service.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legal Framework */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className={`bg-gradient-to-r ${service.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <Scale className="h-5 w-5 text-white" />
                  </div>
                  Legal Framework & Regulations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {service.laws.map((law, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1 text-xs">⚖️</Badge>
                      <span className="text-gray-700">{law}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Who Needs This */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className={`bg-gradient-to-r ${service.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  Who Needs This Service?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whoNeeds.map((need, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{need}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className={`bg-gradient-to-r ${service.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  Our Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`bg-gradient-to-r ${service.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className={`border-0 bg-gradient-to-r ${service.color} text-white`}>
              <CardContent className="text-center py-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-lg mb-8 opacity-90">Let our experts handle your {service.title.toLowerCase()} needs</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold" asChild>
                    <Link to="/contact">Book Free Consultation</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-full font-semibold" asChild>
                    <Link to="/contact">Call: +91-9038603090</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
