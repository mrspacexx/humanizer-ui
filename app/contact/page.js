"use client";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans relative overflow-hidden">
      {/* Spectacular Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s', animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-red-500/25 to-orange-500/25 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        
        {/* Particle System */}
        <div className="absolute top-10 left-1/3 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 left-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        
        {/* Dynamic Light Rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-400/40 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-red-400/30 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation Bar */}
      <nav className="w-full bg-white/10 backdrop-blur-2xl border-b border-white/20 py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-between mb-8 sm:mb-12 relative z-20 shadow-2xl">
        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 64 64">
                <path d="M12 20 Q12 12 20 12 L44 12 Q52 12 52 20 L52 40 Q52 48 44 48 L20 48 Q12 48 12 40 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
                <path d="M20 48 L16 56 L20 64 L24 56 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
                <ellipse cx="32" cy="34" rx="8" ry="10" fill="#f8fafc" stroke="#9ca3af" strokeWidth="1.2"/>
                <circle cx="38" cy="32" r="1.8" fill="#1f2937"/>
                <path d="M28 36 Q32 38 36 36" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="32" cy="30" r="3.5" fill="#f97316" opacity="0.9"/>
                <circle cx="32" cy="30" r="2.5" fill="#fb923c" opacity="0.8"/>
                <circle cx="32" cy="30" r="1.5" fill="#fdba74" opacity="0.7"/>
                <circle cx="32" cy="30" r="0.8" fill="#ffffff" opacity="0.9"/>
                <rect x="14" y="16" width="3" height="3" fill="#f97316" opacity="0.8"/>
                <rect x="18" y="16" width="3" height="3" fill="#f97316" opacity="0.6"/>
                <rect x="22" y="16" width="3" height="3" fill="#f97316" opacity="0.4"/>
                <path d="M42 16 Q44 18 46 16" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                <path d="M42 20 Q44 22 46 20" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
              </svg>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl sm:rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-lg">HumanoText</span>
            <div className="text-xs sm:text-sm text-orange-200 font-medium">Contact Us</div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 relative z-10">
          <a href="/" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Home</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
          <a href="/ai-detection" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">AI Detection</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
          <a href="/features" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Features</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
          <a href="/pricing" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Pricing</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
          <span className="text-white font-semibold relative group">
            <span className="relative z-10">Contact</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg shadow-orange-400/50"></div>
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-10">
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                  Contact Us
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Have questions or need support? We're here to help you get the most out of our AI text humanizer.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                  />
                </div>
                <textarea 
                  rows={6} 
                  placeholder="Your Message" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all resize-none"
                ></textarea>
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Send Message
                </button>
              </form>
              <div className="mt-6 sm:mt-8 text-center text-gray-500 text-sm sm:text-base">
                Or email us directly at <a href="mailto:info@humanotext.com" className="text-orange-600 hover:underline font-medium">info@humanotext.com</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 