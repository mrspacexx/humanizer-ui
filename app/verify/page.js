"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VerifyPageContent() {
  const [verificationStatus, setVerificationStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get("token");
    
    if (!token) {
      setVerificationStatus("error");
      setMessage("Invalid verification link. Please check your email for the correct link.");
      return;
    }
    
    // Call verification API
    verifyEmail(token);
  }, [searchParams]);
  
  const verifyEmail = async (token) => {
    try {
      const response = await fetch("https://yzbs5m62yw9odw-8000.proxy.runpod.net/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setVerificationStatus("success");
        setMessage("Email verified successfully! You can now sign in to your account.");
      } else {
        setVerificationStatus("error");
        setMessage(data.detail || "Verification failed. Please try again or contact support.");
      }
    } catch (error) {
      setVerificationStatus("error");
      setMessage("Connection error. Please check your internet and try again.");
    }
  };
  
  const handleSignIn = () => {
    window.location.href = "/";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-500/25 to-pink-500/25 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
      </div>
      
      {/* Verification Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
            <svg className="w-12 h-12" viewBox="0 0 64 64">
              <path d="M12 20 Q12 12 20 12 L44 12 Q52 12 52 20 L52 40 Q52 48 44 48 L20 48 Q12 48 12 40 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
              <path d="M20 48 L16 56 L20 64 L24 56 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.2"/>
              <ellipse cx="32" cy="34" rx="8" ry="10" fill="#f8fafc" stroke="#9ca3af" strokeWidth="1.2"/>
              <circle cx="38" cy="32" r="1.8" fill="#1f2937"/>
              <path d="M28 36 Q32 38 36 36" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="32" cy="30" r="3.5" fill="#fbbf24" opacity="0.9"/>
              <circle cx="32" cy="30" r="2.5" fill="#fde047" opacity="0.8"/>
              <circle cx="32" cy="30" r="1.5" fill="#fef3c7" opacity="0.7"/>
              <circle cx="32" cy="30" r="0.8" fill="#ffffff" opacity="0.9"/>
              <rect x="14" y="16" width="3" height="3" fill="#3b82f6" opacity="0.8"/>
              <rect x="18" y="16" width="3" height="3" fill="#3b82f6" opacity="0.6"/>
              <rect x="22" y="16" width="3" height="3" fill="#3b82f6" opacity="0.4"/>
              <path d="M42 16 Q44 18 46 16" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
              <path d="M42 20 Q44 22 46 20" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
            </svg>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
          Email Verification
        </h1>
        <p className="text-white/70 text-center mb-8">
          Verifying your email address...
        </p>
        
        {/* Status Content */}
        <div className="text-center">
          {verificationStatus === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-white/80">Verifying your email...</p>
            </div>
          )}
          
          {verificationStatus === "success" && (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Verification Successful!</h3>
                <p className="text-white/80 mb-6">{message}</p>
                <button 
                  onClick={handleSignIn}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign In Now
                </button>
              </div>
            </div>
          )}
          
          {verificationStatus === "error" && (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Verification Failed</h3>
                <p className="text-white/80 mb-6">{message}</p>
                <button 
                  onClick={handleSignIn}
                  className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Go to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 font-sans flex items-center justify-center p-4">
        <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-12 max-w-md w-full shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-white/80 mt-4">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  );
} 