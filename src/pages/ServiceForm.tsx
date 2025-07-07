
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ServiceForm = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    urgency: "normal",
    // GST specific fields
    gstNumber: "",
    businessType: "",
    monthlyTurnover: "",
    quarterlyTurnover: "",
    panNumber: "",
    // ITR specific fields
    employmentType: "",
    annualIncome: "",
    investments: "",
    // Tax Planning specific fields
    currentTaxLiability: "",
    investmentGoals: "",
    // Compliance specific fields
    complianceType: "",
    businessSize: ""
  });

  const serviceConfig = {
    "gst-filing": {
      title: "GST Filing Service",
      icon: FileText,
      description: "Professional GST return filing with complete documentation",
      color: "blue"
    },
    "itr-filing": {
      title: "ITR Filing Service", 
      icon: Calendar,
      description: "Complete income tax return filing assistance",
      color: "green"
    },
    "tax-planning": {
      title: "Tax Planning Service",
      icon: CheckCircle,
      description: "Strategic tax planning to optimize your tax savings",
      color: "purple"
    },
    "compliance": {
      title: "Compliance Service",
      icon: AlertCircle,
      description: "Comprehensive business compliance management",
      color: "red"
    }
  };

  const service = serviceConfig[serviceType as keyof typeof serviceConfig];
  const IconComponent = service?.icon || FileText;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingRequests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    const newRequest = {
      id: Date.now().toString(),
      serviceType,
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    existingRequests.push(newRequest);
    localStorage.setItem('serviceRequests', JSON.stringify(existingRequests));
    
    toast({
      title: "Request Submitted Successfully!",
      description: "Our team will review your request and contact you within 24 hours.",
    });
    
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case "gst-filing":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="gstNumber" className="text-sm font-medium">GST Number</Label>
              <Input
                id="gstNumber"
                name="gstNumber"
                type="text"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="rounded-lg border-2 focus:border-blue-400"
                placeholder="Enter your GST number (e.g., 22AAAAA0000A1Z5)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">Business Type</Label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                >
                  <option value="">Select Business Type</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="trader">Trader</option>
                  <option value="service-provider">Service Provider</option>
                  <option value="e-commerce">E-commerce</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber" className="text-sm font-medium">PAN Number *</Label>
                <Input
                  id="panNumber"
                  name="panNumber"
                  type="text"
                  required
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter PAN number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyTurnover" className="text-sm font-medium">Monthly Turnover (₹)</Label>
                <Input
                  id="monthlyTurnover"
                  name="monthlyTurnover"
                  type="number"
                  value={formData.monthlyTurnover}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter monthly turnover"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quarterlyTurnover" className="text-sm font-medium">Quarterly Turnover (₹)</Label>
                <Input
                  id="quarterlyTurnover"
                  name="quarterlyTurnover"
                  type="number"
                  value={formData.quarterlyTurnover}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter quarterly turnover"
                />
              </div>
            </div>
          </>
        );

      case "itr-filing":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employmentType" className="text-sm font-medium">Employment Type</Label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                >
                  <option value="">Select Employment Type</option>
                  <option value="salaried">Salaried</option>
                  <option value="business">Business Owner</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualIncome" className="text-sm font-medium">Annual Income (₹)</Label>
                <Input
                  id="annualIncome"
                  name="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter annual income"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investments" className="text-sm font-medium">Investment Details</Label>
              <Textarea
                id="investments"
                name="investments"
                value={formData.investments}
                onChange={handleInputChange}
                rows={3}
                className="rounded-lg border-2 focus:border-blue-400"
                placeholder="Mention your investments (80C, 80D, etc.)"
              />
            </div>
          </>
        );

      case "tax-planning":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="currentTaxLiability" className="text-sm font-medium">Current Tax Liability (₹)</Label>
                <Input
                  id="currentTaxLiability"
                  name="currentTaxLiability"
                  type="number"
                  value={formData.currentTaxLiability}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter current tax liability"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentGoals" className="text-sm font-medium">Investment Goals</Label>
                <select
                  id="investmentGoals"
                  name="investmentGoals"
                  value={formData.investmentGoals}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                >
                  <option value="">Select Investment Goal</option>
                  <option value="tax-saving">Tax Saving</option>
                  <option value="retirement">Retirement Planning</option>
                  <option value="child-education">Child Education</option>
                  <option value="wealth-creation">Wealth Creation</option>
                </select>
              </div>
            </div>
          </>
        );

      case "compliance":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="complianceType" className="text-sm font-medium">Compliance Type</Label>
                <select
                  id="complianceType"
                  name="complianceType"
                  value={formData.complianceType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                >
                  <option value="">Select Compliance Type</option>
                  <option value="gst-compliance">GST Compliance</option>
                  <option value="income-tax">Income Tax Compliance</option>
                  <option value="company-law">Company Law</option>
                  <option value="labour-law">Labour Law</option>
                  <option value="fema">FEMA Compliance</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessSize" className="text-sm font-medium">Business Size</Label>
                <select
                  id="businessSize"
                  name="businessSize"
                  value={formData.businessSize}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                >
                  <option value="">Select Business Size</option>
                  <option value="startup">Startup (< 10 employees)</option>
                  <option value="small">Small (10-50 employees)</option>
                  <option value="medium">Medium (50-250 employees)</option>
                  <option value="large">Large (250+ employees)</option>
                </select>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Service Not Found</h2>
            <p className="text-gray-600 mb-4">The requested service could not be found.</p>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
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
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              {service.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className={`bg-gradient-to-r from-${service.color}-50 to-${service.color}-100 rounded-t-lg`}>
              <CardTitle className={`flex items-center gap-3 text-2xl text-${service.color}-700`}>
                <IconComponent className="h-8 w-8" />
                {service.title}
              </CardTitle>
              <CardDescription className={`text-${service.color}-600 text-base`}>
                {service.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="rounded-lg border-2 focus:border-blue-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="rounded-lg border-2 focus:border-blue-400"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="rounded-lg border-2 focus:border-blue-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="rounded-lg border-2 focus:border-blue-400"
                        placeholder="Enter company name (optional)"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Specific Fields */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-blue-800">Service Details</h3>
                  <div className="space-y-6">
                    {renderServiceSpecificFields()}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-green-800">Additional Information</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-sm font-medium">Urgency Level</Label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                      >
                        <option value="normal">Normal (7-10 days)</option>
                        <option value="urgent">Urgent (3-5 days)</option>
                        <option value="immediate">Immediate (1-2 days)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">Additional Details</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="rounded-lg border-2 focus:border-blue-400"
                        placeholder="Please provide any additional details about your requirements..."
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full py-6 text-lg rounded-full bg-gradient-to-r from-${service.color}-600 to-${service.color}-700 hover:from-${service.color}-700 hover:to-${service.color}-800 transform hover:scale-105 transition-all duration-300`}
                >
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
