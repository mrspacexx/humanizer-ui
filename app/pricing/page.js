"use client";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans relative overflow-hidden">
      {/* Spectacular Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s', animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-emerald-500/25 to-green-500/25 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        
        {/* Particle System */}
        <div className="absolute top-10 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        
        {/* Dynamic Light Rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-400/40 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation Bar */}
      <nav className="w-full bg-white/10 backdrop-blur-2xl border-b border-white/20 py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-between mb-8 sm:mb-12 relative z-20 shadow-2xl">
        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/25">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 64 64">
                <path d="M12 20 Q12 12 20 12 L44 12 Q52 12 52 20 L52 40 Q52 48 44 48 L20 48 Q12 48 12 40 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
                <path d="M20 48 L16 56 L20 64 L24 56 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
                <ellipse cx="32" cy="34" rx="8" ry="10" fill="#f8fafc" stroke="#9ca3af" strokeWidth="1.2"/>
                <circle cx="38" cy="32" r="1.8" fill="#1f2937"/>
                <path d="M28 36 Q32 38 36 36" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="32" cy="30" r="3.5" fill="#22c55e" opacity="0.9"/>
                <circle cx="32" cy="30" r="2.5" fill="#4ade80" opacity="0.8"/>
                <circle cx="32" cy="30" r="1.5" fill="#86efac" opacity="0.7"/>
                <circle cx="32" cy="30" r="0.8" fill="#ffffff" opacity="0.9"/>
                <rect x="14" y="16" width="3" height="3" fill="#22c55e" opacity="0.8"/>
                <rect x="18" y="16" width="3" height="3" fill="#22c55e" opacity="0.6"/>
                <rect x="22" y="16" width="3" height="3" fill="#22c55e" opacity="0.4"/>
                <path d="M42 16 Q44 18 46 16" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                <path d="M42 20 Q44 22 46 20" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
              </svg>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl sm:rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-lg">HumanoText</span>
            <div className="text-xs sm:text-sm text-green-200 font-medium">Simple Pricing</div>
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
          <span className="text-white font-semibold relative group">
            <span className="relative z-10">Pricing</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-400/50"></div>
          </span>
          <a href="/contact" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Contact</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-10">
        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-10 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="border border-blue-200 rounded-2xl p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50 relative">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Free</h3>
              <p className="text-gray-700 mb-6 text-center">Perfect for getting started with text humanization.</p>
              <ul className="text-gray-600 text-sm mb-8 list-none space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited rewrites
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Normal tone only
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Community support
                </li>
              </ul>
              <span className="text-3xl font-bold text-blue-700 mb-4">$0</span>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">Get Started Free</button>
            </div>
            <div className="border border-purple-200 rounded-2xl p-8 flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">Pro</h3>
              <p className="text-gray-700 mb-6 text-center">Advanced features for power users and professionals.</p>
              <ul className="text-gray-600 text-sm mb-8 list-none space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  40,000 words humanize
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited rewrites
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  20,000 words power
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All tone options
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Priority support
                </li>
              </ul>
              <span className="text-3xl font-bold text-purple-700 mb-4">$9<span className="text-base font-normal">/mo</span></span>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">Upgrade to Pro</button>
            </div>
            <div className="border border-emerald-200 rounded-2xl p-8 flex flex-col items-center bg-gradient-to-br from-emerald-50 to-green-50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">Professional</div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-2">Professional</h3>
              <p className="text-gray-700 mb-6 text-center">Ultimate plan for heavy users and businesses.</p>
              <ul className="text-gray-600 text-sm mb-8 list-none space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited humanize
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  100,000 words power
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited rewrites
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  All tone options
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Premium support
                </li>
              </ul>
              <span className="text-3xl font-bold text-emerald-700 mb-4">$30<span className="text-base font-normal">/mo</span></span>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg">Upgrade to Professional</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 