
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send } from 'lucide-react';
import { Message, User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { getMessagesByUserId, getUserById, sendMessage } from '@/data/mockData';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';

const Conversation = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [contact, setContact] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!contactId) {
      navigate('/messages');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch contact details
        const contactData = await getUserById(contactId);
        if (!contactData) {
          throw new Error('Contact not found');
        }
        setContact(contactData);
        
        // Fetch messages
        const allMessages = await getMessagesByUserId(user.id);
        const conversation = allMessages.filter(
          msg => 
            (msg.senderId === user.id && msg.receiverId === contactId) ||
            (msg.senderId === contactId && msg.receiverId === user.id)
        );
        
        // Sort by timestamp, oldest first
        conversation.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        setMessages(conversation);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, contactId, navigate]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !contactId || !newMessage.trim()) return;
    
    setIsSending(true);
    
    try {
      const messageData = {
        senderId: user.id,
        receiverId: contactId,
        content: newMessage.trim(),
      };
      
      const sentMessage = await sendMessage(messageData);
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (!user || !contactId) {
    return null; // Redirect happens in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/messages')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Messages
        </Button>
        
        <Card className="h-[70vh] flex flex-col">
          {/* Conversation Header */}
          <CardHeader className="py-3 px-4 border-b flex flex-row items-center">
            {isLoading ? (
              <div className="animate-pulse h-12 w-full bg-gray-200 rounded-md"></div>
            ) : contact ? (
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={contact.avatarUrl || "/placeholder.svg"} alt={contact.name} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-xs text-gray-500">{contact.role}</p>
                </div>
              </div>
            ) : (
              <div>Contact not found</div>
            )}
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <div className="animate-pulse h-16 w-3/4 bg-gray-200 rounded-md"></div>
                <div className="animate-pulse h-16 w-3/4 ml-auto bg-gray-200 rounded-md"></div>
                <div className="animate-pulse h-16 w-3/4 bg-gray-200 rounded-md"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Start a conversation with {contact?.name}</p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.senderId === user.id 
                          ? 'bg-rwanda-blue text-white' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {format(new Date(message.timestamp), 'p, MMM d')}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef}></div>
              </>
            )}
          </CardContent>
          
          {/* Message Input */}
          <div className="p-3 border-t">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={isLoading || !contact}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading || isSending || !newMessage.trim() || !contact}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Conversation;
