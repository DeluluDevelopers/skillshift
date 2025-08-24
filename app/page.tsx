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
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Optimized Video Component with lazy loading
const OptimizedVideo = dynamic(
  () =>
    Promise.resolve(
      ({
        src,
        className,
        style,
      }: {
        src: string;
        className: string;
        style: React.CSSProperties;
      }) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const [isInView, setIsInView] = useState(false);
        const [isLoaded, setIsLoaded] = useState(false);
        const [isAudioPlaying, setIsAudioPlaying] = useState(false);

        useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              setIsInView(entry.isIntersecting);

              // Enhanced visibility control with pause/play functionality
              if (videoRef.current) {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                  // Only play if more than 50% of video is visible
                  videoRef.current.play().catch(() => {
                    // Handle autoplay policy restrictions
                  });
                } else {
                  // Pause when scrolled away or less than 50% visible
                  videoRef.current.pause();
                }
              }

              // Disconnect observer after first intersection for loading optimization
              if (entry.isIntersecting && !isLoaded) {
                // Keep observing until loaded, then continue for pause/play control
              }
            },
            {
              threshold: [0.1, 0.5, 0.9],
              rootMargin: "0px 0px -50px 0px", // Trigger when video is about to leave viewport
            }
          );

          if (videoRef.current) {
            observer.observe(videoRef.current);
          }

          return () => observer.disconnect();
        }, [isLoaded]);

        const handleLoadedData = () => {
          setIsLoaded(true);
          // Only play if the video is currently in view
          if (videoRef.current && isInView) {
            videoRef.current.play().catch(() => {
              // Autoplay failed, which is fine
            });
          }
        };

        // Handle page visibility changes (tab switching, minimizing)
        useEffect(() => {
          const handleVisibilityChange = () => {
            if (videoRef.current) {
              if (document.hidden) {
                videoRef.current.pause();
              } else if (isInView && isLoaded) {
                videoRef.current.play().catch(() => {
                  // Handle autoplay restrictions
                });
              }
            }
          };

          document.addEventListener("visibilitychange", handleVisibilityChange);

          return () => {
            document.removeEventListener(
              "visibilitychange",
              handleVisibilityChange
            );
          };
        }, [isInView, isLoaded]);

        const toggleAudio = () => {
          if (videoRef.current) {
            if (isAudioPlaying) {
              videoRef.current.muted = true;
              setIsAudioPlaying(false);
            } else {
              videoRef.current.muted = false;
              setIsAudioPlaying(true);
            }
          }
        };

        return (
          <div className='relative'>
            {!isLoaded && (
              <div className='absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-20'>
                {/* Main loading spinner */}
                <div className='relative mb-4'>
                  <div className='w-20 h-20 border-4 border-blue-400/30 rounded-full'></div>
                  <div className='absolute inset-0 w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin'></div>
                </div>

                {/* Loading text */}
                <div className='text-white text-lg font-semibold mb-2'>
                  Loading Video
                </div>
                <div className='text-blue-400 text-sm opacity-80'>
                  Please wait...
                </div>

                {/* Animated dots */}
                <div className='flex space-x-1 mt-3'>
                  <div className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'></div>
                  <div
                    className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>

                {/* Shimmer effect */}
                <div className='absolute inset-0 rounded-3xl overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer'></div>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              className={className}
              style={style}
              autoPlay
              loop
              muted
              playsInline
              preload={isInView ? "metadata" : "none"}
              onLoadedData={handleLoadedData}
              onClick={(e) => e.stopPropagation()} // Prevent video clicks from bubbling up
              poster='/landing_image.png' // Fallback poster
            >
              {isInView && (
                <>
                  <source src={src} type='video/mp4' />
                  <source
                    src={src.replace(".mp4", ".webm")}
                    type='video/webm'
                  />
                </>
              )}
              Your browser does not support the video tag.
            </video>

            {/* Audio Control Button */}
            {isLoaded && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling to parent container
                  toggleAudio();
                }}
                className='absolute bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-10'
                title={isAudioPlaying ? "Mute Audio" : "Play Audio"}
              >
                {isAudioPlaying ? (
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.782L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.782A1 1 0 019.383 3.076zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.782L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.782A1 1 0 019.383 3.076zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        );
      }
    ),
  { ssr: false }
);

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
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = elementRef.current;
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
    <span ref={elementRef} className='number-display'>
      {count}
      {suffix}
    </span>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileVideoExpanded, setIsMobileVideoExpanded] = useState(false);

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

  // Handle body scroll when mobile video is expanded
  useEffect(() => {
    if (isMobileVideoExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileVideoExpanded]);

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
                href='/programs'
                className='text-white hover:text-premium-blue transition-all duration-300 font-medium animate-fade-in group'
              >
                <span className='relative'>
                  Programs
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
          {isMobileMenuOpen && (
            <div className='md:hidden fixed inset-0 bg-black/95 backdrop-blur-[25px] z-[99999] flex items-center justify-center'>
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
                  href='/programs'
                  className='text-white hover:text-premium-blue transition-all duration-300 font-medium text-2xl'
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
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id='home'
        className='relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-20 lg:py-0'
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
                <a
                  href='/contact'
                  className='inline-block w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0'
                >
                  <button className='w-full sm:w-auto glass-premium border-2 border-blue-400 text-blue-400 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 btn-animate group btn-mobile-responsive mobile-touch-target'>
                    <span className='flex items-center justify-center'>
                      Start Your Journey
                      <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                    </span>
                  </button>
                </a>
              </div>
            </div>

            {/* Hero Video - Now visible on mobile with click to expand */}
            <div className='flex justify-center lg:justify-end animate-fade-in mt-8 lg:mt-0'>
              <div className='relative w-full max-w-md lg:max-w-none'>
                {/* Video Container - Always visible, click to expand */}
                <div className='block'>
                  {/* Mobile Fullscreen Toggle */}
                  <div className='lg:hidden mb-2 flex justify-between items-center'>
                    <span className='text-white text-sm opacity-80'>
                      Demo Video
                    </span>
                    <span className='text-blue-400 text-xs opacity-60'>
                      Tap to expand
                    </span>
                  </div>

                  {/* Main video container with modern styling */}
                  <div
                    className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 p-1 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                      isMobileVideoExpanded
                        ? "video-expanded-mobile"
                        : "relative hover:scale-[1.02]"
                    }`}
                    onClick={() =>
                      setIsMobileVideoExpanded(!isMobileVideoExpanded)
                    }
                  >
                    {/* Inner glow effect */}
                    <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 blur-md'></div>

                    {/* Video element */}
                    <div
                      className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                        isMobileVideoExpanded
                          ? "w-full h-full max-w-4xl max-h-[80vh] mx-auto"
                          : ""
                      }`}
                    >
                      <OptimizedVideo
                        src='/landing-video_xfr8Cbpu.mp4'
                        className={`w-full h-auto object-cover transition-all duration-500 ${
                          isMobileVideoExpanded
                            ? "max-w-4xl max-h-[80vh]"
                            : "max-w-lg lg:max-w-xl"
                        }`}
                        style={{
                          aspectRatio: "16/9",
                          filter:
                            "brightness(1.1) contrast(1.05) saturate(1.1)",
                        }}
                      />

                      {/* Video overlay gradient */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none'></div>
                    </div>

                    {/* Corner accent elements */}
                    <div className='absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse lg:block'></div>
                    <div className='absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-1000 lg:block'></div>
                  </div>

                  {/* Floating background elements */}
                  <div className='absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse hidden lg:block'></div>
                  <div className='absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-xl animate-pulse delay-500 hidden lg:block'></div>
                </div>
              </div>
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
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              We work with diverse organizations and individuals to provide
              comprehensive training solutions tailored to your needs.
            </p>
          </div>

          {/* B2C Section */}
          <div className='mb-16'>
            <div className='text-center mb-12'>
              <div className='inline-flex items-center space-x-2 bg-gradient-primary px-6 py-3 rounded-full mb-4'>
                <Users className='h-5 w-5 text-white' />
                <span className='text-white font-medium'>
                  B2C - Individual Training
                </span>
              </div>
              <h3 className='text-3xl font-bold text-white mb-4'>
                Personal Development
              </h3>
              <p className='text-gray-300 max-w-2xl mx-auto font-open-sans'>
                Empowering individuals with essential skills for personal and
                professional growth.
              </p>
            </div>
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
                <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                  <Target className='h-8 w-8 text-white' />
                </div>
                <h4 className='text-2xl font-semibold mb-4 text-white'>
                  High School Students
                </h4>
                <p className='text-gray-300 font-open-sans leading-relaxed'>
                  Building confidence and communication skills early in their
                  academic journey for future success.
                </p>
              </div>
              <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
                <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                  <Users className='h-8 w-8 text-white' />
                </div>
                <h4 className='text-2xl font-semibold mb-4 text-white'>
                  Recent Graduates
                </h4>
                <p className='text-gray-300 font-open-sans leading-relaxed'>
                  Supporting fresh graduates transitioning from college to
                  professional life with industry-ready skills.
                </p>
              </div>
              <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
                <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-2xl mb-6 glow-indigo group-hover:glow-indigo-hover transition-all duration-300'>
                  <TrendingUp className='h-8 w-8 text-white' />
                </div>
                <h4 className='text-2xl font-semibold mb-4 text-white'>
                  Working Professionals
                </h4>
                <p className='text-gray-300 font-open-sans leading-relaxed'>
                  Enhancing career prospects through advanced soft skills and
                  leadership development programs.
                </p>
              </div>
            </div>
          </div>

          {/* B2B Section */}
          <div>
            <div className='text-center mb-12'>
              <div className='inline-flex items-center space-x-2 bg-gradient-cyan px-6 py-3 rounded-full mb-4'>
                <Award className='h-5 w-5 text-white' />
                <span className='text-white font-medium'>
                  B2B - Organizational Training
                </span>
              </div>
              <h3 className='text-3xl font-bold text-white mb-4'>
                Enterprise Solutions
              </h3>
              <p className='text-gray-300 max-w-2xl mx-auto font-open-sans'>
                Comprehensive training solutions for organizations to enhance
                team performance and productivity.
              </p>
            </div>
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
                <div className='flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 glow-premium group-hover:glow-premium-hover transition-all duration-300'>
                  <Award className='h-8 w-8 text-white' />
                </div>
                <h4 className='text-2xl font-semibold mb-4 text-white'>
                  Corporate Organizations
                </h4>
                <p className='text-gray-300 font-open-sans leading-relaxed'>
                  Customized training programs for businesses to improve team
                  collaboration, leadership, and communication effectiveness.
                </p>
              </div>
              <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
                <div className='flex items-center justify-center w-16 h-16 bg-gradient-cyan rounded-2xl mb-6 glow-cyan group-hover:glow-cyan-hover transition-all duration-300'>
                  <Users className='h-8 w-8 text-white' />
                </div>
                <h4 className='text-2xl font-semibold mb-4 text-white'>
                  Schools & Institutes
                </h4>
                <p className='text-gray-300 font-open-sans leading-relaxed'>
                  Educational institution partnerships to develop students&apos;
                  soft skills and prepare them for future challenges.
                </p>
              </div>
              <div className='glass-premium p-8 rounded-2xl card-hover animate-fade-in group'>
                <div className='flex items-center justify-center w-16 h-16 bg-gradient-indigo rounded-2xl mb-6 glow-indigo group-hover:glow-indigo-hover transition-all duration-300'>
                  <Sparkles className='h-8 w-8 text-white' />
                </div>
                <h4 className='text-2xl font-semibold mb-4 text-white'>
                  Government Agencies
                </h4>
                <p className='text-gray-300 font-open-sans leading-relaxed'>
                  Specialized training programs for public sector organizations
                  to enhance service delivery and professional excellence.
                </p>
              </div>
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
      {/* <section className='py-12 sm:py-16 lg:py-24 relative'>
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

          <div className='relative overflow-hidden py-8'>
            <div className='animate-scroll-horizontal'>
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
      </section> */}

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

      {/* Snippets from Our Past Experience */}
      <section className='py-12 sm:py-16 lg:py-24 relative'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20 animate-slide-up'>
            <div className='inline-flex items-center space-x-2 bg-glass-premium px-6 py-3 rounded-full mb-6'>
              <Play className='h-5 w-5 text-premium-blue' />
              <span className='text-white font-medium'>Our Journey</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              Snippets from Our Training Room
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Moments from our training sessions, workshops, and professional
              development programs that showcase our commitment to transforming
              lives and careers.
            </p>
          </div>

          {/* Horizontal Scrolling Experience Images */}
          <div className='relative overflow-hidden py-8'>
            <div className='animate-scroll-horizontal-slow'>
              {/* First set of experience images */}
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.19.57_b3cb4a30 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.30.19_e2ab0961 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_374ee99a - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_4611de48 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.35_3263b244 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0012 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0009 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250728-WA0009 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>

              {/* Duplicate set for seamless loop */}
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.19.57_b3cb4a30 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-15 at 11.30.19_e2ab0961 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_374ee99a - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.36_4611de48 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/WhatsApp Image 2025-07-14 at 16.29.35_3263b244 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0012 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250731-WA0009 - Neerja Dixit.jpg'
                  alt='Training Experience'
                  width={400}
                  height={300}
                  className='webinar-image'
                />
              </div>
              <div className='webinar-container'>
                <Image
                  src='/pastwebinarsevent/IMG-20250728-WA0009 - Neerja Dixit.jpg'
                  alt='Training Experience'
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
            <h2 className='text-5xl font-bold text-white mb-8'>Our Services</h2>
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
                Comprehensive human resources solutions for new businesses with
                expert consultation
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
              <span className='text-white font-medium'>Learner Feedback</span>
            </div>
            <h2 className='text-5xl font-bold text-white mb-8'>
              What Our Learners Say
            </h2>
            <p className='text-lg text-gray-300 max-w-3xl mx-auto font-open-sans'>
              Hear from learners who have transformed their skills and careers
              through our training programs.
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
                  <p className='testimonial-company'>Learner at PowerGrid</p>
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
                  <p className='testimonial-company'>Learner at PowerGrid</p>
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
                  <p className='testimonial-company'>Learner at PowerGrid</p>
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
                  <p className='testimonial-company'>Learner at PowerGrid</p>
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
              Copyright 2024 © SkillShift | All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
