"use client";

import { ArrowRight, Sparkles, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Programs() {
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

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  return (
    <div className='min-h-screen bg-gradient-dark font-montserrat'>
      {/* Animated Background Elements */}
      <div className='fixed inset-0 bg-pattern opacity-30'></div>
      <div className='absolute top-20 left-10 w-72 h-72 bg-premium-blue/10 rounded-full blur-3xl floating'></div>
      <div className='absolute top-40 right-20 w-96 h-96 bg-premium-cyan/10 rounded-full blur-3xl floating-delayed'></div>
      <div className='absolute bottom-20 left-1/4 w-80 h-80 bg-premium-indigo/10 rounded-full blur-3xl floating-slow'></div>

      {/* Navigation */}
      <nav
        className={`md:fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out ${
          isScrolled
            ? "md:bg-[rgba(59,130,246,0.05)] md:backdrop-blur-[25px] md:shadow-lg md:mt-4 md:mx-4 md:rounded-2xl"
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
                  className='w-24 h-24 object-contain'
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
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium animate-fade-in group'
              >
                <span className='relative'>
                  About
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full'></span>
                </span>
              </Link>
              <Link
                href='/programs'
                className='text-premium-blue font-medium animate-fade-in group'
              >
                <span className='relative'>
                  Programs
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
            <div className='md:hidden relative z-[100001]'>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='text-white hover:text-premium-blue transition-colors p-2'
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
          <div className='md:hidden fixed inset-0 bg-black/95 backdrop-blur-[25px] z-[99999] flex items-center justify-center'>
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
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium text-2xl'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href='/programs'
                className='text-premium-blue font-medium text-2xl'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Programs
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

      {/* Programs Header Section */}
      <section className='py-24 sm:py-32 relative overflow-hidden'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='text-center mb-16 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Sparkles className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>
                Transform Your Skills
              </span>
            </div>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-8'>
              Our <span className='text-gradient-premium'>Programs</span>
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Comprehensive learning experiences designed to help you develop
              the skills and mindset needed to thrive in your personal and
              professional life.
            </p>
          </div>
        </div>
      </section>

      {/* Program Cards Section */}
      <section className='pb-24 relative overflow-hidden'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
            {/* Program 1 */}
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <h2 className='text-3xl font-bold text-premium-blue mb-4'>
                Leadshift – Leadership Development
              </h2>
              <p className='text-lg text-gray-300 mb-6 font-open-sans'>
                Transform from a manager to an inspiring leader. Learn to
                influence, motivate, and drive results with confidence.
              </p>
              <div className='space-y-4 mb-8'>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-primary rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Develop strategic thinking and decision-making abilities
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-primary rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Learn effective delegation and team management techniques
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-primary rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Master conflict resolution and problem-solving skills
                  </p>
                </div>
              </div>
              <Link
                href='/contact?program=Leadshift – Leadership Development'
                className='inline-block'
              >
                <button className='bg-gradient-primary text-white py-3 px-6 rounded-xl font-semibold hover:glow-premium-hover transition-all duration-300 text-base btn-animate group'>
                  <span className='flex items-center'>
                    Enroll Now
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                </button>
              </Link>
            </div>

            {/* Program 2 */}
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <h2 className='text-3xl font-bold text-premium-blue mb-4'>
                Speak with Intent
              </h2>
              <p className='text-lg text-gray-300 mb-6 font-open-sans'>
                Upgrade your communication skills & presentation skills to
                express clearly, listen actively, and make a lasting impact in
                any conversation.
              </p>
              <div className='space-y-4 mb-8'>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-cyan rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Overcome public speaking anxiety and build confidence
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-cyan rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Learn persuasive communication techniques
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-cyan rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Develop active listening skills and emotional intelligence
                  </p>
                </div>
              </div>
              <Link
                href='/contact?program=Speak with Intent'
                className='inline-block'
              >
                <button className='bg-gradient-cyan text-white py-3 px-6 rounded-xl font-semibold hover:glow-cyan-hover transition-all duration-300 text-base btn-animate group'>
                  <span className='flex items-center'>
                    Enroll Now
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                </button>
              </Link>
            </div>

            {/* Program 3 */}
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <h2 className='text-3xl font-bold text-premium-blue mb-4'>
                Campus to Corporate Shift
              </h2>
              <p className='text-lg text-gray-300 mb-6 font-open-sans'>
                Learn a bundle of professional skills that you need to shine in
                your corporate career.
              </p>
              <div className='space-y-4 mb-8'>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-indigo rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Business etiquette and professional communication
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-indigo rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Time management and productivity techniques
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-indigo rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Resume building and interview preparation
                  </p>
                </div>
              </div>
              <Link
                href='/contact?program=Campus to Corporate Shift'
                className='inline-block'
              >
                <button className='bg-gradient-indigo text-white py-3 px-6 rounded-xl font-semibold hover:glow-indigo-hover transition-all duration-300 text-base btn-animate group'>
                  <span className='flex items-center'>
                    Enroll Now
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                </button>
              </Link>
            </div>

            {/* Program 4 */}
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
              <h2 className='text-3xl font-bold text-premium-blue mb-4'>
                Career Acceleration
              </h2>
              <p className='text-lg text-gray-300 mb-6 font-open-sans'>
                Learn how to develop a career path in alignment to your
                strengths, understand the power of personal branding and join a
                community of like-minded individuals.
              </p>
              <div className='space-y-4 mb-8'>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-primary rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Personal branding and networking strategies
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-primary rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Career planning and goal setting frameworks
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-primary rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Negotiation skills and professional advancement tactics
                  </p>
                </div>
              </div>
              <Link
                href='/contact?program=Career Acceleration'
                className='inline-block'
              >
                <button className='bg-gradient-primary text-white py-3 px-6 rounded-xl font-semibold hover:glow-premium-hover transition-all duration-300 text-base btn-animate group'>
                  <span className='flex items-center'>
                    Enroll Now
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                </button>
              </Link>
            </div>

            {/* Program 5 */}
            <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group lg:col-span-2'>
              <h2 className='text-3xl font-bold text-premium-blue mb-4'>
                Women in Leadership
              </h2>
              <p className='text-lg text-gray-300 mb-6 font-open-sans'>
                Specialized program for women who want to own leadership roles,
                become the CEO of their lives and polish their confidence.
              </p>
              <div className='grid md:grid-cols-2 gap-4 mb-8'>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-cyan rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Building resilience and overcoming gender-based challenges
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-cyan rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Executive presence and confident communication
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-cyan rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Work-life integration strategies
                  </p>
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center justify-center w-6 h-6 bg-gradient-cyan rounded-full mr-3 mt-1 flex-shrink-0'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                  <p className='text-gray-300 font-open-sans'>
                    Networking and mentorship for career advancement
                  </p>
                </div>
              </div>
              <Link
                href='/contact?program=Women in Leadership'
                className='inline-block'
              >
                <button className='bg-gradient-cyan text-white py-3 px-6 rounded-xl font-semibold hover:glow-cyan-hover transition-all duration-300 text-base btn-animate group'>
                  <span className='flex items-center'>
                    Enroll Now
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-16 sm:py-20 bg-gradient-to-r from-premium-blue/10 to-premium-cyan/10'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            Ready to Transform Your Skills?
          </h2>
          <p className='text-xl text-gray-300 mb-10 max-w-3xl mx-auto'>
            Take the first step towards personal and professional growth. Our
            expert trainers are ready to guide you on your journey.
          </p>
          <Link href='/contact'>
            <button className='bg-gradient-primary text-white py-4 px-8 rounded-xl font-semibold text-lg hover:glow-premium-hover transition-all duration-300 btn-animate group'>
              <span className='flex items-center'>
                Book Your Program Now
                <ArrowRight className='ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform' />
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className='relative bg-black text-white py-16 border-t border-white/10 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12'>
            <div className='text-center md:text-left space-y-6'>
              <div className='flex items-center justify-center md:justify-start mb-4'>
                <Image
                  src='/logo_without_bg.png'
                  alt='SkillShift Logo'
                  width={120}
                  height={120}
                  className='w-24 h-24 object-contain'
                  style={{ maxWidth: "none", maxHeight: "none" }}
                />
              </div>
              <p className='text-gray-300 font-open-sans leading-relaxed max-w-sm mx-auto md:mx-0 text-sm'>
                We are India&apos;s premier training and development company,
                offering customized learning programs for businesses and
                organizations at all levels.
              </p>
            </div>

            <div className='text-center md:text-left space-y-4'>
              <h4 className='text-xl font-semibold text-white mb-6'>About</h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li>
                  <Link
                    href='/'
                    className='text-gray-300 hover:text-premium-blue transition-colors duration-300 font-medium text-sm block w-fit mx-auto md:mx-0'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-gray-300 hover:text-premium-blue transition-colors duration-300 font-medium text-sm block w-fit mx-auto md:mx-0'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/programs'
                    className='text-gray-300 hover:text-premium-blue transition-colors duration-300 font-medium text-sm block w-fit mx-auto md:mx-0'
                  >
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-gray-300 hover:text-premium-blue transition-colors duration-300 font-medium text-sm block w-fit mx-auto md:mx-0'
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className='text-center md:text-left space-y-4'>
              <h4 className='text-xl font-semibold text-white mb-6'>
                Get in touch
              </h4>
              <ul className='space-y-3 text-gray-300 font-open-sans'>
                <li className='flex items-center justify-center md:justify-start'>
                  <span className='text-sm'>+91 7027263146</span>
                </li>
                <li className='flex items-center justify-center md:justify-start'>
                  <span className='text-sm'>neerjadixit@skillshift.in</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6'></div>

          <div className='text-center'>
            <p className='text-gray-400 font-open-sans text-sm'>
              Copyright 2025 © SkillShift | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
