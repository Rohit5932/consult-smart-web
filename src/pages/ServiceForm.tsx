import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Calendar, CheckCircle, AlertCircle, Upload, X, Factory, Stamp, UserCheck, CreditCard } from "lucide-react";
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
    businessSize: "",
    // Company Registration fields
    companyName: "",
    directorCount: "",
    authorizedCapital: "",
    // Business License fields
    licenseType: "",
    businessAddress: "",
    // Accounting Services fields
    accountingType: "",
    transactionVolume: "",
    // Audit Services fields
    auditType: "",
    companySize: "",
    // MSME Registration fields
    msmeCategory: "", 
    investmentAmount: "",
    employeeCount: "",
    // Digital Signature fields
    certificateType: "",
    validityPeriod: "",
    usageType: "",
    // Firm Registration fields
    firmType: "",
    partnerCount: "",
    capitalAmount: "",
    // Loan Pre-check fields
    loanType: "",
    loanAmount: "",
    businessAge: "",
    annualRevenue: "",
    creditScore: ""
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const serviceConfig = {
    "gst-registration": {
      title: "GST Registration Service",
      icon: FileText,
      description: "Complete GST registration process for new businesses",
      color: "blue"
    },
    "gst-filing": {
      title: "GST Filing Service",
      icon: FileText,
      description: "Professional GST return filing with complete documentation",
      color: "green"
    },
    "itr-filing": {
      title: "ITR Filing Service", 
      icon: Calendar,
      description: "Complete income tax return filing assistance",
      color: "purple"
    },
    "company-registration": {
      title: "Company Registration Service",
      icon: CheckCircle,
      description: "Private Limited, LLP, and Partnership firm registration",
      color: "orange"
    },
    "business-license": {
      title: "Business License Service",
      icon: AlertCircle,
      description: "Trade license and other business permits",
      color: "red"
    },
    "accounting-services": {
      title: "Accounting Services",
      icon: FileText,
      description: "Professional bookkeeping and financial statement preparation",
      color: "cyan"
    },
    "tax-planning": {
      title: "Tax Planning Service",
      icon: CheckCircle,
      description: "Strategic tax planning to optimize your tax savings",
      color: "indigo"
    },
    "audit-services": {
      title: "Audit Services",
      icon: AlertCircle,
      description: "Comprehensive statutory and internal audit services",
      color: "pink"
    },
    "compliance": {
      title: "TDS Compliance Service",
      icon: AlertCircle,
      description: "Complete TDS filing and compliance management",
      color: "yellow"
    },
    "msme-registration": {
      title: "MSME Registration Service",
      icon: Factory,
      description: "Micro, Small & Medium Enterprise registration and certification",
      color: "emerald"
    },
    "digital-signature": {
      title: "Digital Signature Service",
      icon: Stamp,
      description: "Class 2 & Class 3 Digital Signature Certificate",
      color: "violet"
    },
    "firm-registration": {
      title: "Firm Registration Service",
      icon: UserCheck,
      description: "Partnership firm and proprietorship registration",
      color: "teal"
    },
    "loan-precheck": {
      title: "Loan Pre-check Service",
      icon: CreditCard,
      description: "Business loan eligibility assessment and documentation",
      color: "amber"
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
    
    navigate('/payment', { state: { serviceType, formData, uploadedFiles } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case "gst-registration":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">Business Type *</Label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="private-limited">Private Limited</option>
                  <option value="public-limited">Public Limited</option>
                  <option value="llp">LLP</option>
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

            <div className="space-y-2">
              <Label htmlFor="businessAddress" className="text-sm font-medium">Business Address *</Label>
              <Textarea
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                rows={3}
                className="rounded-lg border-2 focus:border-blue-400"
                placeholder="Enter complete business address"
                required
              />
            </div>
          </>
        );

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

      case "company-registration":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">Proposed Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter proposed company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="directorCount" className="text-sm font-medium">Number of Directors *</Label>
                <select
                  id="directorCount"
                  name="directorCount"
                  value={formData.directorCount}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Director Count</option>
                  <option value="2">2 Directors</option>
                  <option value="3">3 Directors</option>
                  <option value="4">4 Directors</option>
                  <option value="5+">5+ Directors</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorizedCapital" className="text-sm font-medium">Authorized Capital (₹) *</Label>
              <Input
                id="authorizedCapital"
                name="authorizedCapital"
                type="number"
                required
                value={formData.authorizedCapital}
                onChange={handleInputChange}
                className="rounded-lg border-2 focus:border-blue-400"
                placeholder="Enter authorized capital amount"
              />
            </div>
          </>
        );

      case "business-license":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="licenseType" className="text-sm font-medium">License Type *</Label>
                <select
                  id="licenseType"
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select License Type</option>
                  <option value="trade-license">Trade License</option>
                  <option value="shop-establishment">Shop & Establishment</option>
                  <option value="fssai">FSSAI License</option>
                  <option value="pollution-control">Pollution Control</option>
                  <option value="fire-safety">Fire Safety</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">Business Type *</Label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="service">Service</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAddress" className="text-sm font-medium">Business Address *</Label>
              <Textarea
                id="businessAddress"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                rows={3}
                className="rounded-lg border-2 focus:border-blue-400"
                placeholder="Enter complete business address"
                required
              />
            </div>
          </>
        );

      case "accounting-services":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountingType" className="text-sm font-medium">Service Type *</Label>
                <select
                  id="accountingType"
                  name="accountingType"
                  value={formData.accountingType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Service Type</option>
                  <option value="bookkeeping">Bookkeeping</option>
                  <option value="financial-statements">Financial Statements</option>
                  <option value="payroll">Payroll Management</option>
                  <option value="full-service">Complete Accounting</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionVolume" className="text-sm font-medium">Monthly Transaction Volume</Label>
                <select
                  id="transactionVolume"
                  name="transactionVolume"
                  value={formData.transactionVolume}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                >
                  <option value="">Select Transaction Volume</option>
                  <option value="low">Low (1-50 transactions)</option>
                  <option value="medium">Medium (51-200 transactions)</option>
                  <option value="high">High (200+ transactions)</option>
                </select>
              </div>
            </div>
          </>
        );

      case "audit-services":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="auditType" className="text-sm font-medium">Audit Type *</Label>
                <select
                  id="auditType"
                  name="auditType"
                  value={formData.auditType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Audit Type</option>
                  <option value="statutory">Statutory Audit</option>
                  <option value="internal">Internal Audit</option>
                  <option value="tax">Tax Audit</option>
                  <option value="stock">Stock Audit</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize" className="text-sm font-medium">Company Size *</Label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Company Size</option>
                  <option value="small">Small (Turnover &lt; 2 Cr)</option>
                  <option value="medium">Medium (2-20 Cr)</option>
                  <option value="large">Large (20+ Cr)</option>
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
                  <option value="tds">TDS Compliance</option>
                  <option value="pf-esi">PF & ESI</option>
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
                  <option value="startup">Startup (&lt; 10 employees)</option>
                  <option value="small">Small (10-50 employees)</option>
                  <option value="medium">Medium (50-250 employees)</option>
                  <option value="large">Large (250+ employees)</option>
                </select>
              </div>
            </div>
          </>
        );

      case "msme-registration":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="msmeCategory" className="text-sm font-medium">MSME Category *</Label>
                <select
                  id="msmeCategory"
                  name="msmeCategory"
                  value={formData.msmeCategory}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select MSME Category</option>
                  <option value="micro">Micro Enterprise</option>
                  <option value="small">Small Enterprise</option>
                  <option value="medium">Medium Enterprise</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentAmount" className="text-sm font-medium">Investment in Plant & Machinery (₹) *</Label>
                <Input
                  id="investmentAmount"
                  name="investmentAmount"
                  type="number"
                  required
                  value={formData.investmentAmount}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter investment amount"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="employeeCount" className="text-sm font-medium">Number of Employees</Label>
                <Input
                  id="employeeCount"
                  name="employeeCount"
                  type="number"
                  value={formData.employeeCount}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter employee count"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">Business Type *</Label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="service">Service</option>
                  <option value="trading">Trading</option>
                </select>
              </div>
            </div>
          </>
        );

      case "digital-signature":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="certificateType" className="text-sm font-medium">Certificate Type *</Label>
                <select
                  id="certificateType"
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Certificate Type</option>
                  <option value="class2">Class 2 DSC</option>
                  <option value="class3">Class 3 DSC</option>
                  <option value="dgft">DGFT DSC</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="validityPeriod" className="text-sm font-medium">Validity Period *</Label>
                <select
                  id="validityPeriod"
                  name="validityPeriod"
                  value={formData.validityPeriod}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Validity</option>
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                  <option value="3years">3 Years</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usageType" className="text-sm font-medium">Primary Usage *</Label>
              <select
                id="usageType"
                name="usageType"
                value={formData.usageType}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                required
              >
                <option value="">Select Usage Type</option>
                <option value="gst-filing">GST Filing</option>
                <option value="income-tax">Income Tax Filing</option>
                <option value="mca-filing">MCA Filing</option>
                <option value="tender-bidding">Tender Bidding</option>
                <option value="banking">Net Banking</option>
              </select>
            </div>
          </>
        );

      case "firm-registration":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firmType" className="text-sm font-medium">Firm Type *</Label>
                <select
                  id="firmType"
                  name="firmType"
                  value={formData.firmType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Firm Type</option>
                  <option value="partnership">Partnership Firm</option>
                  <option value="proprietorship">Sole Proprietorship</option>
                  <option value="llp">Limited Liability Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnerCount" className="text-sm font-medium">Number of Partners</Label>
                <Input
                  id="partnerCount"
                  name="partnerCount"
                  type="number"
                  value={formData.partnerCount}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter number of partners"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="capitalAmount" className="text-sm font-medium">Capital Amount (₹)</Label>
                <Input
                  id="capitalAmount"
                  name="capitalAmount"
                  type="number"
                  value={formData.capitalAmount}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter capital amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">Business Activity *</Label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Business Activity</option>
                  <option value="trading">Trading</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="service">Service Provider</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>
            </div>
          </>
        );

      case "loan-precheck":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="loanType" className="text-sm font-medium">Loan Type *</Label>
                <select
                  id="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                  required
                >
                  <option value="">Select Loan Type</option>
                  <option value="term-loan">Term Loan</option>
                  <option value="working-capital">Working Capital</option>
                  <option value="equipment-loan">Equipment Loan</option>
                  <option value="msme-loan">MSME Loan</option>
                  <option value="mudra-loan">Mudra Loan</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="text-sm font-medium">Required Loan Amount (₹) *</Label>
                <Input
                  id="loanAmount"
                  name="loanAmount"
                  type="number"
                  required
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter loan amount"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessAge" className="text-sm font-medium">Business Age</Label>
                <select
                  id="businessAge"
                  name="businessAge"
                  value={formData.businessAge}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border-2 focus:border-blue-400 bg-white"
                >
                  <option value="">Select Business Age</option>
                  <option value="startup">Startup (Less than 1 year)</option>
                  <option value="1-3years">1-3 Years</option>
                  <option value="3-5years">3-5 Years</option>
                  <option value="5+years">5+ Years</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualRevenue" className="text-sm font-medium">Annual Revenue (₹)</Label>
                <Input
                  id="annualRevenue"
                  name="annualRevenue"
                  type="number"
                  value={formData.annualRevenue}
                  onChange={handleInputChange}
                  className="rounded-lg border-2 focus:border-blue-400"
                  placeholder="Enter annual revenue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditScore" className="text-sm font-medium">Approximate Credit Score (if known)</Label>
              <Input
                id="creditScore"
                name="creditScore"
                type="number"
                value={formData.creditScore}
                onChange={handleInputChange}
                className="rounded-lg border-2 focus:border-blue-400"
                placeholder="Enter credit score (300-850)"
                min="300"
                max="850"
              />
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
              onClick={() => navigate('/services')}
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
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                <IconComponent className="h-8 w-8" />
                {service.title}
              </CardTitle>
              <CardDescription className="text-primary/80 text-base">
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

                {/* Document Upload */}
                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-orange-800">Document Upload</h3>
                  <div className="space-y-4">
                    <p className="text-sm text-orange-700">
                      Please upload the required documents for your service. Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 5MB each)
                    </p>
                    
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                      <Label htmlFor="fileUpload" className="cursor-pointer">
                        <span className="text-orange-600 font-medium hover:text-orange-800">
                          Click to upload files
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </Label>
                      <Input
                        id="fileUpload"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-orange-800">Uploaded Files:</h4>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
                  className="w-full py-6 text-lg rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transform hover:scale-105 transition-all duration-300"
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
