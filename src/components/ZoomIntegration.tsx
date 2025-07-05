
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar } from "lucide-react";
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

  // Zoom API credentials
  const ZOOM_ACCOUNT_ID = "3w4UUMwaRNmYHL1L5jl50g";
  const ZOOM_CLIENT_ID = "lj7jh9x2QveVzQeL_Fu6Sg";
  const ZOOM_CLIENT_SECRET = "SpVERk7kQfQToiArZU8lcXCmL0gpL7aR";

  const getZoomAccessToken = async () => {
    try {
      const response = await fetch('https://zoom.us/oauth/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'account_credentials',
          account_id: ZOOM_ACCOUNT_ID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const createZoomMeeting = async (topic: string, startTime: string) => {
    setIsCreatingMeeting(true);
    
    try {
      const accessToken = await getZoomAccessToken();
      
      const meetingData = {
        topic,
        type: 2, // Scheduled meeting
        start_time: new Date(startTime).toISOString(),
        duration: 60, // 60 minutes
        timezone: 'Asia/Kolkata',
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          audio: 'both',
          auto_recording: 'none'
        }
      };

      const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }

      const meeting = await response.json();
      
      const newMeeting: ZoomMeeting = {
        id: meeting.id.toString(),
        topic: meeting.topic,
        startTime: meeting.start_time,
        joinUrl: meeting.join_url,
        meetingId: meeting.id.toString(),
        passcode: meeting.password || "N/A"
      };
      
      setMeetings(prev => [...prev, newMeeting]);
      
      toast({
        title: "Meeting Created Successfully",
        description: `Meeting "${topic}" has been scheduled`,
      });
      
      console.log("Meeting created:", newMeeting);
    } catch (error) {
      console.error("Failed to create meeting:", error);
      toast({
        title: "Error Creating Meeting",
        description: "Failed to create Zoom meeting. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  const joinMeeting = (meeting: ZoomMeeting) => {
    window.open(meeting.joinUrl, '_blank');
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
          <Button
            onClick={() => createZoomMeeting("Tax Consultation", new Date(Date.now() + 60 * 60 * 1000).toISOString())}
            disabled={isCreatingMeeting}
            className="w-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {isCreatingMeeting ? "Creating Meeting..." : "Create New Meeting"}
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
                      {meeting.passcode !== "N/A" && (
                        <div className="text-sm text-muted-foreground">
                          Passcode: {meeting.passcode}
                        </div>
                      )}
                    </div>
                    <Button size="sm" onClick={() => joinMeeting(meeting)}>
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
            <strong>Note:</strong> Zoom integration is now active with your credentials. 
            Meetings will be created in your Zoom account.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomIntegration;
