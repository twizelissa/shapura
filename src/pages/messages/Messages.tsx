
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusCircle } from 'lucide-react';
import { Message, User } from '@/types';
import { getMessagesByUserId, getUserById } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import Layout from '@/components/layout/Layout';

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Map<string, User>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const userMessages = await getMessagesByUserId(user.id);
        setMessages(userMessages);

        // Get unique contact IDs
        const contactIds = new Set<string>();
        userMessages.forEach(msg => {
          if (msg.senderId !== user.id) contactIds.add(msg.senderId);
          if (msg.receiverId !== user.id) contactIds.add(msg.receiverId);
        });

        // Fetch user details for each contact
        const contactsMap = new Map<string, User>();
        for (const contactId of contactIds) {
          const contactData = await getUserById(contactId);
          if (contactData) {
            contactsMap.set(contactId, contactData);
          }
        }

        setContacts(contactsMap);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [user, navigate]);

  // Group messages by conversation
  const conversations = React.useMemo(() => {
    const conversationMap = new Map<string, { contact: User; latestMessage: Message }>();
    
    if (!user) return [];

    messages.forEach(message => {
      const contactId = message.senderId === user.id ? message.receiverId : message.senderId;
      const contact = contacts.get(contactId);
      
      if (!contact) return;
      
      const existing = conversationMap.get(contactId);
      if (!existing || new Date(message.timestamp) > new Date(existing.latestMessage.timestamp)) {
        conversationMap.set(contactId, { contact, latestMessage: message });
      }
    });
    
    return Array.from(conversationMap.values()).sort((a, b) => 
      new Date(b.latestMessage.timestamp).getTime() - new Date(a.latestMessage.timestamp).getTime()
    );
  }, [messages, contacts, user]);

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Messages</h1>
          <Button onClick={() => navigate('/counselors')}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Message
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading messages...</p>
          </div>
        ) : conversations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <h3 className="text-xl font-medium mb-3">No messages yet</h3>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                Start a conversation with a counselor to get personalized guidance for your educational journey.
              </p>
              <Button onClick={() => navigate('/counselors')}>Find Counselors</Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Your Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {conversations.map(({ contact, latestMessage }) => (
                  <div 
                    key={contact.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/messages/${contact.id}`)}
                  >
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={contact.avatarUrl || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                            {formatDistanceToNow(new Date(latestMessage.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm truncate">
                          {latestMessage.senderId === user.id ? 'You: ' : ''}
                          {latestMessage.content}
                        </p>
                        {!latestMessage.read && latestMessage.receiverId === user.id && (
                          <div className="mt-1">
                            <span className="inline-block w-2 h-2 bg-rwanda-blue rounded-full"></span>
                            <span className="text-xs text-rwanda-blue ml-1">Unread</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Messages;
