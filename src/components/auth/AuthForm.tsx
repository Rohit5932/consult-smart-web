
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signIn, signUp, signInWithGoogle, signInWithOTP, verifyOTP, resetPassword } = useAuth();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Should have at least 10 digits (minimum for most countries)
    return digitsOnly.length >= 10;
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Add + prefix if not present
    return digitsOnly.startsWith('1') ? `+${digitsOnly}` : `+1${digitsOnly}`;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    if (!fullName.trim()) {
      toast({
        title: "Missing Full Name",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, fullName.trim());
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOtpSent) {
      if (!validatePhone(phone)) {
        toast({
          title: "Invalid Phone Number",
          description: "Please enter a valid phone number with at least 10 digits",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      try {
        const formattedPhone = formatPhoneNumber(phone);
        const { error } = await signInWithOTP(formattedPhone);
        if (!error) {
          setIsOtpSent(true);
          setPhone(formattedPhone); // Store the formatted phone number
        }
      } finally {
        setLoading(false);
      }
    } else {
      if (otp.length !== 6) {
        toast({
          title: "Invalid OTP",
          description: "Please enter a 6-digit OTP code",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      try {
        const { error } = await verifyOTP(phone, otp);
        if (!error) {
          // Reset form on success
          setIsOtpSent(false);
          setPhone('');
          setOtp('');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address first",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      await resetPassword(email);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Don't set loading to false immediately for OAuth as it might redirect
    } catch (error) {
      console.error('Google sign in error:', error);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            Welcome to TaxConsult Pro
          </CardTitle>
          <CardDescription>
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <Mail className="w-4 h-4 mr-2" />
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={handleResetPassword}
                  disabled={!email || loading}
                  className="text-sm"
                >
                  Forgot password?
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <Mail className="w-4 h-4 mr-2" />
                  {loading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-4">
            <Separator />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full"
              disabled={loading || googleLoading}
            >
              <Chrome className="w-4 h-4 mr-2" />
              {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
            </Button>

            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="phone">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone OTP
                </TabsTrigger>
              </TabsList>
              <TabsContent value="phone" className="mt-3">
                <form onSubmit={handlePhoneAuth} className="space-y-3">
                  {!isOtpSent ? (
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890 or 1234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter with country code (e.g., +1 for US) or we'll add +1 automatically
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter 6-digit OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        disabled={loading}
                        maxLength={6}
                      />
                      <p className="text-xs text-muted-foreground">
                        OTP sent to {phone}
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => {
                          setIsOtpSent(false);
                          setOtp('');
                        }}
                        className="text-xs p-0 h-auto"
                        disabled={loading}
                      >
                        Change phone number
                      </Button>
                    </div>
                  )}
                  <Button type="submit" variant="outline" className="w-full" disabled={loading}>
                    <Phone className="w-4 h-4 mr-2" />
                    {loading ? 'Processing...' : isOtpSent ? 'Verify OTP' : 'Send OTP'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
