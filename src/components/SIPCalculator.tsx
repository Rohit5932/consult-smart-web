
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>("");
  const [expectedReturn, setExpectedReturn] = useState<string>("12");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [result, setResult] = useState<{
    futureValue: number;
    totalInvestment: number;
    totalGains: number;
  } | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12; // Monthly rate
    const n = parseFloat(timePeriod) * 12; // Total months

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || n <= 0) return;

    // SIP Future Value Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const totalInvestment = P * n;
    const totalGains = futureValue - totalInvestment;

    setResult({
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalGains: Math.round(totalGains)
    });
  };

  const clearCalculation = () => {
    setMonthlyInvestment("");
    setExpectedReturn("12");
    setTimePeriod("");
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          SIP Calculator
        </CardTitle>
        <CardDescription>Calculate your Systematic Investment Plan returns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
          <Input
            id="monthlyInvestment"
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            placeholder="Enter monthly amount"
          />
        </div>

        <div>
          <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
          <Input
            id="expectedReturn"
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            placeholder="Expected return rate"
          />
        </div>

        <div>
          <Label htmlFor="timePeriod">Time Period (Years)</Label>
          <Input
            id="timePeriod"
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            placeholder="Investment duration"
          />
        </div>

        <div className="flex space-x-2">
          <Button onClick={calculateSIP} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearCalculation} variant="outline">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <h3 className="font-semibold mb-3 text-green-700">SIP Calculation Result:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Investment:</span>
                <span className="font-medium">₹{result.totalInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Gains:</span>
                <span className="font-medium text-green-600">₹{result.totalGains.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 text-lg">
                <span>Future Value:</span>
                <span className="text-green-700">₹{result.futureValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SIPCalculator;
