
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Calendar } from "lucide-react";

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

  const createZoomMeeting = async (topic: string, startTime: string) => {
    setIsCreatingMeeting(true);
    
    try {
      // This would integrate with Zoom API
      // For now, we'll simulate the response
      const mockMeeting: ZoomMeeting = {
        id: Date.now().toString(),
        topic,
        startTime,
        joinUrl: "https://zoom.us/j/example",
        meetingId: "123-456-789",
        passcode: "abc123"
      };
      
      setMeetings(prev => [...prev, mockMeeting]);
      console.log("Meeting created:", mockMeeting);
    } catch (error) {
      console.error("Failed to create meeting:", error);
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  const joinMeeting = (meeting: ZoomMeeting) => {
    // Open Zoom meeting in new window
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
            onClick={() => createZoomMeeting("Tax Consultation", new Date().toISOString())}
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
            <strong>Note:</strong> Zoom integration requires API credentials. 
            Set up your Zoom app and configure the webhook endpoints for full functionality.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomIntegration;
