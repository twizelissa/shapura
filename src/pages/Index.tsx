
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Compass, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Find Your Educational Path in Rwanda
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover schools, connect with counselors, and make informed decisions about your future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-rwanda-blue hover:bg-gray-100">
              <Link to="/institutions">Explore Institutions</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/counselors">Connect with Counselors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How We Help Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-rwanda-blue p-4 text-white mb-4">
                  <Compass className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore Institutions</h3>
                <p className="text-gray-600 mb-4">
                  Discover and compare universities, colleges, and vocational schools across Rwanda.
                </p>
                <Link to="/institutions" className="text-rwanda-blue font-medium flex items-center hover:underline">
                  Browse Schools <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-rwanda-green p-4 text-white mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect with Counselors</h3>
                <p className="text-gray-600 mb-4">
                  Get personalized guidance from experienced educational counselors and mentors.
                </p>
                <Link to="/counselors" className="text-rwanda-green font-medium flex items-center hover:underline">
                  Find Counselors <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-rwanda-yellow p-4 text-white mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Make Informed Decisions</h3>
                <p className="text-gray-600 mb-4">
                  Access information about programs, requirements, career opportunities, and more.
                </p>
                <Link to="/about" className="text-rwanda-yellow font-medium flex items-center hover:underline">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Student Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="italic text-gray-600 mb-4">
                  "Rwanda Pathway Finder helped me discover the perfect IT program at the University of Rwanda. The counselor guidance was invaluable in making my decision."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full h-12 w-12 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Jean Mutoni</h4>
                    <p className="text-sm text-gray-500">Computer Science Student, University of Rwanda</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="italic text-gray-600 mb-4">
                  "I was unsure about my career path after secondary school. The mentor I connected with through this platform helped me identify my strengths and find the right program."
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full h-12 w-12 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">Eric Mugisha</h4>
                    <p className="text-sm text-gray-500">Business Administration Student, African Leadership University</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rwanda-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create an account to explore institutions, connect with counselors, and plan your educational future.
          </p>
          <Button asChild size="lg" className="bg-white text-rwanda-blue hover:bg-gray-100">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
