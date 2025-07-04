
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

interface BookingFormProps {
  onBookingSubmit?: (bookingData: BookingData) => void;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Date | undefined;
  time: string;
  message: string;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

const services = [
  "GST Registration & Filing",
  "Income Tax Return Filing",
  "Business Registration",
  "Tax Planning & Advisory",
  "Accounting & Bookkeeping",
  "Audit & Compliance",
  "Other"
];

const BookingForm = ({ onBookingSubmit }: BookingFormProps) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: undefined,
    time: "",
    message: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create calendar event
      await createCalendarEvent(bookingData);
      
      // Call parent callback if provided
      if (onBookingSubmit) {
        onBookingSubmit(bookingData);
      }

      // Reset form and close dialog
      setBookingData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: undefined,
        time: "",
        message: ""
      });
      setIsOpen(false);
      
      alert("Appointment booked successfully! You will receive a confirmation email shortly.");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book appointment. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createCalendarEvent = async (data: BookingData) => {
    if (!data.date || !data.time) {
      throw new Error("Date and time are required");
    }

    const eventDateTime = new Date(data.date);
    const [hours, minutes] = data.time.split(':');
    eventDateTime.setHours(parseInt(hours), parseInt(minutes));

    const endDateTime = new Date(eventDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1); // 1 hour duration

    const event = {
      summary: `${data.service} - ${data.name}`,
      description: `Client: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nMessage: ${data.message}`,
      start: {
        dateTime: eventDateTime.toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      attendees: [
        { email: data.email, displayName: data.name },
        { email: 'ska.bhw@gmail.com' }
      ],
    };

    // Note: This would require server-side implementation with proper API keys
    console.log("Calendar event to create:", event);
    
    // Placeholder for actual Google Calendar API call
    // In production, this should be handled by a backend endpoint
    return Promise.resolve();
  };

  const isFormValid = bookingData.name && bookingData.email && bookingData.phone && 
                     bookingData.service && bookingData.date && bookingData.time;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Consultation</DialogTitle>
          <DialogDescription>
            Schedule a consultation with our tax experts. Please fill in your details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div>
              <Label htmlFor="service">Service Required</Label>
              <Select 
                value={bookingData.service} 
                onValueChange={(value) => setBookingData({...bookingData, service: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Select Date</Label>
            <Calendar
              mode="single"
              selected={bookingData.date}
              onSelect={(date) => setBookingData({...bookingData, date})}
              disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
              className="rounded-md border"
            />
          </div>

          <div>
            <Label htmlFor="time">Select Time</Label>
            <Select 
              value={bookingData.time} 
              onValueChange={(value) => setBookingData({...bookingData, time: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((timeSlot) => (
                  <SelectItem key={timeSlot} value={timeSlot}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {timeSlot}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              value={bookingData.message}
              onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
              placeholder="Tell us more about your requirements..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
