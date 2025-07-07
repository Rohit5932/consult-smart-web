
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  title: string;
  description: string;
  endDate: string;
}

const CountdownTimer = ({ title, description, endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(endDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-orange-600" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">{timeLeft.days}</div>
            <div className="text-xs text-orange-600">Days</div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">{timeLeft.hours}</div>
            <div className="text-xs text-orange-600">Hours</div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">{timeLeft.minutes}</div>
            <div className="text-xs text-orange-600">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">{timeLeft.seconds}</div>
            <div className="text-xs text-orange-600">Seconds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
