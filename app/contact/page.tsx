"use client";

import { ArrowRight, Phone, Mail, Sparkles, Menu, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface FormData {
  firstName: string;
  phone: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

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
                href='/contact'
                className='text-premium-blue font-medium animate-fade-in group'
              >
                <span className='relative'>
                  Contact
                  <span className='absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary'></span>
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

          {/* Mobile menu */}
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
                href='/contact'
                className='text-premium-blue font-medium text-2xl'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Contact Form Section */}
      <section className='py-12 sm:py-16 lg:py-24 relative overflow-hidden min-h-screen flex items-center'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full'>
          <div className='text-center mb-16 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Sparkles className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Get In Touch</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Ready to Start Your Journey?
            </h2>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Book your path to unparalleled growth and excitement as you embark
              on a journey of skill-building and discovery.
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
            {/* Contact Form */}
            <div className='animate-slide-up'>
              <h3 className='text-2xl font-semibold text-white mb-8'>
                Send us a message
              </h3>
              <form className='glass-premium p-8 rounded-2xl shadow-xl'>
                <div className='grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6'>
                  <div className='group'>
                    <label className='block text-sm font-semibold text-white mb-3 font-roboto group-hover:text-blue-200 transition-colors'>
                      First Name
                    </label>
                    <input
                      type='text'
                      className='w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white font-open-sans placeholder-gray-400 transition-all duration-300 hover:bg-white/20'
                      placeholder='Enter your first name'
                    />
                  </div>
                  <div className='group'>
                    <label className='block text-sm font-semibold text-white mb-3 font-roboto group-hover:text-blue-200 transition-colors'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      className='w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white font-open-sans placeholder-gray-400 transition-all duration-300 hover:bg-white/20'
                      placeholder='Enter your phone number'
                    />
                  </div>
                </div>
                <div className='mb-6 group'>
                  <label className='block text-sm font-semibold text-white mb-3 font-roboto group-hover:text-blue-200 transition-colors'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white font-open-sans placeholder-gray-400 transition-all duration-300 hover:bg-white/20'
                    placeholder='Enter your email address'
                  />
                </div>
                <div className='mb-6 group'>
                  <label className='block text-sm font-semibold text-white mb-3 font-roboto group-hover:text-blue-200 transition-colors'>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className='w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-white font-open-sans placeholder-gray-400 transition-all duration-300 hover:bg-white/20 resize-none'
                    placeholder='Tell us about your requirements...'
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-gradient-primary text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold hover:glow-premium-hover transition-all duration-300 text-base sm:text-lg btn-animate group'
                >
                  <span className='flex items-center justify-center'>
                    Submit Application
                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className='animate-slide-up'>
              <h3 className='text-2xl font-semibold text-white mb-8'>
                Contact Information
              </h3>
              <div className='space-y-6'>
                <div className='glass-premium p-6 rounded-2xl card-hover group'>
                  <div className='flex items-center'>
                    <div className='flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mr-4 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                      <Phone className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold text-white mb-1'>
                        WhatsApp
                      </h4>
                      <p className='text-gray-300 font-open-sans'>
                        +91 7027263146
                      </p>
                    </div>
                  </div>
                </div>

                <div className='glass-premium p-6 rounded-2xl card-hover group'>
                  <div className='flex items-center'>
                    <div className='flex items-center justify-center w-12 h-12 bg-gradient-cyan rounded-xl mr-4 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                      <Mail className='h-6 w-6 text-white' />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold text-white mb-1'>
                        Email
                      </h4>
                      <p className='text-gray-300 font-open-sans'>
                        neerjadixit@skillshift.in
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className='mt-8 glass-premium p-6 rounded-2xl'>
                <h4 className='text-lg font-semibold text-white mb-4'>
                  Connect With Us
                </h4>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-300 font-open-sans'>
                      LinkedIn
                    </span>
                    <a
                      href='https://www.linkedin.com/in/neerjadixit/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-premium-blue hover:text-blue-300 transition-colors'
                    >
                      @neerjadixit
                    </a>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-300 font-open-sans'>
                      Instagram
                    </span>
                    <a
                      href='https://www.instagram.com/skillshift__/?hl=en'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-premium-blue hover:text-blue-300 transition-colors'
                    >
                      @skillshift__
                    </a>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-300 font-open-sans'>
                      Location
                    </span>
                    <span className='text-gray-300 font-open-sans'>
                      Sector-52, Gurugram
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className='mt-8 glass-premium p-6 rounded-2xl'>
                <h4 className='text-lg font-semibold text-white mb-4'>
                  Why Choose SkillShift?
                </h4>
                <ul className='space-y-3 text-gray-300 font-open-sans'>
                  <li className='flex items-center'>
                    <div className='w-2 h-2 bg-premium-blue rounded-full mr-3'></div>
                    Personalized training solutions
                  </li>
                  <li className='flex items-center'>
                    <div className='w-2 h-2 bg-premium-blue rounded-full mr-3'></div>
                    Industry expert trainers
                  </li>
                  <li className='flex items-center'>
                    <div className='w-2 h-2 bg-premium-blue rounded-full mr-3'></div>
                    Flexible scheduling options
                  </li>
                  <li className='flex items-center'>
                    <div className='w-2 h-2 bg-premium-blue rounded-full mr-3'></div>
                    Comprehensive support
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
              Copyright 2024 © SkillShift | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
