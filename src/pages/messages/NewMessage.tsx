
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send } from 'lucide-react';
import { User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { getUserById, sendMessage } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

const NewMessage = () => {
  const { receiverId } = useParams<{ receiverId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [receiver, setReceiver] = useState<User | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!receiverId) {
      navigate('/counselors');
      return;
    }

    const fetchReceiver = async () => {
      try {
        setIsLoading(true);
        const receiverData = await getUserById(receiverId);
        if (!receiverData) {
          throw new Error('Receiver not found');
        }
        setReceiver(receiverData);
      } catch (error) {
        console.error('Error fetching receiver:', error);
        toast({
          title: 'Error',
          description: 'Could not find the selected counselor.',
          variant: 'destructive',
        });
        navigate('/counselors');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceiver();
  }, [user, receiverId, navigate, toast]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !receiverId || !messageContent.trim()) return;
    
    setIsSending(true);
    
    try {
      const messageData = {
        senderId: user.id,
        receiverId,
        content: messageContent.trim(),
      };
      
      await sendMessage(messageData);
      
      toast({
        title: 'Message sent',
        description: 'Your message has been sent successfully.',
      });
      
      navigate(`/messages/${receiverId}`);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!user || !receiverId) {
    return null; // Redirect happens in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/counselors')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Counselors
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>New Message</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ) : receiver ? (
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="flex items-center p-3 border rounded-md">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={receiver.avatarUrl || "/placeholder.svg"} alt={receiver.name} />
                    <AvatarFallback>{receiver.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{receiver.name}</h3>
                    <p className="text-xs text-gray-500">{receiver.role}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSending || !messageContent.trim()}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p>Counselor not found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewMessage;
