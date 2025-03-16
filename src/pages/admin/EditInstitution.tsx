
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getInstitutionById, updateInstitution } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Institution, Program } from '@/types';
import Layout from '@/components/layout/Layout';

const emptyProgram: Omit<Program, 'id'> = {
  name: '',
  level: 'bachelors',
  duration: '',
  description: '',
  careers: [],
  requirements: [],
  tuitionFees: '',
};

const EditInstitution = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [institution, setInstitution] = useState<Institution | null>(null);
  
  const [currentProgram, setCurrentProgram] = useState<Omit<Program, 'id'>>({...emptyProgram});
  const [currentFacility, setCurrentFacility] = useState('');
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentCareer, setCurrentCareer] = useState('');
  
  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== 'admin') {
      toast({
        title: 'Access denied',
        description: 'You must be an admin to access this page.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }

    if (!id) {
      navigate('/admin');
      return;
    }

    const fetchInstitution = async () => {
      try {
        setIsLoading(true);
        const data = await getInstitutionById(id);
        if (!data) {
          throw new Error('Institution not found');
        }
        setInstitution(data);
      } catch (error) {
        console.error('Error fetching institution:', error);
        toast({
          title: 'Error',
          description: 'Failed to load institution details.',
          variant: 'destructive',
        });
        navigate('/admin');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitution();
  }, [user, id, navigate, toast]);

  const handleInstitutionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!institution) return;
    
    const { name, value } = e.target;
    setInstitution(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!institution) return;
    
    const { name, value } = e.target;
    setInstitution(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value,
        },
      };
    });
  };

  const handleProgramChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProgram(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProgram = () => {
    if (!institution) return;
    if (!currentProgram.name || !currentProgram.duration || !currentProgram.description) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required program fields.',
        variant: 'destructive',
      });
      return;
    }
    
    const newProgram = {
      ...currentProgram,
      id: `temp-${Date.now()}`, // temporary ID until saved to backend
    };
    
    setInstitution(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        programs: [...prev.programs, newProgram],
      };
    });
    
    setCurrentProgram({...emptyProgram});
    
    toast({
      title: 'Program added',
      description: `${newProgram.name} has been added to the institution.`,
    });
  };

  const removeProgram = (index: number) => {
    if (!institution) return;
    
    setInstitution(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        programs: prev.programs.filter((_, i) => i !== index),
      };
    });
  };

  const addFacility = () => {
    if (!institution) return;
    if (!currentFacility.trim()) return;
    
    setInstitution(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        facilities: [...(prev.facilities || []), currentFacility.trim()],
      };
    });
    
    setCurrentFacility('');
  };

  const removeFacility = (index: number) => {
    if (!institution) return;
    
    setInstitution(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        facilities: prev.facilities?.filter((_, i) => i !== index) || [],
      };
    });
  };

  const addRequirement = () => {
    if (!currentRequirement.trim()) return;
    
    setCurrentProgram(prev => ({
      ...prev,
      requirements: [...(prev.requirements || []), currentRequirement.trim()],
    }));
    
    setCurrentRequirement('');
  };

  const removeRequirement = (index: number) => {
    setCurrentProgram(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || [],
    }));
  };

  const addCareer = () => {
    if (!currentCareer.trim()) return;
    
    setCurrentProgram(prev => ({
      ...prev,
      careers: [...(prev.careers || []), currentCareer.trim()],
    }));
    
    setCurrentCareer('');
  };

  const removeCareer = (index: number) => {
    setCurrentProgram(prev => ({
      ...prev,
      careers: prev.careers?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!institution) return;
    if (!institution.name || !institution.location || !institution.description) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required institution fields.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const updatedInstitution = await updateInstitution(institution.id, institution);
      
      if (!updatedInstitution) {
        throw new Error('Failed to update institution');
      }
      
      toast({
        title: 'Institution updated',
        description: `${updatedInstitution.name} has been successfully updated.`,
      });
      
      navigate('/admin');
    } catch (error) {
      console.error('Error updating institution:', error);
      toast({
        title: 'Error',
        description: 'Failed to update institution. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return null; // Redirect happens in useEffect
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <p>Loading institution details...</p>
        </div>
      </Layout>
    );
  }

  if (!institution) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Institution Not Found</h2>
          <Button onClick={() => navigate('/admin')}>Back to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Edit Institution: {institution.name}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Institution Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={institution.name}
                      onChange={handleInstitutionChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type *</Label>
                      <Select 
                        value={institution.type} 
                        onValueChange={(value) => setInstitution(prev => {
                          if (!prev) return prev;
                          return {...prev, type: value as any};
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="vocational">Vocational School</SelectItem>
                          <SelectItem value="secondary">Secondary School</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        name="location"
                        value={institution.location}
                        onChange={handleInstitutionChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={institution.website || ''}
                        onChange={handleInstitutionChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        name="foundedYear"
                        type="number"
                        value={institution.foundedYear || ''}
                        onChange={(e) => setInstitution(prev => {
                          if (!prev) return prev;
                          return {
                            ...prev, 
                            foundedYear: e.target.value ? parseInt(e.target.value) : undefined
                          };
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={institution.description}
                      onChange={handleInstitutionChange}
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accreditation">Accreditation</Label>
                    <Input
                      id="accreditation"
                      name="accreditation"
                      value={institution.accreditation || ''}
                      onChange={handleInstitutionChange}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={institution.contact?.email || ''}
                        onChange={handleContactChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={institution.contact?.phone || ''}
                        onChange={handleContactChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={institution.contact?.address || ''}
                      onChange={handleContactChange}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Facilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={currentFacility}
                      onChange={(e) => setCurrentFacility(e.target.value)}
                      placeholder="Add a facility (e.g., Library, Computer Lab)"
                    />
                    <Button type="button" onClick={addFacility}>Add</Button>
                  </div>
                  
                  {institution.facilities && institution.facilities.length > 0 && (
                    <div className="space-y-2">
                      <Label>Current Facilities</Label>
                      <div className="border rounded-md p-3 space-y-2">
                        {institution.facilities.map((facility, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span>{facility}</span>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeFacility(index)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Programs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* List of existing programs */}
                  {institution.programs.length > 0 && (
                    <div className="space-y-3">
                      <Label>Current Programs</Label>
                      <div className="border rounded-md p-3 space-y-3">
                        {institution.programs.map((program, index) => (
                          <div key={program.id} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{program.name}</h4>
                                <p className="text-sm text-gray-500 capitalize">
                                  {program.level} • {program.duration}
                                </p>
                              </div>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeProgram(index)}
                              >
                                <Trash className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Form to add a new program */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Add New Program</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="program-name">Program Name *</Label>
                        <Input
                          id="program-name"
                          name="name"
                          value={currentProgram.name}
                          onChange={handleProgramChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="program-level">Level *</Label>
                          <Select 
                            value={currentProgram.level} 
                            onValueChange={(value) => setCurrentProgram(prev => ({...prev, level: value as any}))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="certificate">Certificate</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="bachelors">Bachelor's</SelectItem>
                              <SelectItem value="masters">Master's</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="program-duration">Duration *</Label>
                          <Input
                            id="program-duration"
                            name="duration"
                            value={currentProgram.duration}
                            onChange={handleProgramChange}
                            placeholder="e.g., 4 years, 2 semesters"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="program-description">Description *</Label>
                        <Textarea
                          id="program-description"
                          name="description"
                          value={currentProgram.description}
                          onChange={handleProgramChange}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="program-fees">Tuition Fees</Label>
                        <Input
                          id="program-fees"
                          name="tuitionFees"
                          value={currentProgram.tuitionFees}
                          onChange={handleProgramChange}
                          placeholder="e.g., 1,200,000 RWF per year"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Entry Requirements</Label>
                        <div className="flex space-x-2">
                          <Input
                            value={currentRequirement}
                            onChange={(e) => setCurrentRequirement(e.target.value)}
                            placeholder="Add a requirement"
                          />
                          <Button type="button" onClick={addRequirement}>Add</Button>
                        </div>
                        
                        {currentProgram.requirements && currentProgram.requirements.length > 0 && (
                          <div className="border rounded-md p-3 mt-2 space-y-2">
                            {currentProgram.requirements.map((requirement, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span>{requirement}</span>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeRequirement(index)}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Career Opportunities</Label>
                        <div className="flex space-x-2">
                          <Input
                            value={currentCareer}
                            onChange={(e) => setCurrentCareer(e.target.value)}
                            placeholder="Add a career path"
                          />
                          <Button type="button" onClick={addCareer}>Add</Button>
                        </div>
                        
                        {currentProgram.careers && currentProgram.careers.length > 0 && (
                          <div className="border rounded-md p-3 mt-2 space-y-2">
                            {currentProgram.careers.map((career, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span>{career}</span>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeCareer(index)}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        type="button" 
                        onClick={addProgram}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Program to Institution
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Image URLs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      name="logoUrl"
                      value={institution.logoUrl || ''}
                      onChange={handleInstitutionChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                    <Input
                      id="coverImageUrl"
                      name="coverImageUrl"
                      value={institution.coverImageUrl || ''}
                      onChange={handleInstitutionChange}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Save Changes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">
                    Make sure you've filled out all required fields before saving changes.
                  </p>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditInstitution;
