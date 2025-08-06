"use client";

import { ArrowRight, Phone, Mail, Sparkles, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
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
                        neerjaadixitt05@gmail.com
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
                  <Link
                    href='/contact'
                    className='hover:text-premium-blue transition-colors'
                  >
                    Contact Us
                  </Link>
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
