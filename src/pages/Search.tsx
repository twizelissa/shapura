
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Search as SearchIcon } from 'lucide-react';
import { Institution, User } from '@/types';
import { searchInstitutions, getCounselors } from '@/data/mockData';
import Layout from '@/components/layout/Layout';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [counselors, setCounselors] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('institutions');
  
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Search institutions
      const institutionResults = await searchInstitutions(searchQuery);
      setInstitutions(institutionResults);
      
      // Get counselors and filter them
      const allCounselors = await getCounselors();
      const counselorResults = allCounselors.filter(
        counselor => 
          counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (counselor.bio && counselor.bio.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setCounselors(counselorResults);
      
      // Update URL params
      setSearchParams({ q: searchQuery });
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search for institutions, programs, or counselors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
                disabled={isLoading}
              >
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
        
        {query && (
          <div className="mb-4">
            <h2 className="text-lg font-medium">
              Search results for: <span className="font-semibold">"{query}"</span>
            </h2>
          </div>
        )}
        
        <Tabs 
          defaultValue="institutions" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="institutions">
              Institutions ({institutions.length})
            </TabsTrigger>
            <TabsTrigger value="counselors">
              Counselors ({counselors.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="institutions">
            {isLoading ? (
              <div className="text-center py-12">
                <p>Searching for institutions...</p>
              </div>
            ) : institutions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No institutions found</h3>
                <p className="text-gray-600 mb-4">
                  {query ? `No institutions match your search for "${query}"` : 'Use the search bar to find institutions'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {institutions.map((institution) => (
                  <Card key={institution.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={institution.coverImageUrl || "/placeholder.svg"} 
                      alt={institution.name} 
                      className="h-48 w-full object-cover"
                    />
                    <CardContent className="pt-6">
                      <div className="flex items-start mb-4">
                        <img 
                          src={institution.logoUrl || "/placeholder.svg"} 
                          alt={`${institution.name} logo`} 
                          className="w-12 h-12 mr-4 rounded-md"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{institution.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{institution.type} • {institution.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 line-clamp-3 mb-4">{institution.description}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/institutions/${institution.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="counselors">
            {isLoading ? (
              <div className="text-center py-12">
                <p>Searching for counselors...</p>
              </div>
            ) : counselors.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No counselors found</h3>
                <p className="text-gray-600 mb-4">
                  {query ? `No counselors match your search for "${query}"` : 'Use the search bar to find counselors'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {counselors.map((counselor) => (
                  <Card key={counselor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                          <img 
                            src={counselor.avatarUrl || "/placeholder.svg"} 
                            alt={counselor.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold">{counselor.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{counselor.role}</p>
                      </div>
                      <p className="text-gray-700 text-center mb-4">{counselor.bio || "No bio available."}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button asChild className="w-full">
                        <Link to={`/messages/new/${counselor.id}`}>Contact</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Search;
