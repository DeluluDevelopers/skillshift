"use client";

import {
  Users,
  Target,
  TrendingUp,
  Award,
  Sparkles,
  Globe,
  Heart,
  CheckCircle,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 30);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div className='min-h-screen bg-gradient-dark font-montserrat'>
      {/* Animated Background Elements */}
      <div className='fixed inset-0 bg-pattern opacity-30'></div>
      <div className='absolute top-20 left-10 w-72 h-72 bg-premium-blue/10 rounded-full blur-3xl floating'></div>
      <div className='absolute top-40 right-20 w-96 h-96 bg-premium-cyan/10 rounded-full blur-3xl floating-delayed'></div>
      <div className='absolute bottom-20 left-1/4 w-80 h-80 bg-premium-indigo/10 rounded-full blur-3xl floating-slow'></div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[rgba(59,130,246,0.05)] backdrop-blur-[25px] shadow-lg mt-4 mx-4 rounded-2xl"
            : "bg-transparent mt-0 mx-0"
        }`}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-20'>
            <div className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <Image
                  src='/logo_without_bg.png'
                  alt='SkillShift Logo'
                  width={120}
                  height={120}
                  className='w-32 h-32 object-contain'
                  style={{ maxWidth: "none", maxHeight: "none" }}
                />
              </div>
            </div>
            <div className='hidden md:flex items-center space-x-8'>
              <Link
                href='/'
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium animate-fade-in group'
              >
                <span className='relative'>
                  Home
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full'></span>
                </span>
              </Link>
              <Link
                href='/about'
                className='text-premium-blue font-medium animate-fade-in group'
              >
                <span className='relative'>
                  About
                  <span className='absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary'></span>
                </span>
              </Link>
              <Link
                href='/contact'
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium animate-fade-in group'
              >
                <span className='relative'>
                  Contact
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full'></span>
                </span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className='md:hidden'>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-white hover:text-premium-blue transition-colors'
              >
                {isMobileMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden fixed inset-0 bg-black/95 backdrop-blur-[25px] z-[9998] flex items-center justify-center'>
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className='absolute top-6 right-6 text-white hover:text-premium-blue transition-colors'
            >
              <X className='h-8 w-8' />
            </button>

            <div className='flex flex-col space-y-8 text-center'>
              <Link
                href='/'
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium text-2xl'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href='/about'
                className='text-premium-blue font-medium text-2xl'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href='/contact'
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium text-2xl'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className='py-24 relative overflow-hidden min-h-screen flex items-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Sparkles className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>About SkillShift</span>
            </div>
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-8'>
              India&apos;s Premier
              <br />
              <span className='text-gradient-premium'>Training Company</span>
            </h1>
            <p className='text-xl text-gray-300 max-w-4xl mx-auto font-open-sans leading-relaxed'>
              We are India&apos;s premier training and development company,
              offering customized learning programs for businesses and
              organizations at all levels. SkillShift provides a one-stop
              solution for all types of behavioural skills challenges. Be it
              confidence, public speaking, or communication skills, we help you
              with a 360-degree transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='py-24 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            <div className='animate-slide-up'>
              <h2 className='text-4xl font-bold text-white mb-8'>
                Our Mission
              </h2>
              <p className='text-lg text-gray-300 mb-6 font-open-sans leading-relaxed'>
                To empower individuals and organizations with the skills,
                knowledge, and mindset needed to thrive in today&apos;s dynamic
                business environment. We believe in transforming potential into
                performance through innovative training solutions.
              </p>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-premium-blue mr-3' />
                  <span className='text-gray-300 font-open-sans'>
                    Personalized learning experiences
                  </span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-premium-blue mr-3' />
                  <span className='text-gray-300 font-open-sans'>
                    Industry-relevant curriculum
                  </span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-premium-blue mr-3' />
                  <span className='text-gray-300 font-open-sans'>
                    Measurable outcomes
                  </span>
                </div>
              </div>
            </div>
            <div className='animate-slide-up'>
              <h2 className='text-4xl font-bold text-white mb-8'>Our Vision</h2>
              <p className='text-lg text-gray-300 mb-6 font-open-sans leading-relaxed'>
                To become the most trusted partner for professional development,
                recognized for our innovative approach, exceptional quality, and
                commitment to creating lasting impact in the lives of our
                clients and their organizations.
              </p>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-premium-blue mr-3' />
                  <span className='text-gray-300 font-open-sans'>
                    Global training standards
                  </span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-premium-blue mr-3' />
                  <span className='text-gray-300 font-open-sans'>
                    Technology-driven solutions
                  </span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='h-5 w-5 text-premium-blue mr-3' />
                  <span className='text-gray-300 font-open-sans'>
                    Sustainable growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className='py-24 bg-gradient-dark relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Target className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>What We Do</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Comprehensive Training Solutions
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto font-open-sans'>
              We provide end-to-end training solutions designed to meet the
              unique needs of modern businesses and professionals.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                <Users className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Soft Skills Training
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Enhance communication, leadership, and interpersonal skills
                through our comprehensive soft skills development programs.
              </p>
            </div>

            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                <TrendingUp className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Corporate Training
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Tailored corporate training programs that boost productivity,
                improve team performance, and drive organizational success.
              </p>
            </div>

            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-2xl mb-6 glow-indigo group-hover:glow-indigo-hover transition-all duration-300'>
                <Award className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Mentorship Programs
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                One-on-one mentorship and career guidance to help professionals
                navigate their career paths and achieve their goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className='py-24 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Globe className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Approach</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              How We Deliver Results
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Our proven methodology ensures maximum impact and lasting change
              for all our training interventions.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center animate-fade-in'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 mx-auto glow-premium'>
                <span className='text-2xl font-bold text-white'>1</span>
              </div>
              <h3 className='text-xl font-semibold mb-4 text-white'>
                Assessment
              </h3>
              <p className='text-gray-300 font-open-sans'>
                We begin by understanding your specific needs and objectives
              </p>
            </div>

            <div className='text-center animate-fade-in'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-full mb-6 mx-auto glow-cyan'>
                <span className='text-2xl font-bold text-white'>2</span>
              </div>
              <h3 className='text-xl font-semibold mb-4 text-white'>
                Customization
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Tailored programs designed for your unique requirements
              </p>
            </div>

            <div className='text-center animate-fade-in'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-full mb-6 mx-auto glow-indigo'>
                <span className='text-2xl font-bold text-white'>3</span>
              </div>
              <h3 className='text-xl font-semibold mb-4 text-white'>
                Delivery
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Expert-led training with interactive and engaging sessions
              </p>
            </div>

            <div className='text-center animate-fade-in'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 mx-auto glow-premium'>
                <span className='text-2xl font-bold text-white'>4</span>
              </div>
              <h3 className='text-xl font-semibold mb-4 text-white'>Support</h3>
              <p className='text-gray-300 font-open-sans'>
                Ongoing support and follow-up to ensure lasting impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Awards */}
      <section className='py-24 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Award className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Achievements</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Experience & Recognition
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto font-open-sans'>
              With over 3+ years of experience and 1000+ satisfied clients, we
              have established ourselves as a trusted partner in professional
              development.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                <TrendingUp className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                3+ Years Experience
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Over three years of delivering high-impact training programs and
                transforming professionals across various industries.
              </p>
            </div>

            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                <Award className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Trainer&apos;s Impact Award 2025
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Recognized by Trainfluence 2025, Delhi for our exceptional
                contribution to the training and development industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='py-24 bg-gradient-dark relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Heart className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Why Choose Us</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              What Sets Us Apart
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Our commitment to excellence and proven track record make us the
              preferred choice for professional development.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='glass-premium p-6 rounded-2xl card-hover animate-fade-in'>
              <h3 className='text-xl font-semibold mb-3 text-white'>
                1000+ Happy Clients
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Successfully trained professionals across various industries
              </p>
            </div>

            <div className='glass-premium p-6 rounded-2xl card-hover animate-fade-in'>
              <h3 className='text-xl font-semibold mb-3 text-white'>
                95% Success Rate
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Proven track record of delivering measurable results
              </p>
            </div>

            <div className='glass-premium p-6 rounded-2xl card-hover animate-fade-in'>
              <h3 className='text-xl font-semibold mb-3 text-white'>
                Expert Trainers
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Industry professionals with years of experience
              </p>
            </div>

            <div className='glass-premium p-6 rounded-2xl card-hover animate-fade-in'>
              <h3 className='text-xl font-semibold mb-3 text-white'>
                Flexible Programs
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Customized solutions to fit your schedule and needs
              </p>
            </div>

            <div className='glass-premium p-6 rounded-2xl card-hover animate-fade-in'>
              <h3 className='text-xl font-semibold mb-3 text-white'>
                24/7 Support
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Round-the-clock assistance for all your queries
              </p>
            </div>

            <div className='glass-premium p-6 rounded-2xl card-hover animate-fade-in'>
              <h3 className='text-xl font-semibold mb-3 text-white'>
                Proven Methodology
              </h3>
              <p className='text-gray-300 font-open-sans'>
                Time-tested approaches that deliver consistent results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Companies */}
      <section className='py-24 bg-gradient-dark relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Users className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Clients</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Trusted by Leading Companies
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto font-open-sans'>
              We have successfully partnered with diverse organizations across
              various sectors, delivering exceptional training solutions.
            </p>
          </div>

          {/* Horizontal Scrolling Logos */}
          <div className='relative overflow-hidden py-8'>
            <div className='animate-scroll-horizontal'>
              {/* First set of logos */}
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/brainlurnconsultancy_logo - Neerja Dixit.jpeg'
                  alt='Brainlurn Consultancy'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/download - Neerja Dixit.jpeg'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/20240308173330 - Neerja Dixit.jpg'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/whsmith_india_logo - Neerja Dixit.jpeg'
                  alt='WH Smith India'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/download - Neerja Dixit.png'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/SU logo - Neerja Dixit.png'
                  alt='Sharda University'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/images - Neerja Dixit.jpeg'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/brainlurnconsultancy_logo - Neerja Dixit.jpeg'
                  alt='Brainlurn Consultancy'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/download - Neerja Dixit.jpeg'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/20240308173330 - Neerja Dixit.jpg'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/whsmith_india_logo - Neerja Dixit.jpeg'
                  alt='WH Smith India'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/download - Neerja Dixit.png'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/SU logo - Neerja Dixit.png'
                  alt='Sharda University'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
              <div className='logo-container glass-premium rounded-2xl'>
                <Image
                  src='/pastcompanies/images - Neerja Dixit.jpeg'
                  alt='Company Logo'
                  width={160}
                  height={100}
                  className='logo-image'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Numbers Section */}
      <section
        id='animated-numbers'
        className='py-12 sm:py-16 lg:py-24 bg-gradient-dark relative'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Sparkles className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Milestones</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              We&apos;ve Achieved
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              A journey of excellence, with each milestone a testament to our
              commitment to quality and innovation.
            </p>
          </div>

          <div className='grid md:grid-cols-4 gap-8'>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                <Users className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>1000+</h3>
              <p className='text-gray-300 font-open-sans'>Satisfied Clients</p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                <Award className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>95%</h3>
              <p className='text-gray-300 font-open-sans'>Success Rate</p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-2xl mb-6 glow-indigo group-hover:glow-indigo-hover transition-all duration-300'>
                <Zap className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>7+</h3>
              <p className='text-gray-300 font-open-sans'>Years Experience</p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                <TrendingUp className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>7+</h3>
              <p className='text-gray-300 font-open-sans'>Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black text-white py-20 border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-12'>
            <div>
              <div className='flex items-center space-x-2 mb-6'>
                <Image
                  src='/logo_without_bg.png'
                  alt='SkillShift Logo'
                  width={120}
                  height={120}
                  className='w-32 h-32 object-contain'
                  style={{ maxWidth: "none", maxHeight: "none" }}
                />
              </div>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                We are India&apos;s premier training and development company,
                offering customized learning programs for businesses and
                organizations at all levels.
              </p>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-6 text-white'>About</h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors'
                  >
                    Our Programs
                  </a>
                </li>
                <li>
                  <a
                    href='/contact'
                    className='hover:text-premium-blue transition-colors'
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-6 text-white'>
                Programs
              </h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors'
                  >
                    Corporate Training
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors'
                  >
                    Institutional Training
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors'
                  >
                    Open Workshops
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-6 text-white'>
                Get in touch
              </h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li>+91 7027263146</li>
                <li>neerjaadixitt05@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className='divider-premium'></div>
          <div className='text-center text-gray-300 font-open-sans'>
            <p>Copyright 2024 © SkillShift | All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
