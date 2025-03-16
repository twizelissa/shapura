
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Institutions from "@/pages/institutions/Institutions";
import InstitutionDetails from "@/pages/institutions/InstitutionDetails";
import Counselors from "@/pages/counselors/Counselors";
import Messages from "@/pages/messages/Messages";
import Conversation from "@/pages/messages/Conversation";
import NewMessage from "@/pages/messages/NewMessage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AddInstitution from "@/pages/admin/AddInstitution";
import EditInstitution from "@/pages/admin/EditInstitution";
import Search from "@/pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Institutions Routes */}
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/institutions/:id" element={<InstitutionDetails />} />
            
            {/* Counselors Routes */}
            <Route path="/counselors" element={<Counselors />} />
            
            {/* Messages Routes */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:contactId" element={<Conversation />} />
            <Route path="/messages/new/:receiverId" element={<NewMessage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/institutions/add" element={<AddInstitution />} />
            <Route path="/admin/institutions/edit/:id" element={<EditInstitution />} />
            
            {/* Search Route */}
            <Route path="/search" element={<Search />} />
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
