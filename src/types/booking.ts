
export interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Date | undefined;
  time: string;
  message: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface CalendarEvent {
  id?: string;
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
