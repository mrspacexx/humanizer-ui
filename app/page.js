"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("Normal");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wordLimitError, setWordLimitError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  // Login/Signup modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [authError, setAuthError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("https://9jcfnmrazahe62-8000.proxy.runpod.net/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (!res.ok) {
        const err = await res.json();
        setAuthError(err.detail || "Invalid email or password. Please try again.");
        return;
      }
      setShowLogin(false);
      setLoginEmail("");
      setLoginPassword("");
      setAuthError("");
      if (justSignedUp) {
        setLoginSuccess(true);
        setTimeout(() => setLoginSuccess(false), 4000);
        setJustSignedUp(false);
      }
      // TODO: Token or user info can be stored here
    } catch (err) {
      setAuthError("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };
  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setAuthError("");
    
    // Password validation
    if (signupPassword.length < 6) {
      setAuthError("Password must be at least 6 characters long");
      return;
    }
    if (signupPassword !== signupConfirm) {
      setAuthError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("https://9jcfnmrazahe62-8000.proxy.runpod.net/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      });
      if (!res.ok) {
        const err = await res.json();
        setAuthError(err.detail || "Account creation failed. Please try again.");
        return;
      }
      setShowSignup(false);
      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirm("");
      setAuthError("");
      setSignupSuccess(true);
      setJustSignedUp(true);
      setTimeout(() => setSignupSuccess(false), 6000);
      // TODO: Auto-login or info message can be added here
    } catch (err) {
      setAuthError("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset success messages when modals open
  const openLogin = () => {
    setShowLogin(true);
    setSignupSuccess(false);
    setLoginSuccess(false);
  };
  const openSignup = () => {
    setShowSignup(true);
    setSignupSuccess(false);
    setLoginSuccess(false);
  };

  const handleSubmit = async () => {
    // 200 kelime limiti kontrolü
    const wordCount = inputText.trim().split(/\s+/).length;
    if (wordCount > 200) {
      setWordLimitError(true);
      setResult("");
      return;
    } else {
      setWordLimitError(false);
    }
    setLoading(true);
    setResult("");

    try {
      const response = await fetch('https://9jcfnmrazahe62-8000.proxy.runpod.net/humanize', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          tone: tone,
        }),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("⚠️ Bir hata oluştu. Sunucuya ulaşılamıyor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans relative overflow-hidden">
      {/* Spectacular Background System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s', animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-purple-500/25 to-pink-500/25 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-bounce" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
        
        {/* Particle System */}
        <div className="absolute top-10 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-80 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
        
        {/* Dynamic Light Rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-green-400/25 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Horizontal Light Beams */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/35 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 left-16 text-blue-400/20 animate-bounce" style={{animationDuration: '4s'}}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div className="absolute top-48 right-24 text-purple-400/20 animate-bounce" style={{animationDuration: '5s', animationDelay: '1s'}}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/3 text-green-400/20 animate-bounce" style={{animationDuration: '6s', animationDelay: '2s'}}>
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-16 right-1/3 w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
        <div className="absolute top-64 left-1/5 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Cosmic Dust */}
        <div className="absolute top-24 left-1/6 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-56 right-1/5 w-0.5 h-0.5 bg-white/40 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-48 left-2/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
      </div>
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-200">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl transition-colors" onClick={() => setShowLogin(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome Back</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input type="email" required placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
              <input type="password" required placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
              {authError && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{authError}</div>}
              <button type="submit" disabled={loading} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <div className="mt-6 text-sm text-center text-gray-500">
              Don't have an account? <button className="text-blue-600 hover:underline font-medium" onClick={() => { setShowLogin(false); setShowSignup(true); }}>Create Account</button>
            </div>
          </div>
        </div>
      )}
      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-gray-200">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl transition-colors" onClick={() => setShowSignup(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input type="email" required placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
              <input type="password" required placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
              <input type="password" required placeholder="Confirm Password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
              {authError && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{authError}</div>}
              <button type="submit" disabled={loading} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            <div className="mt-6 text-sm text-center text-gray-500">
              Already have an account? <button className="text-blue-600 hover:underline font-medium" onClick={() => { setShowSignup(false); setShowLogin(true); }}>Sign In</button>
            </div>
          </div>
        </div>
      )}
      {/* Success Messages */}
      {signupSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-4 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Registration successful! You can now sign in.
          <button className="ml-2 text-blue-600 underline font-medium" onClick={() => { setShowLogin(true); setSignupSuccess(false); }}>Sign In</button>
        </div>
      )}
      {loginSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-4 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Welcome back! You're successfully signed in.
        </div>
      )}
      {/* Spectacular Navigation Bar */}
      <nav className="w-full bg-white/10 backdrop-blur-2xl border-b border-white/20 py-4 sm:py-6 px-4 sm:px-8 flex items-center justify-between mb-8 sm:mb-12 relative z-20 shadow-2xl">
        {/* Navigation Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-b-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
              <span className="text-white text-xl sm:text-2xl font-bold">H</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          <div>
            <span className="text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-lg">HumanoText</span>
            <div className="text-xs sm:text-sm text-blue-200 font-medium">AI Text Humanizer</div>
            {/* Hit counter removed - was showing to everyone */}
          </div>
        </div>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10 relative z-10">
          <button onClick={() => setActiveTab('Home')} className={`text-white/80 font-semibold hover:text-white transition-all duration-300 relative group ${activeTab === 'Home' ? 'text-white' : ''}`}>
            <span className="relative z-10">Home</span>
            {activeTab === 'Home' && (
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg shadow-blue-400/50"></div>
            )}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </button>
          <button onClick={() => setActiveTab('Features')} className={`text-white/80 font-semibold hover:text-white transition-all duration-300 relative group ${activeTab === 'Features' ? 'text-white' : ''}`}>
            <span className="relative z-10">Features</span>
            {activeTab === 'Features' && (
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg shadow-purple-400/50"></div>
            )}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </button>
          <button onClick={() => setActiveTab('Pricing')} className={`text-white/80 font-semibold hover:text-white transition-all duration-300 relative group ${activeTab === 'Pricing' ? 'text-white' : ''}`}>
            <span className="relative z-10">Pricing</span>
            {activeTab === 'Pricing' && (
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-400/50"></div>
            )}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </button>
          <button onClick={() => setActiveTab('Contact')} className={`text-white/80 font-semibold hover:text-white transition-all duration-300 relative group ${activeTab === 'Contact' ? 'text-white' : ''}`}>
            <span className="relative z-10">Contact</span>
            {activeTab === 'Contact' && (
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg shadow-orange-400/50"></div>
            )}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300 group-hover:w-full"></div>
          </button>
        </div>
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <button className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105" onClick={openLogin}>
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
          </button>
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 relative group" onClick={openSignup}>
            <span className="relative z-10">Get Started</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </button>
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden flex items-center p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-white/30 shadow-2xl flex flex-col items-start px-4 sm:px-6 py-4 gap-3 md:hidden z-50">
            <button onClick={() => { setActiveTab('Home'); setMobileMenuOpen(false); }} className={`text-gray-800 font-medium hover:text-blue-600 transition-colors w-full text-left py-3 ${activeTab === 'Home' ? 'text-blue-600 font-semibold' : ''}`}>Home</button>
            <button onClick={() => { setActiveTab('Features'); setMobileMenuOpen(false); }} className={`text-gray-800 font-medium hover:text-blue-600 transition-colors w-full text-left py-3 ${activeTab === 'Features' ? 'text-blue-600 font-semibold' : ''}`}>Features</button>
            <button onClick={() => { setActiveTab('Pricing'); setMobileMenuOpen(false); }} className={`text-gray-800 font-medium hover:text-blue-600 transition-colors w-full text-left py-3 ${activeTab === 'Pricing' ? 'text-blue-600 font-semibold' : ''}`}>Pricing</button>
            <button onClick={() => { setActiveTab('Contact'); setMobileMenuOpen(false); }} className={`text-gray-800 font-medium hover:text-blue-600 transition-colors w-full text-left py-3 ${activeTab === 'Contact' ? 'text-blue-600 font-semibold' : ''}`}>Contact</button>
            <div className="flex gap-3 w-full mt-4 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold bg-white hover:bg-blue-50 transition-all" onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}>Sign In</button>
              <button className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all" onClick={() => { setShowSignup(true); setMobileMenuOpen(false); }}>Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* Section Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 mb-10">
                {activeTab === 'Home' && (
          <>
            {/* Professional Humanizer Tool - Now at the top */}
            <div id="humanizer-tool" className="max-w-5xl mx-auto mb-16 px-2 sm:px-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 relative">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Your input content</h3>
                  <p className="text-sm sm:text-base text-gray-600">Transform your AI-generated text into natural human writing</p>
                </div>

                {/* Main Input Area */}
                <div className="mb-6 sm:mb-8">
                  <Textarea
                    rows={12}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste your AI-generated text here to humanize it..."
                    className="w-full border border-gray-300 rounded-xl p-4 sm:p-6 text-gray-800 text-base sm:text-lg resize-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all min-h-[300px] sm:min-h-[400px]"
                  />
                </div>

                {/* Error Message */}
                {wordLimitError && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    ⚠️ Maximum 200 words allowed.
                  </div>
                )}

                {/* Bottom Controls */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="text-lg font-semibold text-gray-700">Tone:</span>
                    <div className="flex flex-wrap gap-2">
                      <button className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all ${tone === 'Normal' ? 'bg-green-100 text-green-800 border-2 border-green-200' : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-green-300'}`} onClick={() => setTone('Normal')}>
                        Normal
                      </button>
                      <button className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all ${tone === 'Formal' ? 'bg-green-100 text-green-800 border-2 border-green-200' : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-green-300'}`} onClick={() => setTone('Formal')}>
                        Formal
                      </button>
                      <button className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all ${tone === 'Academic' ? 'bg-green-100 text-green-800 border-2 border-green-200' : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-green-300'}`} onClick={() => setTone('Academic')}>
                        Academic
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex w-full lg:w-auto">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-xl text-base sm:text-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm sm:text-base">Humanizing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          <span className="text-sm sm:text-base">Humanize</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Output Section */}
                {result && (
                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800">Humanized Output</h4>
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        className="w-full sm:w-auto text-sm sm:text-base rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 px-3 sm:px-4 py-2 font-medium"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copy
                      </Button>
                    </div>
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base sm:text-lg">
                      {result}
                    </div>
                    {copied && (
                      <div className="mt-4 text-green-600 text-sm sm:text-base font-medium text-center bg-green-50 px-3 sm:px-4 py-2 rounded-lg">
                        ✅ Text copied to clipboard!
                      </div>
                    )}
                  </div>
                                )}
              </div>
            </div>
            
            {/* Professional Header Above Humanizer */}
            <div className="text-center mb-12 px-2 sm:px-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-blue-400/30">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
                AI-Powered Text Humanization
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight px-1 sm:px-2">
                Transform AI Text into 
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"> Human Writing</span>
              </h2>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 sm:px-4">
                Our AI system employs multiple advanced techniques including sophisticated language models, 
                <span className="text-blue-300 font-medium"> proprietary optimization algorithms</span>, and 
                <span className="text-purple-300 font-medium"> specialized training methods</span> to help you create more natural, 
                human-like content that bypasses AI detection tools.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Smart Rewriting</h3>
                  <p className="text-gray-400 text-sm">Intelligent text transformation to make content sound more natural</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Carefully Optimized</h3>
                  <p className="text-gray-400 text-sm">Fine-tuned for better human-like writing patterns</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-2">Fast Processing</h3>
                  <p className="text-gray-400 text-sm">Quick and efficient text humanization</p>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 'Features' && (
          <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Advanced Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Humanization</h3>
                <p className="text-gray-600">Transform AI text into natural human writing with just one click.</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Tones</h3>
                <p className="text-gray-600">Choose from Normal, Formal, and Academic writing styles.</p>
              </div>
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Detection Bypass</h3>
                <p className="text-gray-600">Advanced algorithms ensure your text passes AI detection tools.</p>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'Pricing' && (
          <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Simple Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="border border-blue-200 rounded-2xl p-8 flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
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
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">Pro</div>
                <h3 className="text-2xl font-bold text-purple-700 mb-2">Pro</h3>
                <p className="text-gray-700 mb-6 text-center">Advanced features for power users and professionals.</p>
                <ul className="text-gray-600 text-sm mb-8 list-none space-y-3">
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
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Early access to new features
                  </li>
                </ul>
                <span className="text-3xl font-bold text-purple-700 mb-4">$9<span className="text-base font-normal">/mo</span></span>
                <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">Upgrade to Pro</button>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'Contact' && (
          <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 p-4 sm:p-6 lg:p-10 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Get in Touch</h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="border border-gray-300 rounded-xl px-3 sm:px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white text-gray-800 placeholder-gray-500 text-sm sm:text-base" 
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="border border-gray-300 rounded-xl px-3 sm:px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white text-gray-800 placeholder-gray-500 text-sm sm:text-base" 
                  />
                </div>
                <textarea 
                  placeholder="Your Message" 
                  rows={6} 
                  className="border border-gray-300 rounded-xl px-3 sm:px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white text-gray-800 placeholder-gray-500 text-sm sm:text-base w-full resize-none" 
                ></textarea>
                <button 
                  type="submit" 
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-base sm:text-lg"
                >
                  Send Message
                </button>
              </form>
              <div className="mt-6 sm:mt-8 text-center text-gray-500 text-sm sm:text-base">
                Or email us directly at <a href="mailto:info@humanotext.com" className="text-blue-600 hover:underline font-medium">info@humanotext.com</a>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}