
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminPromotion = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isPromoting, setIsPromoting] = useState(false);

  const promoteToAdmin = async () => {
    if (!user) return;

    setIsPromoting(true);
    try {
      console.log('Promoting user to admin:', user.id);
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id);

      if (error) {
        console.error('Error promoting to admin:', error);
        toast({
          title: "Promotion Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('Successfully promoted to admin');
        toast({
          title: "Promoted to Admin",
          description: "You now have admin privileges. Please refresh the page.",
        });
        
        // Refresh the page to update the profile
        window.location.reload();
      }
    } catch (error) {
      console.error('Error in promoteToAdmin:', error);
      toast({
        title: "Promotion Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsPromoting(false);
    }
  };

  // Only show this component if user is not already an admin
  if (profile?.role === 'admin') {
    return null;
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <CardTitle className="text-orange-800">Admin Access Required</CardTitle>
        </div>
        <CardDescription className="text-orange-700">
          You need admin privileges to access admin features. This is for testing purposes only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={promoteToAdmin}
          disabled={isPromoting}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Shield className="h-4 w-4 mr-2" />
          {isPromoting ? 'Promoting...' : 'Promote to Admin (Test Only)'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminPromotion;
