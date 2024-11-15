import { Link } from "react-router-dom";
import {
  ArrowRight,
  Book,
  Brain,
  BarChart3,
  Globe,
  Rocket,
  Users,
  MessageCircle,
  Star,
  Award,
  Video,
  Headphones,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Language Virtual Lab
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Languages with
              <span className="text-blue-600"> Virtual Lab</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              An immersive platform designed to make language learning engaging,
              effective, and tailored to your pace.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors border border-blue-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Language Virtual Lab?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines modern technology with proven learning
              methods to create an effective language learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core Features */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Structured Learning
              </h3>
              <p className="text-gray-600">
                Well-organized lessons and a curriculum designed to take you
                from beginner to advanced level systematically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Interactive Practice
              </h3>
              <p className="text-gray-600">
                Engage with dynamic exercises and real-world scenarios to
                reinforce your learning and build confidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed analytics and
                achievement milestones to stay motivated.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Tools Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Learning Tools
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to master a new language effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Video className="h-8 w-8 text-blue-500 mb-3" />
              <h3 className="font-semibold mb-2">Video Lessons</h3>
              <p className="text-sm text-gray-600">
                High-quality video content with native speakers
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Headphones className="h-8 w-8 text-green-500 mb-3" />
              <h3 className="font-semibold mb-2">Audio Practice</h3>
              <p className="text-sm text-gray-600">
                Pronunciation and listening exercises
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <MessageCircle className="h-8 w-8 text-yellow-500 mb-3" />
              <h3 className="font-semibold mb-2">Interactive Dialogues</h3>
              <p className="text-sm text-gray-600">
                Practice real conversations
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Award className="h-8 w-8 text-purple-500 mb-3" />
              <h3 className="font-semibold mb-2">Achievements</h3>
              <p className="text-sm text-gray-600">
                Earn badges and track progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center text-center gap-8 flex-wrap">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Learning Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Language Learning Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already mastering new languages
            with our platform.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Get Started Free
            <Rocket className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="ml-2 font-bold text-gray-800">
                  Language Virtual Lab
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Making language learning accessible and effective for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Languages</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>English</li>
                <li>Spanish</li>
                <li>French</li>
                <li>German</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Blog</li>
                <li>Learning Tips</li>
                <li>Success Stories</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>&copy; 2024 Language Virtual Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
