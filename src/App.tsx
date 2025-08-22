import React, { useEffect, useState } from "react";
import {
  Cloud,
  Zap,
  Shield,
  Globe,
  Image,
  Video,
  FileText,
  Github,
  Chrome,
  Check,
  Star,
  Users,
  Layers,
  Upload,
  Menu,
  X,
  Rocket,
  Lock,
  Cpu,
  Database,
  Server,
  Play,
} from "lucide-react";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ["home", "features", "pricing", "developers"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Show dashboard if user is signed in
  if (showDashboard) {
    return <Dashboard />;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => scrollToSection(href)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 relative overflow-hidden group ${
        activeSection === href
          ? "bg-blue-500/20 text-blue-400"
          : "text-gray-300 hover:text-white"
      }`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="orbital-ring orbital-ring-1"></div>
          <div className="orbital-ring orbital-ring-2"></div>
          <div className="orbital-ring orbital-ring-3"></div>
          <div className="orbital-ring orbital-ring-4"></div>
        </div>

        {/* Floating Particles */}
        <div className="particles-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Dynamic Gradient Orbs */}
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
        <div className="gradient-orb gradient-orb-4"></div>

        {/* Grid Pattern */}
        <div className="grid-pattern"></div>

        {/* Mouse Follower */}
        <div
          className="mouse-follower"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Cloud className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:bg-blue-300/30 transition-all duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cloudlet
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink href="home">Home</NavLink>
              <NavLink href="features">Features</NavLink>
              <NavLink href="pricing">Pricing</NavLink>
              <NavLink href="developers">Developers</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 relative group">
                <span onClick={() => setShowDashboard(true)}>Sign In</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 relative overflow-hidden group">
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 animate-slide-down">
              <div className="px-4 py-4 space-y-2">
                <NavLink href="home">Home</NavLink>
                <NavLink href="features">Features</NavLink>
                <NavLink href="pricing">Pricing</NavLink>
                <NavLink href="developers">Developers</NavLink>
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">
                    <span onClick={() => setShowDashboard(true)}>Sign In</span>
                  </button>
                  <button className="block w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-medium">
                    Get Started Free
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Announcement Badge */}
          {/* <div className="mb-0 mt-10 animate-float">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full px-6 py-3 mb-8 hover:border-blue-400/40 transition-all duration-300 group cursor-pointer">
              <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
              <span className="text-sm text-blue-300 font-medium">
                Introducing CloudBox v3.0 - Now with AI Optimization
              </span>
              <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div> */}

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-b from-white via-gray-100 to-gray-300 bg-clip-text text-transparent animate-text-shimmer">
              The Future of
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Media Storage
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
            Store, optimize, and deliver your media assets with lightning speed.
            CloudBox transforms how developers handle images, videos, and
            documents with
            <span className="text-blue-400 font-semibold">
              {" "}
              AI-powered optimization
            </span>{" "}
            and
            <span className="text-cyan-400 font-semibold">
              {" "}
              global CDN delivery
            </span>
            .
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <Rocket className="h-5 w-5" />
                <span>Launch Your Project</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </button>

            <button className="group px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center space-x-2 relative overflow-hidden">
              <Play className="h-5 w-5 text-blue-400" />
              <span>Watch Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full px-6 py-2 mb-8">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                Powerful Features
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Everything You Need
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                And More
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              CloudBox provides cutting-edge tools and features that transform
              how you manage, optimize, and deliver media assets across the
              globe.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: Upload,
                title: "Instant Upload",
                description:
                  "Drag, drop, and upload any media file with real-time progress tracking and automatic format detection.",
                color: "blue",
                delay: "0s",
              },
              {
                icon: Cpu,
                title: "AI Optimization",
                description:
                  "Machine learning algorithms automatically compress and optimize your media without quality loss.",
                color: "cyan",
                delay: "0.1s",
              },
              {
                icon: Globe,
                title: "Global CDN",
                description:
                  "Lightning-fast delivery from 300+ edge locations worldwide with intelligent routing.",
                color: "purple",
                delay: "0.2s",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "Bank-level encryption, access controls, and compliance with SOC 2 and GDPR standards.",
                color: "green",
                delay: "0.3s",
              },
              {
                icon: Database,
                title: "Smart Storage",
                description:
                  "Intelligent tiering and deduplication reduce costs while maintaining instant access.",
                color: "orange",
                delay: "0.4s",
              },
              {
                icon: Layers,
                title: "Project Management",
                description:
                  "Organize assets with advanced tagging, folders, and team collaboration tools.",
                color: "pink",
                delay: "0.5s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`feature-card feature-card-${feature.color} group`}
                style={{ animationDelay: feature.delay }}
              >
                <div
                  className={`feature-icon feature-icon-${feature.color} group-hover:scale-110 transition-all duration-300`}
                >
                  <feature.icon className="h-8 w-8" />
                  <div className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Media Types Showcase */}
          <div className="relative">
            <div className="glass-card-large p-12 text-center">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Support for Every Media Type
              </h3>
              <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
                Upload and optimize any file format with intelligent processing
                and automatic conversions
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Image,
                    title: "Images",
                    formats: "JPG, PNG, WebP, AVIF, SVG, GIF",
                    description: "Smart compression with format conversion",
                    color: "blue",
                  },
                  {
                    icon: Video,
                    title: "Videos",
                    formats: "MP4, WebM, MOV, AVI, MKV",
                    description: "Automatic transcoding and streaming",
                    color: "purple",
                  },
                  {
                    icon: FileText,
                    title: "Documents",
                    formats: "PDF, DOC, XLS, PPT, TXT",
                    description: "Secure storage with preview generation",
                    color: "cyan",
                  },
                ].map((type, index) => (
                  <div
                    key={index}
                    className={`media-type-card media-type-${type.color} group`}
                  >
                    <div
                      className={`media-type-icon media-type-icon-${type.color}`}
                    >
                      <type.icon className="h-12 w-12" />
                    </div>
                    <h4 className="text-2xl font-bold mb-3">{type.title}</h4>
                    <p className="text-sm text-gray-400 mb-3 font-mono">
                      {type.formats}
                    </p>
                    <p className="text-gray-300">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl border border-green-500/20 rounded-full px-6 py-2 mb-8">
              <Star className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">
                Simple Pricing
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Start Free,
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Scale Infinitely
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              No hidden fees, no surprises. Pay only for what you use with
              transparent, developer-friendly pricing that grows with your
              business.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {/* Free Plan */}
            <div className="pricing-card pricing-card-free group">
              <div className="pricing-header">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-5xl font-black mb-4">
                  Free
                  <span className="text-lg text-gray-400 font-normal">
                    /forever
                  </span>
                </div>
                <p className="text-gray-300">Perfect for trying CloudBox</p>
              </div>

              <ul className="pricing-features">
                {[
                  "10GB Storage",
                  "50GB Bandwidth",
                  "Basic CDN",
                  "Standard Support",
                  "API Access",
                  "1 Project",
                ].map((feature, index) => (
                  <li key={index} className="pricing-feature">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="pricing-button pricing-button-free">
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card pricing-card-pro group relative">
              {/* <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              </div> */}

              <div className="pricing-header">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-5xl font-black mb-4">
                  $29
                  <span className="text-lg text-gray-400 font-normal">
                    /month
                  </span>
                </div>
                <p className="text-gray-300">For growing businesses</p>
              </div>

              <ul className="pricing-features">
                {[
                  "500GB Storage",
                  "2TB Bandwidth",
                  "Premium CDN",
                  "Priority Support",
                  "Advanced Analytics",
                  "Team Collaboration",
                  "Custom Domains",
                  "Unlimited Projects",
                ].map((feature, index) => (
                  <li key={index} className="pricing-feature">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="pricing-button pricing-button-pro">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card pricing-card-enterprise group">
              <div className="pricing-header">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-5xl font-black mb-4">Custom</div>
                <p className="text-gray-300">For large-scale operations</p>
              </div>

              <ul className="pricing-features">
                {[
                  "Unlimited Storage",
                  "Unlimited Bandwidth",
                  "Enterprise CDN",
                  "24/7 Dedicated Support",
                  "Custom Integrations",
                  "SLA Guarantee",
                  "On-premise Options",
                  "White-label Solution",
                ].map((feature, index) => (
                  <li key={index} className="pricing-feature">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="pricing-button pricing-button-enterprise">
                Contact Sales
              </button>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="glass-card-large p-8">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Why Developers Choose CloudBox
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "50ms global response time",
                  color: "yellow",
                },
                {
                  icon: Lock,
                  title: "Bank-Level Security",
                  description: "SOC 2 & GDPR compliant",
                  color: "green",
                },
                {
                  icon: Cpu,
                  title: "AI-Powered",
                  description: "Smart optimization algorithms",
                  color: "purple",
                },
                {
                  icon: Server,
                  title: "99.99% Uptime",
                  description: "Enterprise-grade reliability",
                  color: "blue",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`benefit-card benefit-card-${benefit.color} group`}
                >
                  <div className={`benefit-icon benefit-icon-${benefit.color}`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-full px-6 py-2 mb-8">
              <Cpu className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">
                Developer Experience
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Built for
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Integrate CloudBox into your workflow in minutes with our
              intuitive APIs, comprehensive SDKs, and developer-first approach.
            </p>
          </div>

          {/* Integration Example */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-8">
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Simple Integration
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                Get started with just a few lines of code. Our REST API and SDKs
                make it effortless to upload, manage, and deliver your media
                assets with enterprise-grade performance.
              </p>

              <div className="space-y-4">
                {[
                  "RESTful API with OpenAPI documentation",
                  "SDKs for JavaScript, Python, PHP, Go, and more",
                  "Real-time webhooks for event notifications",
                  "URL-based transformations and optimizations",
                  "GraphQL support for flexible queries",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-pink-400 transition-colors duration-300"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  <Github className="h-5 w-5" />
                  <span>View on GitHub</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 rounded-xl font-semibold transition-all duration-300">
                  <FileText className="h-5 w-5" />
                  <span>Read Docs</span>
                </button>
              </div>
            </div>

            <div className="code-showcase">
              <div className="code-header">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">upload-example.js</div>
              </div>

              <div className="code-content">
                <pre className="text-sm">
                  {`// Upload and optimize image
                    import { CloudBox } from '@cloudbox/sdk';

                    const cloudbox = new CloudBox({
                      apiKey: process.env.CLOUDBOX_API_KEY
                    });

                    // Upload with automatic optimization
                    const result = await cloudbox.upload({
                      file: imageFile,
                      folder: 'products',
                      optimize: {
                        quality: 85,
                        format: 'webp',
                        resize: { width: 800 }
                      }
                    });

                    // Get optimized CDN URL
                    const optimizedUrl = result.url;
                    console.log('CDN URL:', optimizedUrl);

                    // Use with transformations
                    const thumbnail = cloudbox.transform(result.id)
                      .resize(200, 200)
                      .quality(90)
                      .format('webp')
                      .url();`}
                </pre>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "E-commerce",
                description:
                  "Perfect for product catalogs, user-generated content, and marketing assets with automatic optimization and fast delivery.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Star,
                title: "SaaS Applications",
                description:
                  "Handle user avatars, document uploads, and media assets with secure, scalable storage and instant access.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Globe,
                title: "Content Platforms",
                description:
                  "Deliver blog images, videos, and media content fast with our global CDN network and smart caching.",
                gradient: "from-green-500 to-blue-500",
              },
            ].map((useCase, index) => (
              <div key={index} className="use-case-card group">
                <div
                  className={`use-case-icon bg-gradient-to-br ${useCase.gradient}`}
                >
                  <useCase.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                  {useCase.title}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Your Media Workflow?
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers and teams who trust CloudBox for
              their media storage and delivery needs. Start your free trial
              today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="cta-button cta-button-primary group">
              <span className="relative z-10 flex items-center space-x-2">
                <Rocket className="h-5 w-5" />
                <span>Start Your Free Trial</span>
              </span>
              <div className="cta-shine"></div>
            </button>

            <button className="cta-button cta-button-secondary group">
              <span className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>View Documentation</span>
              </span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2 group">
              <Shield className="h-4 w-4 group-hover:text-green-400 transition-colors" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Zap className="h-4 w-4 group-hover:text-yellow-400 transition-colors" />
              <span>99.99% Uptime</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Globe className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
              <span>300+ Edge Locations</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Users className="h-4 w-4 group-hover:text-purple-400 transition-colors" />
              <span>10,000+ Happy Developers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Cloud className="h-8 w-8 text-blue-400" />
                  <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  CloudBox
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The future of media storage and delivery. Built for developers,
                trusted by teams worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Github className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Chrome className="h-5 w-5" />
                </button>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Pricing",
                  "API",
                  "Documentation",
                  "Status",
                ],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact", "Press"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Compliance", "GDPR"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-white">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-sm text-gray-400">
              © 2025 CloudBox. All rights reserved.
            </div>
            <div className="text-sm text-gray-400 mt-4 sm:mt-0">
              Made with ❤️ for developers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
