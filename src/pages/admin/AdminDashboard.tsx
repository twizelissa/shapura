
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Edit, Trash2, Building, School } from 'lucide-react';
import { Institution } from '@/types';
import { getInstitutions, deleteInstitution } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

    const fetchInstitutions = async () => {
      try {
        setIsLoading(true);
        const data = await getInstitutions();
        setInstitutions(data);
      } catch (error) {
        console.error('Error fetching institutions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load institutions.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutions();
  }, [user, navigate, toast]);

  const handleDeleteInstitution = async (id: string) => {
    try {
      setDeletingId(id);
      const success = await deleteInstitution(id);
      
      if (success) {
        setInstitutions(prev => prev.filter(inst => inst.id !== id));
        toast({
          title: 'Institution deleted',
          description: 'The institution has been successfully deleted.',
        });
      } else {
        throw new Error('Failed to delete institution');
      }
    } catch (error) {
      console.error('Error deleting institution:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete institution.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (!user || user.role !== 'admin') {
    return null; // Redirect happens in useEffect
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        <Tabs defaultValue="institutions" className="mb-6">
          <TabsList>
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="institutions" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Manage Institutions</h2>
              <Button onClick={() => navigate('/admin/institutions/add')}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Institution
              </Button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p>Loading institutions...</p>
              </div>
            ) : institutions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No institutions found</h3>
                  <p className="text-gray-600 mb-4">Add your first institution to get started</p>
                  <Button onClick={() => navigate('/admin/institutions/add')}>
                    Add Institution
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {institutions.map((institution) => (
                  <Card key={institution.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex">
                      <div className="p-4 bg-gray-100 flex items-center justify-center">
                        {institution.type === 'university' ? (
                          <School className="h-8 w-8 text-gray-600" />
                        ) : (
                          <Building className="h-8 w-8 text-gray-600" />
                        )}
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{institution.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{institution.type} • {institution.location}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/admin/institutions/edit/${institution.id}`)}
                            >
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:border-red-200"
                              onClick={() => handleDeleteInstitution(institution.id)}
                              disabled={deletingId === institution.id}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> 
                              {deletingId === institution.id ? 'Deleting...' : 'Delete'}
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-2 line-clamp-1">
                          Programs: {institution.programs.length}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  User management features will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Institutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{institutions.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">-</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Counselors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">-</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <p className="text-gray-500">
                  Detailed analytics will be available in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
