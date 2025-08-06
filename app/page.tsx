"use client";

import {
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Award,
  Sparkles,
  Star,
  Zap,
  Play,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Animated Number Component
const AnimatedNumber = ({
  end,
  duration = 2000,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("animated-numbers");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <span className='number-display'>
      {count}
      {suffix}
    </span>
  );
};

export default function Home() {
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
                  className='w-26 h-26 object-contain'
                  style={{ maxWidth: "none", maxHeight: "none" }}
                />
              </div>
            </div>
            <div className='hidden md:flex items-center space-x-8'>
              <Link
                href='#home'
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium animate-fade-in group'
              >
                <span className='relative'>
                  Home
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full'></span>
                </span>
              </Link>

              <Link
                href='/about'
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium animate-fade-in group'
              >
                <span className='relative'>
                  About
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full'></span>
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
                  href='#home'
                  className='text-white hover:text-premium-blue transition-all duration-300 font-medium text-2xl'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href='/about'
                  className='text-white hover:text-premium-blue transition-all duration-300 font-medium text-2xl'
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
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id='home'
        className='relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full'>
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
            {/* Text Content */}
            <div className='text-center lg:text-left animate-slide-up mt-8 lg:mt-16'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
                Transform
                <br />
                <span className='text-blue-400 drop-shadow-2xl'>Potential</span>
              </h1>
              <p className='text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 font-open-sans leading-relaxed'>
                SkillShift provides a one-stop solution for all types of
                behavioural skills challenges. Be it confidence, public
                speaking, or communication skills, we help you with a 360-degree
                transformation.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start'>
                <a href='/contact' className='inline-block'>
                  <button className='w-full sm:w-auto bg-gradient-primary text-white px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold hover:glow-premium-hover transition-all duration-300 flex items-center justify-center btn-animate group'>
                    <span className='flex items-center'>
                      Start Your Journey
                      <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                    </span>
                  </button>
                </a>
                <button className='w-full sm:w-auto glass-premium border-2 border-blue-400 text-blue-400 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 btn-animate group'>
                  <span className='flex items-center justify-center'>
                    <Play className='mr-2 h-4 w-4' />
                    Watch Demo
                  </span>
                </button>
              </div>
            </div>

            {/* Hero Image - Hidden on mobile */}
            <div className='hidden lg:flex justify-center lg:justify-end animate-fade-in'>
              <Image
                src='/hero_image.png'
                alt='3D Hero Component'
                width={600}
                height={600}
                className='w-full max-w-lg lg:max-w-xl h-auto object-contain'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className='py-12 sm:py-16 lg:py-24 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Target className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Focus</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Target Audience
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              We work with diverse organizations and individuals to provide
              comprehensive training solutions tailored to your needs.
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                <Target className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                High School Students
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Building confidence and communication skills early in their
                academic journey.
              </p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                <Users className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Recent College Graduates
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Supporting fresh graduates transitioning from college to
                professional life.
              </p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-2xl mb-6 glow-indigo group-hover:glow-indigo-hover transition-all duration-300'>
                <TrendingUp className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Working Professionals & Corporates
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Enhancing team performance through targeted soft skills training
                and leadership development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Awards */}
      <section className='py-12 sm:py-16 lg:py-24 bg-gradient-dark relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Award className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Achievements</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Experience & Recognition
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
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

      {/* Client Companies */}
      <section className='py-12 sm:py-16 lg:py-24 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Users className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Clients</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Trusted by Leading Companies
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
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
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                <AnimatedNumber end={1000} />+
              </h3>
              <p className='text-gray-300 font-open-sans'>Satisfied Clients</p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                <Award className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                <AnimatedNumber end={95} />%
              </h3>
              <p className='text-gray-300 font-open-sans'>Success Rate</p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-2xl mb-6 glow-indigo group-hover:glow-indigo-hover transition-all duration-300'>
                <Zap className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                <AnimatedNumber end={24} />
                /7
              </h3>
              <p className='text-gray-300 font-open-sans'>Support Hours</p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                <TrendingUp className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                <AnimatedNumber end={3} />+
              </h3>
              <p className='text-gray-300 font-open-sans'>Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Webinars Event */}
      <section className='py-12 sm:py-16 lg:py-24 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Play className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Events</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Past Webinars & Events
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Take a look at some of our successful webinars and training events
              that have transformed countless professionals.
            </p>
          </div>

          {/* Horizontal Scrolling Event Images */}
          <div className='relative overflow-hidden py-8'>
            <div className='animate-scroll-horizontal-slow'>
              {/* First set of event images */}
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.19.57_b3cb4a30 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.30.19_e2ab0961 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_374ee99a - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_4611de48 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.35_3263b244 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0012 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0009 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250728-WA0009 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.19.57_b3cb4a30 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.30.19_e2ab0961 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_374ee99a - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_4611de48 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.35_3263b244 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0012 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0009 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250728-WA0009 - Neerja Dixit.jpg'
                  alt='Webinar Event'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-12 sm:py-16 lg:py-24 bg-gradient-dark relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Star className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Why Choose Us</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>Our Features</h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Comprehensive solutions including mentorship and HR services with
              proven results
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                <Award className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Mentorship
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Personalized guidance and support for professional growth with
                one-on-one coaching sessions
              </p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                <Users className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                HR Services
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Comprehensive human resources solutions for businesses of all
                sizes with expert consultation
              </p>
            </div>
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-2xl mb-6 glow-indigo group-hover:glow-indigo-hover transition-all duration-300'>
                <TrendingUp className='h-8 w-8 text-white' />
              </div>
              <h3 className='text-2xl font-semibold mb-4 text-white'>
                Training Programs
              </h3>
              <p className='text-gray-300 font-open-sans leading-relaxed'>
                Customized training interventions for measurable results with
                continuous improvement tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-gradient-dark'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Star className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Client Feedback</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              What Our Clients Say
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Hear from professionals who have transformed their skills and
              careers through our training programs.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Testimonial 1 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Satyendra.jpeg.jpg'
                  alt='Satyendra Pratap Singh'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Satyendra Pratap Singh</h4>
                  <p className='testimonial-company'>Trainee at PowerGrid</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;The training session was incredibly engaging and
                informative. Mam&apos;s expertise and real-world examples made
                the content relatable and applicable to our needs in our
                organization.&quot;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Akshat.jpeg.jpg'
                  alt='Akshat Gupta'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Akshat Gupta</h4>
                  <p className='testimonial-company'>Trainee at PowerGrid</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;Mam&apos;s ability to connect with our team and tailor the
                training to our specific challenges was impressive. We saw great
                improvement in our communication and collaboration skills.&quot;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Sudhir.jpeg.jpg'
                  alt='Sudhir Barala'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Sudhir Barala</h4>
                  <p className='testimonial-company'>Trainee at PowerGrid</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;The training was interactive, fun, and full of valuable
                insights. Mam&apos;s passion and energy were contagious, and we
                left feeling motivated and confident.&quot;
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Durgesh.jpeg.jpg'
                  alt='Durgesh Mishra'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Durgesh Mishra</h4>
                  <p className='testimonial-company'>Trainee at PowerGrid</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;Mam&apos;s expertise and guidance helped us bridge my
                skills gap. The training was well planned and executed; mam took
                feedback from everyone at the end of her session.&quot;
              </p>
            </div>

            {/* Testimonial 5 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Sonali.jpeg.jpg'
                  alt='Sonali Narula'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Sonali Narula</h4>
                  <p className='testimonial-company'>Student</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;I would like to express my gratitude towards Ms. Neerja
                Dixit for helping me throughout my journey of learning
                communication and other soft skills. Previously I was so
                underconfident but after taking sessions from her i can see a
                lot of improvement in myself.&quot;
              </p>
            </div>

            {/* Testimonial 6 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/BHarti.jpg'
                  alt='Bharti'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Bharti</h4>
                  <p className='testimonial-company'>Student</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;I had a wonderful full interaction with you. My ability to
                communicate has improved greatly as a result of the classes.
                These classes also helped me in developing a different
                perspective about different situations in life.&quot;
              </p>
            </div>

            {/* Testimonial 7 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Ruchika.jpeg.jpg'
                  alt='Ruchika'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Ruchika</h4>
                  <p className='testimonial-company'>Student</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;As a mentor, she is amazing, and the interactive sessions
                made learning fun and engaging. I gained confidence and got to
                know the areas I was weak at and also the strategy to work on
                them.&quot;
              </p>
            </div>

            {/* Testimonial 8 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Prathna.jpeg.jpg'
                  alt='Prathna Dhankar'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Prathna Dhankar</h4>
                  <p className='testimonial-company'>Student</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;Thank you for helping me shape my personality. I found
                these classes useful for my personal and professional life. My
                communication skills have been much better after skill shift
                classes.&quot;
              </p>
            </div>

            {/* Testimonial 9 */}
            <div className='testimonial-card'>
              <div className='flex items-center mb-4'>
                <Image
                  src='/testiomonial/Priya.jpeg.jpg'
                  alt='Priya Rao'
                  width={80}
                  height={80}
                  className='testimonial-image'
                />
                <div className='ml-4'>
                  <h4 className='testimonial-author'>Priya Rao</h4>
                  <p className='testimonial-company'>Student</p>
                </div>
              </div>
              <p className='testimonial-quote'>
                &quot;A heartfelt gratitude to Ms Neerja Dixit as she has not
                just helped me to improve my communication but also my soft
                skills. With this my confidence, the ability to think, the power
                to imagine and public speaking has also improved a lot.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black text-white py-20 border-t border-white/10 select-text'>
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
              <p className='text-gray-300 font-open-sans leading-relaxed select-text'>
                We are India&apos;s premier training and development company,
                offering customized learning programs for businesses and
                organizations at all levels.
              </p>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-6 text-white select-text'>
                About
              </h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li className='select-text'>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors select-text'
                  >
                    Our Programs
                  </a>
                </li>
                <li className='select-text'>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors select-text'
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-6 text-white select-text'>
                Programs
              </h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li className='select-text'>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors select-text'
                  >
                    Corporate Training
                  </a>
                </li>
                <li className='select-text'>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors select-text'
                  >
                    Institutional Training
                  </a>
                </li>
                <li className='select-text'>
                  <a
                    href='#'
                    className='hover:text-premium-blue transition-colors select-text'
                  >
                    Open Workshops
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='text-xl font-semibold mb-6 text-white select-text'>
                Get in touch
              </h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li className='select-text'>+91 7027263146</li>
                <li className='select-text'>neerjaadixitt05@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className='divider-premium'></div>
          <div className='text-center text-gray-300 font-open-sans'>
            <p className='select-text'>
              Copyright 2024 © SkillShift | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
