
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Mail } from 'lucide-react';
import { User } from '@/types';
import { getCounselors } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';

const Counselors = () => {
  const [counselors, setCounselors] = useState<User[]>([]);
  const [filteredCounselors, setFilteredCounselors] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const data = await getCounselors();
        setCounselors(data);
        setFilteredCounselors(data);
      } catch (error) {
        console.error('Error fetching counselors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredCounselors(counselors);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = counselors.filter(
      counselor => 
        counselor.name.toLowerCase().includes(query) ||
        (counselor.bio && counselor.bio.toLowerCase().includes(query))
    );
    
    setFilteredCounselors(results);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Connect with Counselors and Mentors</h1>
        
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search counselors by name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
        
        {/* Introduction Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How Counselors Can Help You</h2>
          <p className="text-gray-700 mb-4">
            Our counselors and mentors are education professionals who can provide personalized guidance on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Program Selection</h3>
              <p className="text-gray-600 text-sm">Get help choosing the right academic program based on your interests and career goals.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Application Process</h3>
              <p className="text-gray-600 text-sm">Receive guidance on application requirements, deadlines, and strategies to strengthen your application.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-2">Career Planning</h3>
              <p className="text-gray-600 text-sm">Explore potential career paths and understand how different educational choices align with your ambitions.</p>
            </div>
          </div>
        </div>
        
        {/* Counselors List */}
        <h2 className="text-xl font-semibold mb-4">Available Counselors ({filteredCounselors.length})</h2>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading counselors...</p>
          </div>
        ) : filteredCounselors.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No counselors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search query</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setFilteredCounselors(counselors);
              }}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounselors.map((counselor) => (
              <Card key={counselor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={counselor.avatarUrl || "/placeholder.svg"} alt={counselor.name} />
                      <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">{counselor.name}</h3>
                    {/*@ts-ignore*/}
                    {counselor.institution && (
                      <Badge variant="outline" className="mt-1">
                        {/*@ts-ignore*/}
                        {counselor.institution}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 text-center mb-4">{counselor.bio || "No bio available."}</p>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-center">
                  {user ? (
                    <Button asChild>
                      <Link to={`/messages/new/${counselor.id}`}>
                        <Mail className="mr-2 h-4 w-4" /> Message
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild>
                      <Link to="/login">Login to Message</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Counselors;
