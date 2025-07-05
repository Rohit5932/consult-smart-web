
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your tax assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const predefinedResponses: Record<string, string> = {
    "gst": "GST (Goods and Services Tax) is a comprehensive indirect tax on goods and services. The current GST rates are: 0%, 5%, 12%, 18%, and 28%. Do you need help with GST registration or filing?",
    "itr": "Income Tax Return (ITR) filing is mandatory for individuals whose income exceeds ₹2.5 lakhs per year. The due date is usually July 31st. Would you like to know about different ITR forms?",
    "tds": "TDS (Tax Deducted at Source) is tax deducted when payments are made. Common TDS rates: Salary (as per slab), Professional services (10%), Rent (10%). Need help with TDS compliance?",
    "business registration": "You can register various types of businesses in India: Sole Proprietorship, Partnership, LLP, Private Limited Company. Each has different compliance requirements. Which type interests you?",
    "tax planning": "Tax planning involves organizing your finances to minimize tax liability legally. Key strategies include: 80C investments, HRA optimization, business expense planning. Want specific advice?",
    "hello": "Hello! I'm here to help with your tax and business queries. You can ask me about GST, ITR filing, TDS, business registration, or tax planning.",
    "help": "I can assist you with: GST queries, Income Tax matters, TDS questions, Business registration, Tax planning strategies, Compliance requirements. What would you like to know?"
  };

  const getBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }
    
    return "I understand you're asking about tax matters. While I can help with basic queries about GST, ITR, TDS, and business registration, for specific cases, I recommend booking a consultation with our tax experts. Would you like me to help you schedule an appointment?";
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-96 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              Tax Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-60 px-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <Bot className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  )}
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === "user" && (
                    <User className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about taxes..."
                className="text-sm"
              />
              <Button size="sm" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatbot;
