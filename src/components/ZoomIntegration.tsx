
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ZoomMeeting {
  id: string;
  topic: string;
  startTime: string;
  joinUrl: string;
  meetingId: string;
  passcode: string;
}

const ZoomIntegration = () => {
  const [meetings, setMeetings] = useState<ZoomMeeting[]>([]);
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const { toast } = useToast();

  // Mock function to simulate Zoom meeting creation
  // In production, this would need to be handled by a backend service
  const createZoomMeeting = async (topic: string, startTime: string) => {
    setIsCreatingMeeting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock meeting data
      const mockMeeting: ZoomMeeting = {
        id: `meeting_${Date.now()}`,
        topic,
        startTime,
        joinUrl: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
        meetingId: Math.floor(Math.random() * 1000000000).toString(),
        passcode: Math.floor(Math.random() * 100000).toString().padStart(6, '0')
      };
      
      setMeetings(prev => [...prev, mockMeeting]);
      
      toast({
        title: "Meeting Created Successfully",
        description: `Meeting "${topic}" has been scheduled (Demo Mode)`,
      });
      
      console.log("Mock meeting created:", mockMeeting);
    } catch (error) {
      console.error("Failed to create meeting:", error);
      toast({
        title: "Error Creating Meeting",
        description: "Failed to create Zoom meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  const joinMeeting = (meeting: ZoomMeeting) => {
    // In a real implementation, this would open the actual Zoom meeting
    toast({
      title: "Opening Zoom Meeting",
      description: `Redirecting to meeting: ${meeting.topic}`,
    });
    console.log("Joining meeting:", meeting);
    // window.open(meeting.joinUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Video Consultations
        </CardTitle>
        <CardDescription>Schedule and join video meetings with clients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* CORS Warning */}
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> Direct Zoom API calls are blocked by CORS. 
              In production, implement this through a backend service.
            </div>
          </div>

          <Button
            onClick={() => createZoomMeeting("Tax Consultation", new Date(Date.now() + 60 * 60 * 1000).toISOString())}
            disabled={isCreatingMeeting}
            className="w-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {isCreatingMeeting ? "Creating Meeting..." : "Create New Meeting (Demo)"}
          </Button>

          {meetings.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Scheduled Meetings:</h4>
              {meetings.map((meeting) => (
                <div key={meeting.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{meeting.topic}</div>
                      <div className="text-sm text-muted-foreground">
                        Meeting ID: {meeting.meetingId}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Start: {new Date(meeting.startTime).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Passcode: {meeting.passcode}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => joinMeeting(meeting)}>
                      Join (Demo)
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
            <strong>Production Implementation:</strong> To use real Zoom integration, implement 
            the API calls through a backend service (Node.js, Python, etc.) that can securely 
            handle the OAuth flow and API requests.
            <br /><br />
            <strong>Your Zoom Credentials:</strong>
            <br />• Account ID: 3w4UUMwaRNmYHL1L5jl50g
            <br />• Client ID: lj7jh9x2QveVzQeL_Fu6Sg
            <br />• Client Secret: [Hidden for security]
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomIntegration;
