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
    try {
      const res = await fetch("https://9ixc8puccjppea-8000.proxy.runpod.net/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (!res.ok) {
        const err = await res.json();
        setAuthError(err.detail || "Login failed");
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
      setAuthError("Login failed. Network error.");
    }
  };
  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (signupPassword !== signupConfirm) {
      setAuthError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("https://9ixc8puccjppea-8000.proxy.runpod.net/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      });
      if (!res.ok) {
        const err = await res.json();
        setAuthError(err.detail || "Signup failed");
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
      setAuthError("Signup failed. Network error.");
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
      const response = await fetch('https://9ixc8puccjppea-8000.proxy.runpod.net/humanize', {
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl" onClick={() => setShowLogin(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Log In</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input type="email" required placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              <input type="password" required placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              {authError && <div className="text-red-600 text-sm">{authError}</div>}
              <button type="submit" className="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Log In</button>
            </form>
            <div className="mt-4 text-sm text-center text-gray-500">
              Don't have an account? <button className="text-blue-600 hover:underline" onClick={() => { setShowLogin(false); setShowSignup(true); }}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl" onClick={() => setShowSignup(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h2>
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input type="email" required placeholder="Email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              <input type="password" required placeholder="Password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              <input type="password" required placeholder="Confirm Password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              {authError && <div className="text-red-600 text-sm">{authError}</div>}
              <button type="submit" className="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Sign Up</button>
            </form>
            <div className="mt-4 text-sm text-center text-gray-500">
              Already have an account? <button className="text-blue-600 hover:underline" onClick={() => { setShowSignup(false); setShowLogin(true); }}>Log In</button>
            </div>
          </div>
        </div>
      )}
      {/* Success Messages */}
      {signupSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow z-50 flex items-center gap-4">
          Registration successful! You can now log in.
          <button className="ml-2 text-blue-600 underline" onClick={() => { setShowLogin(true); setSignupSuccess(false); }}>Log In</button>
        </div>
      )}
      {loginSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded shadow z-50 flex items-center gap-4">
          Login successful!
        </div>
      )}
      {/* Navigation Bar */}
      <nav className="w-full bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between mb-8 relative z-20">
        <div className="flex items-center gap-2">
          <span className="text-2xl text-blue-700 font-extrabold">📝</span>
          <span className="text-xl font-bold text-gray-800 tracking-tight">HumanoText</span>
        </div>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => setActiveTab('Home')} className={`text-gray-700 font-medium hover:text-blue-700 transition ${activeTab === 'Home' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Home</button>
          <button onClick={() => setActiveTab('Features')} className={`text-gray-700 font-medium hover:text-blue-700 transition ${activeTab === 'Features' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Features</button>
          <button onClick={() => setActiveTab('Pricing')} className={`text-gray-700 font-medium hover:text-blue-700 transition ${activeTab === 'Pricing' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Pricing</button>
          <button onClick={() => setActiveTab('Contact')} className={`text-gray-700 font-medium hover:text-blue-700 transition ${activeTab === 'Contact' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Contact</button>
        </div>
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-md border border-blue-600 text-blue-600 font-semibold bg-white hover:bg-blue-50 transition" onClick={openLogin}>Log In</button>
          <button className="px-4 py-1.5 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition" onClick={openSignup}>Sign Up</button>
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden flex items-center p-2 rounded hover:bg-gray-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-md flex flex-col items-start px-6 py-4 gap-3 md:hidden animate-fade-in z-30">
            <button onClick={() => { setActiveTab('Home'); setMobileMenuOpen(false); }} className={`text-gray-700 font-medium hover:text-blue-700 transition w-full ${activeTab === 'Home' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Home</button>
            <button onClick={() => { setActiveTab('Features'); setMobileMenuOpen(false); }} className={`text-gray-700 font-medium hover:text-blue-700 transition w-full ${activeTab === 'Features' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Features</button>
            <button onClick={() => { setActiveTab('Pricing'); setMobileMenuOpen(false); }} className={`text-gray-700 font-medium hover:text-blue-700 transition w-full ${activeTab === 'Pricing' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Pricing</button>
            <button onClick={() => { setActiveTab('Contact'); setMobileMenuOpen(false); }} className={`text-gray-700 font-medium hover:text-blue-700 transition w-full ${activeTab === 'Contact' ? 'text-blue-700 underline underline-offset-4' : ''}`}>Contact</button>
            <div className="flex gap-2 w-full mt-2">
              <button className="flex-1 px-4 py-1.5 rounded-md border border-blue-600 text-blue-600 font-semibold bg-white hover:bg-blue-50 transition" onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}>Log In</button>
              <button className="flex-1 px-4 py-1.5 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition" onClick={() => { setShowSignup(true); setMobileMenuOpen(false); }}>Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* Section Content */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        {activeTab === 'Home' && (
          <>
            <section className="mb-8 bg-white rounded-lg border border-gray-200 p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to HumanoText</h2>
                <p className="text-lg text-gray-600 mb-4">Bypass AI detection and make your text sound truly human. HumanoText uses advanced AI rewriting to help you create natural, undetectable content for any purpose.</p>
                <ul className="list-disc pl-5 text-gray-700 text-base space-y-1">
                  <li>Instant rewriting with a single click</li>
                  <li>Multiple tone options: Normal, Formal, Academic</li>
                  <li>Modern, easy-to-use interface</li>
                  <li>Perfect for students, professionals, and creators</li>
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <img src="/file.svg" alt="AI Writing" className="w-40 h-40 object-contain" />
              </div>
            </section>
            {/* Humanizer Tool only on Home */}
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Input Panel */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 w-full">
                  <label className="block mb-2 text-base font-semibold text-gray-700">
                    AI-Generated Text
                  </label>
                  <Textarea
                    rows={8}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your text here..."
                    className="rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition bg-white text-gray-800 text-base px-3 py-2 min-h-[7rem] w-full"
                  />

                  {/* Tone */}
                  <div className="mt-4 space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                      Tone
                    </label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200">
                        <SelectValue placeholder="Choose tone..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Formal">Formal</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {wordLimitError && (
                    <div className="mt-3 text-red-600 text-sm font-medium">
                      ⚠️ Maksimum 200 kelimeye izin veriliyor.
                    </div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-6 w-full py-2 text-base font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-none"
                  >
                    {loading ? <span className="animate-pulse">⏳ Rewriting...</span> : <span>🔁 Rewrite</span>}
                  </Button>
                </div>

                {/* Output Panel */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 w-full relative">
                  <label className="block mb-2 text-base font-semibold text-gray-700">
                    Humanized Output
                  </label>
                  <div className="min-h-[7rem] bg-gray-50 p-4 rounded-md text-base whitespace-pre-wrap border border-gray-200 text-gray-800 relative w-full">
                    {result && (
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        className="absolute top-2 right-2 z-10 text-sm rounded border border-blue-200 bg-white/90 hover:border-blue-400 hover:bg-blue-50 px-3 py-1 shadow-md"
                      >
                        📋 Copy
                      </Button>
                    )}
                    <div className="pr-20">
                      {result || <span className="text-gray-400">⚡️ Rewritten text will appear here.</span>}
                    </div>
                  </div>
                  {copied && (
                    <span className="text-green-600 text-sm font-semibold absolute top-3 left-1/2 -translate-x-1/2">✅ Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === 'Features' && (
          <section className="mb-8 bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <span className="text-blue-600 text-2xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Fast & Reliable</h3>
                  <p className="text-gray-600">Get instant results with our high-speed rewriting engine.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-purple-600 text-2xl">🎨</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Multiple Tones</h3>
                  <p className="text-gray-600">Choose from Normal, Formal, or Academic to match your needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-green-600 text-2xl">🔒</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Privacy First</h3>
                  <p className="text-gray-600">Your text is never stored. We value your privacy and security.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-500 text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Easy to Use</h3>
                  <p className="text-gray-600">A clean, modern interface for effortless rewriting.</p>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'Pricing' && (
          <section className="mb-8 bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-blue-200 rounded-lg p-6 flex flex-col items-center bg-blue-50">
                <h3 className="text-xl font-bold text-blue-700 mb-2">Free</h3>
                <p className="text-gray-700 mb-4">Basic rewriting features for everyone.</p>
                <ul className="text-gray-600 text-sm mb-4 list-disc pl-4">
                  <li>Unlimited rewrites</li>
                  <li>Normal tone only</li>
                  <li>Community support</li>
                </ul>
                <span className="text-2xl font-bold text-blue-700 mb-2">$0</span>
                <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Get Started</button>
              </div>
              <div className="border border-purple-200 rounded-lg p-6 flex flex-col items-center bg-purple-50">
                <h3 className="text-xl font-bold text-purple-700 mb-2">Pro</h3>
                <p className="text-gray-700 mb-4">Advanced features for power users.</p>
                <ul className="text-gray-600 text-sm mb-4 list-disc pl-4">
                  <li>All tone options</li>
                  <li>Priority support</li>
                  <li>Early access to new features</li>
                </ul>
                <span className="text-2xl font-bold text-purple-700 mb-2">$9<span className="text-base font-normal">/mo</span></span>
                <button className="px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">Upgrade</button>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'Contact' && (
          <section className="mb-8 bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <form className="max-w-lg mx-auto flex flex-col gap-4">
              <input type="text" placeholder="Your Name" className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              <input type="email" placeholder="Your Email" className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              <textarea placeholder="Your Message" rows={4} className="border border-gray-300 rounded px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200" />
              <button type="submit" className="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Send Message</button>
            </form>
            <div className="mt-6 text-center text-gray-500 text-sm">Or email us at <a href="mailto:info@humanotext.com" className="text-blue-600 hover:underline">info@humanotext.com</a></div>
          </section>
        )}
      </div>
    </div>
  );
}