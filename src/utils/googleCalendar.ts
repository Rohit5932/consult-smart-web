
import { BookingData } from "@/types/booking";

// Google Calendar API configuration
const CALENDAR_ID = 'primary'; // Use 'primary' for the main calendar
const API_KEY = process.env.VITE_GOOGLE_CALENDAR_API_KEY;
const CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;

export interface CalendarEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: Array<{
    email: string;
    displayName?: string;
  }>;
}

export const initializeGoogleCalendar = () => {
  // Initialize Google API client
  if (typeof window !== 'undefined' && window.gapi) {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });
    });
  }
};

export const createCalendarEvent = async (bookingData: BookingData): Promise<any> => {
  if (!bookingData.date || !bookingData.time) {
    throw new Error("Date and time are required");
  }

  const eventDateTime = new Date(bookingData.date);
  const [hours, minutes] = bookingData.time.split(':');
  eventDateTime.setHours(parseInt(hours), parseInt(minutes));

  const endDateTime = new Date(eventDateTime);
  endDateTime.setHours(endDateTime.getHours() + 1); // 1 hour duration

  const event: CalendarEvent = {
    summary: `${bookingData.service} - ${bookingData.name}`,
    description: `Client: ${bookingData.name}\nEmail: ${bookingData.email}\nPhone: ${bookingData.phone}\nService: ${bookingData.service}\nMessage: ${bookingData.message}`,
    start: {
      dateTime: eventDateTime.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email: bookingData.email, displayName: bookingData.name },
      { email: 'ska.bhw@gmail.com' }
    ],
  };

  try {
    // Check if user is signed in
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn();
    }

    // Create the calendar event
    const response = await window.gapi.client.calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
      sendUpdates: 'all' // Send email notifications to attendees
    });

    console.log('Calendar event created:', response.result);
    return response.result;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
};

export const checkAvailability = async (date: Date, timeSlot: string): Promise<boolean> => {
  try {
    const startTime = new Date(date);
    const [hours, minutes] = timeSlot.split(':');
    startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);

    const response = await window.gapi.client.calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    });

    return response.result.items.length === 0;
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};

// Declare global gapi type
declare global {
  interface Window {
    gapi: any;
  }
}
