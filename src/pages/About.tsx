
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Compass, Users, Award, TrendingUp, Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Rwanda Pathway Finder</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                Rwanda Pathway Finder empowers Rwandan students to confidently navigate their educational and 
                career journeys by connecting them with the resources and guidance they need to explore their options, 
                understand their strengths, and make informed decisions about their futures.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">The Problem We're Solving</h2>
              <p className="text-gray-700 mb-4">
                Choosing an educational and career path is a major challenge for Rwandan students. Many lack access 
                to the information and guidance needed to explore available pathways, understand their own strengths, 
                and connect with qualified mentors. 
              </p>
              <p className="text-gray-700 mb-6">
                This challenge is particularly critical as students transition from secondary school to higher 
                education or the workforce, though the need for support is ongoing. While this issue affects students 
                across Rwanda, those in rural areas often face even greater barriers.
              </p>
              
              <blockquote className="border-l-4 border-rwanda-blue pl-4 italic text-gray-600 my-6">
                "The rapid growth of Rwanda's education system, while offering more opportunities, has also 
                created a more complex system that existing support structures struggle to manage."
              </blockquote>
              
              <p className="text-gray-700">
                Our survey of 300 Rwandan students showed that 32.6% feel overwhelmed by the choices available, 
                29.3% lack information about schools and careers, and 26.1% are unsure of their own skills and 
                desire mentorship. This reflects the broader challenges of youth employment and skills gaps in 
                Rwanda, as discussed in the Rwanda Dispatch article, "Youth employment struggles: Bridging the 
                skills gap for a better future."
              </p>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Compass className="h-6 w-6 text-rwanda-blue" />
                <CardTitle className="text-lg">School Exploration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Access comprehensive information about educational institutions across Rwanda, 
                  including universities, colleges, and vocational schools. Compare programs, 
                  requirements, costs, and outcomes.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Users className="h-6 w-6 text-rwanda-green" />
                <CardTitle className="text-lg">Counselor Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Connect directly with experienced education counselors and mentors who can provide 
                  personalized guidance on program selection, application strategies, and career planning.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <BookOpen className="h-6 w-6 text-rwanda-yellow" />
                <CardTitle className="text-lg">Program Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Learn about different academic programs, their requirements, potential career paths, 
                  and how they align with your interests and goals.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Briefcase className="h-6 w-6 text-rwanda-blue" />
                <CardTitle className="text-lg">Career Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Explore potential career paths associated with different educational choices, 
                  understand job market trends, and learn about required skills and qualifications.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-rwanda-blue/10 p-4 mb-4">
                  <TrendingUp className="h-8 w-8 text-rwanda-blue" />
                </div>
                <h3 className="font-semibold mb-2">Informed Decisions</h3>
                <p className="text-gray-600">
                  Helping students make better-informed choices about their educational paths
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-rwanda-green/10 p-4 mb-4">
                  <Award className="h-8 w-8 text-rwanda-green" />
                </div>
                <h3 className="font-semibold mb-2">Skills Alignment</h3>
                <p className="text-gray-600">
                  Improving the match between student talents and chosen educational programs
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-rwanda-yellow/10 p-4 mb-4">
                  <Users className="h-8 w-8 text-rwanda-yellow" />
                </div>
                <h3 className="font-semibold mb-2">Expanded Access</h3>
                <p className="text-gray-600">
                  Increasing access to educational guidance, especially for underserved communities
                </p>
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Join Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Whether you're a student seeking guidance, a counselor willing to mentor, or an educational 
                institution looking to connect with prospective students, we invite you to join the Rwanda 
                Pathway Finder community.
              </p>
              <p className="text-gray-700">
                Together, we can build a brighter future for Rwanda by empowering its youth with the knowledge 
                and connections they need to succeed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
