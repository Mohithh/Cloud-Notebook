'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image'; // Add Image import

const UltimateBirthdaySurprise = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState(3);
  const [isCounting, setIsCounting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef(null);
  const countdownAudioRef = useRef(null);

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
    'img8.jpg',
    'img9.jpg',
    'img10.jpg',
    'img11.jpg',
    'img12.jpg', 
    'img13.jpg',
    'img14.jpg',
    'img15.jpg',
    'img16.jpg',
    'img17.jpg',
    'img18.jpg', 
    'img19.jpg',
    'img20.jpg',
    'img21.jpg',
    'img22.jpg',
    'img23.jpg',
    'img24.jpg',
  ];

  const steps = [
    {
      title: "Shivangi's Birthday Celebration! 🎉",
      description: "Ready for an unforgettable birthday experience? Click begin to start the magic!",
      buttonText: "Begin Celebration! 🚀",
      background: "from-indigo-600 via-purple-600 to-pink-600",
      emoji: "🎊",
      music: "happy-birthday-155461.mp3"
    },
    {
      title: "Shivangi's Memory Lane 📸",
      description: "Cherished moments and beautiful memories of our amazing Shivangi",
      buttonText: "Continue to Countdown →",
      background: "from-emerald-600 via-cyan-500 to-blue-600", 
      emoji: "📷",
      music: "happy-birthday-254480.mp3"
    },
    {
      title: "Countdown Begins! ⏰",
      description: "Get ready for Shivangi's grand surprise! The excitement starts now...",
      buttonText: "Start Countdown! 🔥",
      background: "from-orange-600 via-red-500 to-rose-600",
      emoji: "⚡",
      music: "clock-ticking-60-second-countdown-118231.mp3"
    },
    {
      title: "HAPPY BIRTHDAY Shivangi! 🎂",
      description: "The moment you've been waiting for!",
      buttonText: "Celebrate Again! 🔄",
      background: "from-yellow-500 via-orange-500 to-red-500",
      emoji: "🎂",
      music: "WhatsApp Audio 2025-10-24 at 21.29.27_789c5f74.mp3" // Fixed: Use existing file instead of WhatsApp audio
    }
  ];

  // Set client-side flag to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Music control with useCallback to avoid dependency issues
  const toggleMusic = useCallback(() => {
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
  }, [isPlaying]);

  const playStepMusic = useCallback(() => {
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
  }, [currentStep, isPlaying, steps]);

  const startCountdown = useCallback(() => {
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
  }, [isPlaying]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const restartJourney = useCallback(() => {
    setCurrentStep(0);
    setIsCounting(false);
    setIsPlaying(true);
  }, []);

  // Auto-play music when component mounts and when steps change
  useEffect(() => {
    if (isClient && !isCounting) {
      playStepMusic();
    }
  }, [currentStep, isClient, isCounting, playStepMusic]);

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
          audioRef.current.src = steps[3].music;
          audioRef.current.play().catch(error => {
            console.log('Celebration audio auto-play prevented');
          });
        }
      }, 500);
    }
  }, [isCounting, count, isPlaying, nextStep, steps]);

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
            Get Ready Shivangi! ✨
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
        
        {/* Step 0: Welcome - RESPONSIVE VERSION */}
        {currentStep === 0 && (
          <div className="text-center space-y-8 animate-fade-in-up">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl border border-white/20 max-w-2xl mx-4 relative">
              {/* Floating arrows - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block absolute -left-4 top-1/2 transform -translate-y-1/2 animate-bounce">
                <div className="text-4xl text-yellow-300">➡️</div>
              </div>
              <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 animate-bounce" style={{animationDelay: '0.5s'}}>
                <div className="text-4xl text-yellow-300">⬅️</div>
              </div>

              <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce-slow">{steps[0].emoji}</div>
              
              <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent px-2">
                {steps[0].title}
              </h1>
              
              <p className="text-base md:text-2xl text-white/90 mb-8 md:mb-12 leading-relaxed font-semibold px-2">
                {steps[0].description}
              </p>
              
              {/* Enhanced Prominent Button */}
              <div className="relative">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-yellow-400 rounded-xl md:rounded-2xl blur-lg md:blur-xl opacity-50 animate-pulse"></div>
                
                {/* Main button with responsive sizing */}
                <button
                  onClick={nextStep}
                  className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl text-lg md:text-2xl font-bold hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 md:border-4 border-yellow-300/60 animate-bounce cursor-pointer z-10 w-full max-w-xs md:max-w-none mx-auto"
                  style={{ animation: 'bounce 2s infinite, glow 1.5s ease-in-out infinite alternate' }}
                >
                  <span className="flex items-center justify-center gap-2 md:gap-3">
                    🎉 {steps[0].buttonText} 🎉
                  </span>
                </button>
                
                {/* Click instruction - Responsive */}
                <p className="text-yellow-300 text-sm md:text-lg font-semibold mt-3 md:mt-4 animate-pulse">
                  👇 Click the button to begin! 👇
                </p>
              </div>

              {/* Mobile-only down arrow */}
              <div className="md:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="text-3xl text-yellow-300">👇</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Memory Lane with Next.js Image */}
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
              
              {/* Photo Grid - Using Next.js Image component */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="group relative aspect-square rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl p-1">
                      <div className="w-full h-full bg-gray-800 rounded-xl overflow-hidden">
                        {/* Next.js Image component for optimization */}
                        <Image 
                          src={`/${photo}`}
                          alt={`Shivangi Memory ${index + 1}`}
                          width={400}
                          height={400}
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

        {/* Step 3: Final Surprise with Next.js Image */}
      {currentStep === 3 && (
  <div className="text-center space-y-8 animate-fade-in-up w-full max-w-4xl">
    <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-bounce bg-gradient-to-r from-yellow-300 via-pink-300 to-red-300 bg-clip-text text-transparent">
        HAPPY BIRTHDAY Shivangi! 🎂
      </h1>
      
      {/* Main Photo Display with Next.js Image */}
      <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full border-4 border-yellow-400 shadow-2xl overflow-hidden">
        <Image 
          src="/img1.jpg"
          alt="Shivangi Birthday"
          width={256}
          height={256}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Birthday Wishes */}
      <div className="text-white mb-8 space-y-6">
        {/* NEW LINES ADDED HERE */}
        <p className="text-xl md:text-2xl leading-relaxed font-medium text-yellow-300">
          Unplanned love, Unexpected bond<br />
          Right time, Right person<br />
          That&apos;s youuuuuuu
        </p>
        
        <p className="text-lg md:text-xl leading-relaxed font-semibold">
          Carrying happiness on youu ❤ Happy Birthday to the amazing, wonderful and beautiful you! 🎂✨
        </p>
        
        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          May this year be your best one yet! 💖
        </p>

        <div className="h-4"></div>

        <p className="text-lg md:text-xl leading-relaxed">
          Wishing you a day filled with happiness, laughter, and endless surprises!
        </p>
        
        <p className="text-xl md:text-2xl font-semibold text-yellow-300">
          Aaj ka din sirf aur sirf tumhara hai — so smile wide, laugh loud, and enjoy every single moment like a queen 👑
        </p>

        <p className="text-lg md:text-xl leading-relaxed">
          You&apos;re truly one of a kind — ek aisi insaan jinki vibes pure positive hain aur jinki presence sabke life mein khushiyan bhar deti hai 💫
        </p>
        
        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          May your every dream come true, and may success follow you wherever you go 🌈
        </p>

        <div className="h-4"></div>

        <p className="text-lg md:text-xl leading-relaxed italic">
          Kabhi life mein tension aaye toh yaad rakhna — tum bohot strong ho:
        </p>
        
        <p className="text-lg md:text-xl leading-relaxed italic">
          Aur tumhara dil jitna beautiful hai, utni hi khoobsurat tumhari journey bhi rahe;
        </p>

        <p className="text-lg md:text-xl leading-relaxed">
          May this year bring you new adventures, genuine people, and countless reasons to smile.
        </p>
        
        <p className="text-xl md:text-2xl font-semibold">
          Har subah naye sapne laaye, har shaam sukoon bhari ho ☀️🌙
        </p>

        <div className="h-4"></div>

        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          So here&apos;s to more laughter, more love, and more magic in your life ✨
        </p>
        
        <p className="text-xl md:text-2xl font-semibold text-yellow-300">
          Enjoy your day to the fullest — because you truly deserve all the happiness in the world! 🧿
        </p>

        <div className="h-6"></div>

        {/* ORIGINAL WISHES CONTINUE */}
        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          On this special day, I just want to wish you a life filled with endless smiles, pure happiness, and dreams that turn into reality.
        </p>
        
        <p className="text-lg md:text-xl leading-relaxed">
          You&apos;re one of those rare people whose heart shines brighter than any star — kind, genuine, and full of life. 🌸
        </p>

        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          Today is your day — so smile a little extra, laugh a little louder, and eat all the cake you want 🍰 because birthdays are made to celebrate you!
        </p>

        <div className="h-4"></div>

        <p className="text-lg md:text-xl leading-relaxed">
          May every morning bring you new hope ☀️,<br />
          every evening bring you peace 🌙,<br />
          and may your life always be surrounded by love, light, and success.
        </p>
        
        <p className="text-xl md:text-2xl font-semibold">
          Never let the world dim your sparkle, because you were born to shine. ✨
        </p>

        <div className="h-6"></div>

        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          Today is not just another day — it&apos;s the day when a truly special person came into this world ❤️
        </p>
        
        <p className="text-xl md:text-2xl font-semibold text-yellow-300">
          Aaj ka din tumhare naam, tumhari muskaan aur tumhari khushiyon ke naam! 💫
        </p>

        <p className="text-lg md:text-xl leading-relaxed">
          You are not just a name, Shivangi — you are a whole vibe, a bundle of positivity, and a reason for so many smiles around you.
        </p>
        
        <p className="text-lg md:text-xl leading-relaxed italic">
          Tere jaise log life mein ek baar milte hain — jinke saath har pal meetha lagta hai, aur har baat dil se nikalti hai 💖
        </p>

        <div className="h-6"></div>

        <div className="bg-yellow-400/20 rounded-2xl p-6 border border-yellow-300/30">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4">
            So, on your special day, here&apos;s a little prayer:
          </h3>
          <div className="space-y-3 text-lg md:text-xl">
            <p className="flex items-center justify-center gap-2">
              <span className="text-2xl">••</span>
              May you rise higher than you&apos;ve ever dreamed.
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-2xl">•</span>
              May your heart never lose its innocence.
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-2xl">•</span>
              And may your smile always stay as bright as today.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        {[
          { icon: '🎁', title: 'Amazing Gifts', desc: 'You deserve the best Shivangi!' },
          { icon: '🎂', title: 'Sweet Treats', desc: 'Time to celebrate!' },
          { icon: '⭐', title: 'Unforgettable Memories', desc: 'More to come Shivangi!' }
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