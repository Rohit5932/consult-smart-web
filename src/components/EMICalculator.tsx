
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [result, setResult] = useState<{
    emi: number;
    totalAmount: number;
    totalInterest: number;
  } | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const n = parseFloat(tenure) * 12; // Total months

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) return;

    // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    });
  };

  const clearCalculation = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          EMI Calculator
        </CardTitle>
        <CardDescription>Calculate your Equated Monthly Installment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
          />
        </div>

        <div>
          <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter interest rate"
          />
        </div>

        <div>
          <Label htmlFor="tenure">Loan Tenure (Years)</Label>
          <Input
            id="tenure"
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Enter loan tenure"
          />
        </div>

        <div className="flex space-x-2">
          <Button onClick={calculateEMI} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearCalculation} variant="outline">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <h3 className="font-semibold mb-3 text-blue-700">EMI Calculation Result:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Principal Amount:</span>
                <span className="font-medium">₹{parseFloat(loanAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest:</span>
                <span className="font-medium text-red-600">₹{result.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-medium">₹{result.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 text-lg">
                <span>Monthly EMI:</span>
                <span className="text-blue-700">₹{result.emi.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EMICalculator;
