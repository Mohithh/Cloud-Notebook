'use client';
import React, { useState, useEffect, useRef } from 'react';

const UltimateBirthdaySurprise = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState(3);
  const [isCounting, setIsCounting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Changed to true by default
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef(null);
  const countdownAudioRef = useRef(null); // Separate audio for countdown

  // Fixed positions for floating elements to avoid hydration errors
  const floatingElements = [
    { left: 10, top: 15, delay: 1, duration: 6, emoji: '🎈' },
    { left: 20, top: 60, delay: 2, duration: 5, emoji: '🎉' },
    { left: 30, top: 25, delay: 3, duration: 7, emoji: '⭐' },
    { left: 40, top: 70, delay: 0.5, duration: 6, emoji: '🎊' },
    { left: 50, top: 40, delay: 1.5, duration: 5, emoji: '💫' },
    { left: 60, top: 80, delay: 2.5, duration: 6, emoji: '✨' },
    { left: 70, top: 20, delay: 0.8, duration: 7, emoji: '🌟' },
    { left: 80, top: 55, delay: 3.2, duration: 5, emoji: '🎁' },
    { left: 90, top: 35, delay: 1.2, duration: 6, emoji: '🎈' },
    { left: 15, top: 75, delay: 2.8, duration: 5, emoji: '🎉' },
    { left: 25, top: 45, delay: 0.7, duration: 7, emoji: '⭐' },
    { left: 35, top: 85, delay: 3.5, duration: 6, emoji: '🎊' },
    { left: 45, top: 30, delay: 1.8, duration: 5, emoji: '💫' },
    { left: 55, top: 65, delay: 2.2, duration: 6, emoji: '✨' },
    { left: 65, top: 50, delay: 0.9, duration: 7, emoji: '🌟' },
    { left: 75, top: 90, delay: 3.8, duration: 5, emoji: '🎁' },
    { left: 85, top: 10, delay: 1.1, duration: 6, emoji: '🎈' },
    { left: 95, top: 60, delay: 2.9, duration: 5, emoji: '🎉' },
    { left: 5, top: 40, delay: 0.6, duration: 7, emoji: '⭐' },
    { left: 15, top: 25, delay: 3.1, duration: 6, emoji: '🎊' },
  ];

  // Direct photo paths from public folder
  const photos = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg', 
    'img6.jpg',
  ];

  const steps = [
    {
      title: "Shivangi 's Birthday Celebration! 🎉",
      description: "Ready for an unforgettable birthday experience? Click begin to start the magic!",
      buttonText: "Begin Celebration! 🚀",
      background: "from-indigo-600 via-purple-600 to-pink-600",
      emoji: "🎊",
      music: "happy-birthday-155461.mp3"
    },
    {
      title: "Shivangi 's Memory Lane 📸",
      description: "Cherished moments and beautiful memories of our amazing Shivangi ",
      buttonText: "Continue to Countdown →",
      background: "from-emerald-600 via-cyan-500 to-blue-600", 
      emoji: "📷",
      music: "happy-birthday-401919.mp3"
    },
    {
      title: "Countdown Begins! ⏰",
      description: "Get ready for Shivangi 's grand surprise! The excitement starts now...",
      buttonText: "Start Countdown! 🔥",
      background: "from-orange-600 via-red-500 to-rose-600",
      emoji: "⚡",
      music: "clock-ticking-60-second-countdown-118231.mp3" // Keep playing memories until countdown starts
    },
    {
      title: "HAPPY BIRTHDAY Shivangi ! 🎂",
      description: "The moment you've been waiting for!",
      buttonText: "Celebrate Again! 🔄",
      background: "from-yellow-500 via-orange-500 to-red-500",
      emoji: "🎂",
      music: "happy-birthday-254480.mp3"
    }
  ];

  // Set client-side flag to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Music control - FIXED
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (countdownAudioRef.current) {
          countdownAudioRef.current.pause();
        }
      } else {
        audioRef.current.play().catch(error => {
          console.log('Auto-play prevented, user interaction required');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playStepMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      const musicFile = steps[currentStep].music;
      if (musicFile) {
        audioRef.current.src = musicFile;
        audioRef.current.play().catch(error => {
          console.log('Auto-play prevented for step music');
        });
      }
    }
  };

  const startCountdown = () => {
    setIsCounting(true);
    setCount(3);
    
    // Play countdown sound
    if (isPlaying && countdownAudioRef.current) {
      countdownAudioRef.current.src = "clock-ticking-60-second-countdown-118231.mp3";
      countdownAudioRef.current.play().catch(error => {
        console.log('Countdown audio auto-play prevented');
      });
    }
    
    // Stop background music during countdown
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const restartJourney = () => {
    setCurrentStep(0);
    setIsCounting(false);
    setIsPlaying(true); // Reset to playing state
  };

  // Auto-play music when component mounts and when steps change
  useEffect(() => {
    if (isClient && !isCounting) {
      playStepMusic();
    }
  }, [currentStep, isClient, isCounting]);

  // Handle countdown
  useEffect(() => {
    if (isCounting && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isCounting && count === 0) {
      // Stop countdown audio and play celebration music
      if (countdownAudioRef.current) {
        countdownAudioRef.current.pause();
        countdownAudioRef.current.currentTime = 0;
      }
      
      setTimeout(() => {
        setIsCounting(false);
        nextStep();
        
        // Resume background music for celebration
        if (isPlaying && audioRef.current) {
          audioRef.current.src = "celebration.mp3";
          audioRef.current.play().catch(error => {
            console.log('Celebration audio auto-play prevented');
          });
        }
      }, 500);
    }
  }, [isCounting, count]);

  // Countdown screen
  if (isCounting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center relative overflow-hidden">
        {/* Countdown Audio */}
        <audio ref={countdownAudioRef} />
        
        <div className="text-center relative z-10">
          <div className="relative">
            <div className="text-9xl md:text-[200px] font-bold text-white animate-pulse">
              {count}
            </div>
            <div className="absolute inset-0 text-9xl md:text-[200px] font-bold text-yellow-300 animate-ping opacity-70">
              {count}
            </div>
          </div>
          <p className="text-3xl md:text-4xl text-white font-semibold animate-pulse mt-8">
            Get Ready Shivangi ! ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${steps[currentStep].background} transition-all duration-1000 relative overflow-hidden`}>
      {/* Background Audio Element */}
      <audio ref={audioRef} loop />
      
      {/* Countdown Audio Element (hidden) */}
      <audio ref={countdownAudioRef} />
      
      {/* Music Control Button */}
      {isClient && (
        <button
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-lg rounded-full p-3 hover:scale-110 transform transition-all duration-300 border border-white/30"
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>
      )}

      {/* Fixed Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-40">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-700 ease-out shadow-lg"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center relative z-10">
        
        {/* Step 0: Welcome */}
        {currentStep === 0 && (
          <div className="text-center space-y-8 animate-fade-in-up">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-2xl mx-4">
              <div className="text-8xl mb-6 animate-bounce-slow">{steps[0].emoji}</div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                {steps[0].title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {steps[0].description}
              </p>
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-yellow-300/50"
              >
                {steps[0].buttonText}
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Memory Lane */}
        {currentStep === 1 && (
          <div className="w-full max-w-6xl animate-fade-in-up">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20">
              
              {/* TOP NAVIGATION */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 border border-white/30 flex items-center gap-2"
                >
                  ← Back
                </button>
                
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transform transition-all duration-300 shadow-xl flex items-center gap-2"
                >
                  {steps[1].buttonText}
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  {steps[1].title}
                </h2>
                <p className="text-xl text-white/80">
                  {steps[1].description}
                </p>
              </div>
              
              {/* Photo Grid - Using direct img tags */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="group relative aspect-square rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl p-1">
                      <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden">
                        {/* Direct img tag - works from public folder */}
                        <img 
                          src={photo} 
                          alt={`Shivangi  Memory ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-2xl mb-1">✨</div>
                        <div className="text-sm font-semibold">Memory {index + 1}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Countdown Trigger */}
        {currentStep === 2 && (
          <div className="text-center space-y-8 animate-fade-in-up w-full max-w-2xl">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="text-8xl mb-6 animate-pulse-slow">{steps[2].emoji}</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {steps[2].title}
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                {steps[2].description}
              </p>
              <button
                onClick={startCountdown}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-2xl animate-bounce border-2 border-red-400/50"
              >
                {steps[2].buttonText}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Final Surprise */}
        {currentStep === 3 && (
          <div className="text-center space-y-8 animate-fade-in-up w-full max-w-4xl">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-bounce bg-gradient-to-r from-yellow-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
                HAPPY BIRTHDAY Shivangi ! 🎂
              </h1>
              
              {/* Main Photo Display - Direct img tag */}
              <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full border-4 border-yellow-400 shadow-2xl overflow-hidden">
                <img 
                  src="img1.jpg" 
                  alt="Shivangi  Birthday" 
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-2xl md:text-3xl text-white mb-6 font-semibold">
                Wishing you endless joy and amazing adventures Shivangi ! 🥳
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                {[
                  { icon: '🎁', title: 'Amazing Gifts', desc: 'You deserve the best Shivangi !' },
                  { icon: '🎂', title: 'Sweet Treats', desc: 'Time to celebrate!' },
                  { icon: '⭐', title: 'Unforgettable Memories', desc: 'More to come Shivangi !' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 border border-white/30"
                  >
                    <div className="text-4xl mb-3 animate-bounce-slow">{item.icon}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={restartJourney}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-lg border-2 border-yellow-300/50"
                >
                  {steps[3].buttonText}
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-lg border border-white/30"
                >
                  View Memories Again 📸
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UltimateBirthdaySurprise;