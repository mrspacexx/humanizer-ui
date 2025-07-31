"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AIDetection() {
  const [detectionText, setDetectionText] = useState('');
  const [detectionResult, setDetectionResult] = useState(null);
  const [detectionLoading, setDetectionLoading] = useState(false);
  const [detectionError, setDetectionError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // AI Detection Handler
  const handleAIDetection = async () => {
    const wordCount = detectionText.trim().split(/\s+/).length;
    
    if (wordCount < 80) {
      setDetectionError("Minimum 80 words required for AI detection.");
      return;
    }
    
    if (wordCount > 1000) {
      setDetectionError("Maximum 1000 words allowed for AI detection.");
      return;
    }
    
    setDetectionError('');
    setDetectionLoading(true);
    setDetectionResult(null);
    
    try {
      const response = await fetch("https://g2ixr6izoi1zdq-8000.proxy.runpod.net/detect-ai", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ text: detectionText }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setDetectionResult(data);
      } else {
        setDetectionError(data.detail || "AI detection failed. Please try again.");
      }
    } catch (error) {
      setDetectionError("Connection error. Please try again.");
    } finally {
      setDetectionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans relative overflow-hidden">
      {/* Spectacular Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s', animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-orange-500/25 to-red-500/25 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        
        {/* Particle System */}
        <div className="absolute top-10 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 left-1/2 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        
        {/* Dynamic Light Rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/40 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation Bar */}
      <nav className="w-full bg-white/10 backdrop-blur-2xl border-b border-white/20 py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-between mb-8 sm:mb-12 relative z-20 shadow-2xl">
        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/25">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 64 64">
                <path d="M12 20 Q12 12 20 12 L44 12 Q52 12 52 20 L52 40 Q52 48 44 48 L20 48 Q12 48 12 40 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
                <path d="M20 48 L16 56 L20 64 L24 56 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
                <ellipse cx="32" cy="34" rx="8" ry="10" fill="#f8fafc" stroke="#9ca3af" strokeWidth="1.2"/>
                <circle cx="38" cy="32" r="1.8" fill="#1f2937"/>
                <path d="M28 36 Q32 38 36 36" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="32" cy="30" r="3.5" fill="#fbbf24" opacity="0.9"/>
                <circle cx="32" cy="30" r="2.5" fill="#fde047" opacity="0.8"/>
                <circle cx="32" cy="30" r="1.5" fill="#fef3c7" opacity="0.7"/>
                <circle cx="32" cy="30" r="0.8" fill="#ffffff" opacity="0.9"/>
                <rect x="14" y="16" width="3" height="3" fill="#f59e0b" opacity="0.8"/>
                <rect x="18" y="16" width="3" height="3" fill="#f59e0b" opacity="0.6"/>
                <rect x="22" y="16" width="3" height="3" fill="#f59e0b" opacity="0.4"/>
                <path d="M42 16 Q44 18 46 16" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                <path d="M42 20 Q44 22 46 20" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
              </svg>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl sm:rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-lg">HumanoText</span>
            <div className="text-xs sm:text-sm text-yellow-200 font-medium">AI Detection Tool</div>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 relative z-10">
          <a href="/" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Home</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
          <span className="text-white font-semibold relative group">
            <span className="relative z-10">AI Detection</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/50"></div>
          </span>
          <a href="/features" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Features</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
          <a href="/pricing" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Pricing</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
          <a href="/contact" className="text-white/80 font-semibold hover:text-white transition-all duration-300 relative group">
            <span className="relative z-10">Contact</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-10">
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  AI Detection Tool
                </span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Detect if your text was generated by AI or written by a human. Our advanced detection system analyzes patterns and characteristics to provide accurate results.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8">
              {/* Input Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Enter Text to Analyze</h3>
                <textarea
                  value={detectionText}
                  onChange={(e) => setDetectionText(e.target.value)}
                  placeholder="Paste your text here (minimum 80 words, maximum 1000 words)..."
                  className="w-full h-48 px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                />
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {detectionText.trim().split(/\s+/).length} words
                  </span>
                  <button
                    onClick={handleAIDetection}
                    disabled={detectionLoading || detectionText.trim().split(/\s+/).length < 80}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {detectionLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Analyzing...
                      </div>
                    ) : (
                      'Detect AI'
                    )}
                  </button>
                </div>
                {detectionError && (
                  <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-300 text-sm">{detectionError}</p>
                  </div>
                )}
              </div>

              {/* Results Section */}
              {detectionResult && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Detection Results</h3>
                  
                  {/* Main Result Card */}
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">Analysis Result</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        detectionResult.is_ai_generated === true 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : detectionResult.is_ai_generated === false
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {detectionResult.is_ai_generated === true ? 'AI Generated' :
                         detectionResult.is_ai_generated === false ? 'Human Written' : 'Uncertain'}
                      </div>
                    </div>
                    
                    {/* Confidence Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Confidence</span>
                        <span className="text-sm font-medium text-white">{Math.round(detectionResult.confidence * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            detectionResult.is_ai_generated === true 
                              ? 'bg-gradient-to-r from-red-500 to-red-600'
                              : detectionResult.is_ai_generated === false
                              ? 'bg-gradient-to-r from-green-500 to-green-600'
                              : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                          }`}
                          style={{ width: `${detectionResult.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Percentage */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">AI Probability</span>
                        <span className="text-lg font-bold text-white">{detectionResult.percentage}%</span>
                      </div>
                    </div>

                    {/* Word Count & Source */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Words:</span>
                        <span className="text-white ml-2">{detectionResult.word_count}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Source:</span>
                        <span className="text-white ml-2 capitalize">{detectionResult.source}</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicators */}
                  {detectionResult.indicators && detectionResult.indicators.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Detection Indicators</h4>
                      <div className="space-y-3">
                        {detectionResult.indicators.map((indicator, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${
                              indicator.toLowerCase().includes('ai') ? 'bg-red-400' : 'bg-green-400'
                            }`}></div>
                            <span className="text-sm text-gray-300">{indicator}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 