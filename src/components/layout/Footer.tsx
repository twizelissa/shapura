
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Rwanda Pathway Finder</h3>
            <p className="text-gray-600">
              Empowering Rwandan students to navigate their educational and career journeys with confidence.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-rwanda-blue">Home</Link></li>
              <li><Link to="/institutions" className="text-gray-600 hover:text-rwanda-blue">Institutions</Link></li>
              <li><Link to="/counselors" className="text-gray-600 hover:text-rwanda-blue">Counselors</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-rwanda-blue">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-rwanda-blue">Career Guides</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-rwanda-blue">Application Tips</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-rwanda-blue">Scholarship Info</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-rwanda-blue">Student Stories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Kigali, Rwanda</li>
              <li className="text-gray-600">info@rwandapathwayfinder.com</li>
              <li className="text-gray-600">+250 788 123 456</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Rwanda Pathway Finder. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-rwanda-blue">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-rwanda-blue">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
