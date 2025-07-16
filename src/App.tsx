
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleCalendarScript from "@/components/GoogleCalendarScript";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import Updates from "./pages/Updates";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServices from "./pages/AdminServices";
import AdminBlog from "./pages/AdminBlog";
import AdminMessages from "./pages/AdminMessages";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ServiceForm from "./pages/ServiceForm";
import Payment from "./pages/Payment";
import BookAppointment from "./pages/BookAppointment";
import UploadDocuments from "./pages/UploadDocuments";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import AIChatbot from "./components/AIChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <GoogleAnalytics measurementId="GA_MEASUREMENT_ID" />
          <GoogleCalendarScript />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service/:serviceId" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:articleId" element={<ArticleDetail />} />
              <Route path="/updates" element={<Updates />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/user-dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/service-form/:serviceType" element={
                <ProtectedRoute>
                  <ServiceForm />
                </ProtectedRoute>
              } />
              <Route path="/payment" element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } />
              <Route path="/book-appointment" element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              } />
              <Route path="/upload-documents" element={
                <ProtectedRoute>
                  <UploadDocuments />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes - No Authentication Required */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/panel" element={<AdminPanel />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIChatbot />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
