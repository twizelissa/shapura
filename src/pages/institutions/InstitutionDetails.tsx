
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen,
  Clock,
  GraduationCap,
  BriefcaseIcon,
  ChevronRight
} from 'lucide-react';
import { Institution, Program } from '@/types';
import { getInstitutionById } from '@/data/mockData';
import Layout from '@/components/layout/Layout';

const InstitutionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        if (!id) {
          throw new Error('Institution ID is required');
        }
        
        setIsLoading(true);
        const data = await getInstitutionById(id);
        
        if (!data) {
          throw new Error('Institution not found');
        }
        
        setInstitution(data);
      } catch (error) {
        console.error('Error fetching institution:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitution();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <p>Loading institution details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !institution) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500 mb-4">{error || 'Institution not found'}</p>
          <Button asChild>
            <Link to="/institutions">Back to Institutions</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <div className="relative h-64 md:h-80 bg-gray-200">
        <img 
          src={institution.coverImageUrl || "/placeholder.svg"}
          alt={institution.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center">
              <img 
                src={institution.logoUrl || "/placeholder.svg"}
                alt={`${institution.name} logo`}
                className="w-20 h-20 md:w-24 md:h-24 bg-white p-1 rounded-md mr-4"
              />
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl font-bold">{institution.name}</h1>
                <div className="flex items-center mt-2">
                  <Badge className="capitalize bg-white/20 hover:bg-white/30 mr-2">
                    {institution.type}
                  </Badge>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1 inline" />
                    {institution.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {institution.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{institution.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {institution.foundedYear && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="font-medium">Founded</p>
                          <p className="text-gray-600">{institution.foundedYear}</p>
                        </div>
                      </div>
                    )}
                    
                    {institution.accreditation && (
                      <div className="flex items-start">
                        <Award className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="font-medium">Accreditation</p>
                          <p className="text-gray-600">{institution.accreditation}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <BookOpen className="h-5 w-5 mr-2 text-gray-500" />
                      <div>
                        <p className="font-medium">Programs Offered</p>
                        <p className="text-gray-600">{institution.programs.length} programs</p>
                      </div>
                    </div>
                    
                    {institution.website && (
                      <div className="flex items-start">
                        <ExternalLink className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="font-medium">Website</p>
                          <a 
                            href={institution.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-rwanda-blue hover:underline"
                          >
                            Visit official website
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Programs Offered</CardTitle>
                    <CardDescription>
                      Explore the academic programs available at {institution.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {institution.programs.length === 0 ? (
                      <p className="text-gray-600">No programs listed for this institution.</p>
                    ) : (
                      <div className="space-y-6">
                        {institution.programs.map((program: Program) => (
                          <div key={program.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-lg font-semibold">{program.name}</h3>
                              <Badge className="capitalize">{program.level}</Badge>
                            </div>
                            
                            <p className="text-gray-700 mb-4">{program.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-start">
                                <Clock className="h-5 w-5 mr-2 text-gray-500 mt-1" />
                                <div>
                                  <p className="font-medium">Duration</p>
                                  <p className="text-gray-600">{program.duration}</p>
                                </div>
                              </div>
                              
                              {program.tuitionFees && (
                                <div className="flex items-start">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-gray-500 mt-1">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                    <path d="M12 18V6" />
                                  </svg>
                                  <div>
                                    <p className="font-medium">Tuition Fees</p>
                                    <p className="text-gray-600">{program.tuitionFees}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {program.requirements && program.requirements.length > 0 && (
                              <div className="mb-4">
                                <p className="font-medium flex items-center">
                                  <GraduationCap className="h-5 w-5 mr-2 text-gray-500" />
                                  Entry Requirements
                                </p>
                                <ul className="list-disc list-inside text-gray-600 ml-7 mt-1">
                                  {program.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {program.careers && program.careers.length > 0 && (
                              <div>
                                <p className="font-medium flex items-center">
                                  <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                                  Career Opportunities
                                </p>
                                <ul className="list-disc list-inside text-gray-600 ml-7 mt-1">
                                  {program.careers.map((career, index) => (
                                    <li key={index}>{career}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="facilities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campus Facilities</CardTitle>
                    <CardDescription>
                      Explore the facilities available at {institution.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {institution.facilities && institution.facilities.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {institution.facilities.map((facility, index) => (
                          <div key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 mr-2 text-rwanda-blue" />
                            <span>{facility}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No facility information available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {institution.contact?.email && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href={`mailto:${institution.contact.email}`}
                        className="text-rwanda-blue hover:underline"
                      >
                        {institution.contact.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {institution.contact?.phone && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href={`tel:${institution.contact.phone}`}
                        className="text-gray-700"
                      >
                        {institution.contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {institution.contact?.address && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-700">{institution.contact.address}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Speak to a Counselor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Have questions about this institution? Connect with a counselor for personalized guidance.
                </p>
                <Button asChild className="w-full">
                  <Link to="/counselors">Find Counselors</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionDetails;
