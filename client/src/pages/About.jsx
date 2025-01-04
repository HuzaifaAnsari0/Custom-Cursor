import React from 'react';
import { 
  MousePointer2, 
  Code, 
  Palette, 
  Zap,
  Building2,
  Target,
  Users,
  Lightbulb
} from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
            <MousePointer2 className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CursorCraft</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A product of Tarlose, where innovation meets creativity in transforming how websites 
            interact with their users.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <Target className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 text-lg">
            At Tarlose, we aim to empower businesses and developers by providing innovative tools 
            that enhance user interaction and design. CursorCraft embodies this mission by giving 
            you the freedom to express your brand's personality through CursorCrafts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Ease of Use</h3>
            </div>
            <p className="text-gray-600">
              Integrate CursorCrafts effortlessly using our API or prebuilt CSS styles.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Palette className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Diverse Options</h3>
            </div>
            <p className="text-gray-600">
              Explore a wide collection of stylish and functional cursors.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Built with Excellence</h3>
            </div>
            <p className="text-gray-600">
              Developed by Huzaifa Ansari and backed by the expertise of Tarlose.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <Lightbulb className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously pushing boundaries to bring you cutting-edge solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">User-Centric Design</h3>
              <p className="text-gray-600">
                Crafting tools that are intuitive and impactful.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600">
                Ensuring top-notch performance and seamless integration.
              </p>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <Building2 className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">About Tarlose</h2>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Tarlose is a tech company specializing in cutting-edge technology solutions, including 
            web development, graphic design, and digital marketing. We pride ourselves on delivering 
            impactful results that empower businesses to thrive in the digital age.
          </p>
          <div className="flex items-center justify-center">
            <Users className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="text-gray-900 font-medium">
              Led by Huzaifa Ansari, COO
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing CursorCraft—where every click becomes an experience.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/docs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get Started
            </a>
            <a
              href="mailto:admin@tarlose.com"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 