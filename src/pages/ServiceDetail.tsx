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
    "gst-registration": {
      title: "GST Registration",
      description: "Complete GST registration process for new businesses with expert guidance and support",
      price: "₹2,999",
      originalPrice: "₹4,999",
      duration: "7-10 days",
      rating: 4.8,
      reviews: 127,
      color: "blue",
      features: [
        "Complete documentation assistance",
        "Expert review and verification",
        "GST number within 7-10 days",
        "Compliance guidance included",
        "1-year support included"
      ],
      process: [
        "Document collection and verification",
        "Online application submission",
        "Track application status",
        "Receive GST certificate",
        "Setup compliance calendar"
      ],
      documents: [
        "PAN Card of business/proprietor",
        "Aadhaar Card of authorized signatory",
        "Bank account statement/cancelled cheque",
        "Business address proof",
        "Photograph of authorized signatory",
        "Digital signature (if required)"
      ],
      benefits: [
        "Legal compliance with tax laws",
        "Input tax credit benefits",
        "Enhanced business credibility",
        "Simplified tax filing process",
        "Access to government schemes"
      ]
    },
    "gst-filing": {
      title: "GST Filing",
      description: "Monthly and quarterly GST return filing services with accuracy guarantee",
      price: "₹999/month",
      originalPrice: "₹1,499/month",
      duration: "Same day",
      rating: 4.9,
      reviews: 203,
      color: "green",
      features: [
        "Monthly GSTR-1, GSTR-3B filing",
        "Quarterly GSTR-9 annual return",
        "Real-time compliance monitoring",
        "Expert tax consultation",
        "Penalty protection guarantee"
      ],
      process: [
        "Collect sales and purchase data",
        "Reconcile input tax credit",
        "Prepare and review returns",
        "File returns before deadline",
        "Provide compliance reports"
      ],
      documents: [
        "Sales invoices and bills",
        "Purchase invoices and bills",
        "Bank statements",
        "Previous GST returns",
        "Input tax credit statements"
      ],
      benefits: [
        "Avoid penalties and interest",
        "Maximize input tax credit",
        "Expert guidance on compliance",
        "Monthly financial insights",
        "Peace of mind guarantee"
      ]
    },
    "itr-filing": {
      title: "Income Tax Returns",
      description: "ITR filing for individuals, HUF, and businesses with maximum refund optimization",
      price: "₹1,499",
      originalPrice: "₹2,499",
      duration: "3-5 days",
      rating: 4.7,
      reviews: 89,
      color: "purple",
      features: [
        "All ITR forms supported",
        "Maximum refund optimization",
        "Capital gains calculation",
        "TDS reconciliation",
        "Expert review included"
      ],
      process: [
        "Collect financial documents",
        "Calculate tax liability",
        "Optimize deductions and exemptions",
        "Prepare and file ITR",
        "Track refund status"
      ],
      documents: [
        "Form 16/16A (if applicable)",
        "Bank statements",
        "Investment proofs (80C, 80D)",
        "Property documents",
        "Business P&L (if applicable)",
        "Previous year ITR"
      ],
      benefits: [
        "Maximum tax savings",
        "Quick refund processing",
        "Expert tax planning advice",
        "Compliance assurance",
        "Future planning guidance"
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
          <Tabs defaultValue="analytics" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-6 w-6" />
                      Market Insights
                    </CardTitle>
                    <CardDescription>
                      {service.title} importance and trends in India
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium">Daily Applications</span>
                        <span className="text-lg font-bold text-blue-600">1,247</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">This Month</span>
                        <span className="text-lg font-bold text-green-600">35,891</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium">Growth Rate</span>
                        <span className="text-lg font-bold text-orange-600">+23.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6" />
                      Business Impact
                    </CardTitle>
                    <CardDescription>
                      Why {service.title} is crucial for Indian businesses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Mandatory for businesses with turnover &gt;20L</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Enables input tax credit claims</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Increases business credibility</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Required for government tenders</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

            <TabsContent value="support" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Expert Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-gray-600">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-gray-600">support@taxconsultpro.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Office Address</p>
                        <p className="text-gray-600">123 Business District, Mumbai</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Guarantee</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                        <p className="text-gray-700">100% Accuracy Guarantee</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                        <p className="text-gray-700">Timely Delivery Promise</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                        <p className="text-gray-700">Expert Consultation Included</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                        <p className="text-gray-700">Post-Service Support</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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