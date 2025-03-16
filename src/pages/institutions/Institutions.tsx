
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Institution } from '@/types';
import { getInstitutions, searchInstitutions } from '@/data/mockData';
import Layout from '@/components/layout/Layout';

const Institutions = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [institutionType, setInstitutionType] = useState<string>('all');

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const data = await getInstitutions();
        setInstitutions(data);
        setFilteredInstitutions(data);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setFilteredInstitutions(institutions);
      return;
    }

    try {
      const results = await searchInstitutions(searchQuery);
      
      // Apply type filter if not 'all'
      if (institutionType !== 'all') {
        setFilteredInstitutions(results.filter(inst => inst.type === institutionType));
      } else {
        setFilteredInstitutions(results);
      }
    } catch (error) {
      console.error('Error searching institutions:', error);
    }
  };

  const handleTypeChange = (type: string) => {
    setInstitutionType(type);
    
    if (type === 'all') {
      setFilteredInstitutions(institutions);
    } else {
      setFilteredInstitutions(institutions.filter(inst => inst.type === type));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Explore Educational Institutions</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, location, or program..."
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
            
            <Select value={institutionType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="university">Universities</SelectItem>
                <SelectItem value="college">Colleges</SelectItem>
                <SelectItem value="vocational">Vocational Schools</SelectItem>
                <SelectItem value="secondary">Secondary Schools</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={handleSearch}>Apply Filters</Button>
          </div>
        </div>
        
        {/* Institutions List */}
        <Tabs defaultValue="grid" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Results ({filteredInstitutions.length})</h2>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p>Loading institutions...</p>
            </div>
          ) : filteredInstitutions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No institutions found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setInstitutionType('all');
                  setFilteredInstitutions(institutions);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInstitutions.map((institution) => (
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
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Programs:</span> {institution.programs.length}
                        </p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button asChild variant="outline" className="w-full">
                          <Link to={`/institutions/${institution.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {filteredInstitutions.map((institution) => (
                    <Card key={institution.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <img 
                          src={institution.coverImageUrl || "/placeholder.svg"} 
                          alt={institution.name} 
                          className="h-48 md:h-auto md:w-48 object-cover"
                        />
                        <div className="p-6 flex-1">
                          <div className="flex items-start mb-3">
                            <img 
                              src={institution.logoUrl || "/placeholder.svg"} 
                              alt={`${institution.name} logo`} 
                              className="w-10 h-10 mr-3 rounded-md"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">{institution.name}</h3>
                              <p className="text-sm text-gray-500 capitalize">{institution.type} • {institution.location}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{institution.description}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Programs:</span> {institution.programs.length}
                            </p>
                            <Button asChild variant="outline">
                              <Link to={`/institutions/${institution.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Institutions;
