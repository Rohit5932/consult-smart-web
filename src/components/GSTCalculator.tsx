
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GSTCalculator = () => {
  const [amount, setAmount] = useState<string>("");
  const [gstRate, setGstRate] = useState<string>("18");
  const [calculationType, setCalculationType] = useState<string>("exclusive");
  const [result, setResult] = useState<{
    baseAmount: number;
    gstAmount: number;
    totalAmount: number;
  } | null>(null);

  const calculateGST = () => {
    const baseValue = parseFloat(amount);
    const rate = parseFloat(gstRate);
    
    if (isNaN(baseValue) || isNaN(rate)) return;

    let baseAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (calculationType === "exclusive") {
      // GST exclusive (add GST to amount)
      baseAmount = baseValue;
      gstAmount = (baseValue * rate) / 100;
      totalAmount = baseValue + gstAmount;
    } else {
      // GST inclusive (extract GST from amount)
      totalAmount = baseValue;
      baseAmount = baseValue / (1 + rate / 100);
      gstAmount = totalAmount - baseAmount;
    }

    setResult({
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    });
  };

  const clearCalculation = () => {
    setAmount("");
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>GST Calculator</CardTitle>
        <CardDescription>Calculate GST for your business transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div>
          <Label htmlFor="gstRate">GST Rate (%)</Label>
          <Select value={gstRate} onValueChange={setGstRate}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0% (Exempt)</SelectItem>
              <SelectItem value="5">5% (Essential goods)</SelectItem>
              <SelectItem value="12">12% (Standard rate)</SelectItem>
              <SelectItem value="18">18% (Standard rate)</SelectItem>
              <SelectItem value="28">28% (Luxury goods)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="calculationType">Calculation Type</Label>
          <Select value={calculationType} onValueChange={setCalculationType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exclusive">GST Exclusive (Add GST)</SelectItem>
              <SelectItem value="inclusive">GST Inclusive (Extract GST)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button onClick={calculateGST} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearCalculation} variant="outline">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Calculation Result:</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Base Amount:</span>
                <span>₹{result.baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Amount ({gstRate}%):</span>
                <span>₹{result.gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-1">
                <span>Total Amount:</span>
                <span>₹{result.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GSTCalculator;
