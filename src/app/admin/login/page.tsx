"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Shield, Lock, Eye, EyeOff, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"login" | "mfa" | "mfa-enroll">("login");
  
  // Security lock states
  const [isLocked, setIsLocked] = useState(false);
  const [lockAttemptsInfo, setLockAttemptsInfo] = useState<{ pw: number; mfa: number } | null>(null);

  // MFA Enrollment info
  const [enrollmentData, setEnrollmentData] = useState<{
    factorId: string;
    secret: string;
    qrCodeSvg?: string;
  } | null>(null);

  // Active MFA factor for challenge
  const [activeFactor, setActiveFactor] = useState<{
    factorId: string;
    challengeId: string;
  } | null>(null);

  // Check lock on email blur or change
  const checkAccountLock = async (targetEmail: string) => {
    if (!isSupabaseConfigured || !targetEmail) return;
    try {
      const { data, error } = await supabase.rpc("check_login_lock", {
        admin_email: targetEmail,
      });
      if (error) throw error;
      if (data && data.length > 0) {
        const lockInfo = data[0];
        setIsLocked(lockInfo.is_locked);
        setLockAttemptsInfo({
          pw: lockInfo.failed_password_attempts,
          mfa: lockInfo.failed_mfa_attempts,
        });
      }
    } catch (err) {
      console.error("Lock check failed:", err);
    }
  };

  useEffect(() => {
    if (email) {
      checkAccountLock(email);
    }
  }, [email]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isSupabaseConfigured) {
      // Mock admin login
      if (email === "admin@nainihanvi.com" && password === "admin123") {
        router.push("/admin");
      } else {
        setError("Invalid mock credentials. (Use admin@nainihanvi.com / admin123)");
      }
      setLoading(false);
      return;
    }

    try {
      // 1. Double check lock status
      const { data: lockData, error: lockErr } = await supabase.rpc("check_login_lock", {
        admin_email: email,
      });
      if (lockErr) throw lockErr;
      if (lockData && lockData[0]?.is_locked) {
        setIsLocked(true);
        setError("This account is temporarily or permanently locked. Please contact support.");
        setLoading(false);
        return;
      }

      // 2. Perform password login
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Record password failure
        const { data: updateLock } = await supabase.rpc("record_login_attempt", {
          admin_email: email,
          is_success: false,
          is_mfa: false,
        });
        
        if (updateLock && updateLock[0]?.is_locked) {
          setIsLocked(true);
          setError("Account has been locked due to too many failed password attempts (Max 4).");
        } else {
          const currentPwFailed = updateLock ? updateLock[0]?.current_failed_pw : 0;
          setError(`Invalid credentials. Attempt ${currentPwFailed} of 4 before locking.`);
        }
        setLoading(false);
        return;
      }

      // Successful password login, reset failed password attempts
      await supabase.rpc("record_login_attempt", {
        admin_email: email,
        is_success: true,
        is_mfa: false,
      });

      // 3. Check for MFA factors
      const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) throw factorsError;

      const enrolledFactors = factorsData?.all || [];
      const activeFactors = enrolledFactors.filter(
        (f) => f.status === "verified"
      );

      if (activeFactors.length > 0) {
        // Active MFA factor exists, trigger challenge
        const factorId = activeFactors[0].id;
        const { data: challengeData, error: challengeError } = 
          await supabase.auth.mfa.challenge({ factorId });

        if (challengeError) throw challengeError;

        setActiveFactor({
          factorId,
          challengeId: challengeData.id,
        });
        setStep("mfa");
      } else {
        // No active factors, prompt to enroll TOTP
        const { data: enrollData, error: enrollError } = 
          await supabase.auth.mfa.enroll({
            factorType: "totp",
            issuer: "Naini Hanvi Couture",
            friendlyName: "Admin TOTP Factor"
          });

        if (enrollError) throw enrollError;

        const qrSvg = enrollData.totp.qr_code;
        const qrUri = qrSvg.startsWith("<svg")
          ? `data:image/svg+xml;utf8,${encodeURIComponent(qrSvg)}`
          : qrSvg;

        setEnrollmentData({
          factorId: enrollData.id,
          secret: enrollData.totp.secret,
          qrCodeSvg: qrUri
        });
        setStep("mfa-enroll");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!activeFactor) {
      setError("MFA challenge state missing.");
      setLoading(false);
      return;
    }

    try {
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: activeFactor.factorId,
        challengeId: activeFactor.challengeId,
        code: mfaCode,
      });

      if (verifyError) {
        // Record MFA failure
        const { data: updateLock } = await supabase.rpc("record_login_attempt", {
          admin_email: email,
          is_success: false,
          is_mfa: true,
        });

        if (updateLock && updateLock[0]?.is_locked) {
          setIsLocked(true);
          setError("Account has been locked due to too many failed MFA attempts (Max 3).");
          await supabase.auth.signOut();
          setStep("login");
        } else {
          const currentMfaFailed = updateLock ? updateLock[0]?.current_failed_mfa : 0;
          setError(`Invalid MFA code. Attempt ${currentMfaFailed} of 3 before locking.`);
        }
        setLoading(false);
        return;
      }

      // Reset failed MFA attempts on success
      await supabase.rpc("record_login_attempt", {
        admin_email: email,
        is_success: true,
        is_mfa: true,
      });

      // Redirect to Admin Panel
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "MFA verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleMfaEnrollVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!enrollmentData) {
      setError("Enrollment data missing.");
      setLoading(false);
      return;
    }

    try {
      // Challenge the newly enrolled factor
      const { data: challengeData, error: challengeError } = 
        await supabase.auth.mfa.challenge({ factorId: enrollmentData.factorId });

      if (challengeError) throw challengeError;

      // Verify the code against the challenge
      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: enrollmentData.factorId,
        challengeId: challengeData.id,
        code: mfaCode,
      });

      if (verifyError) {
        setError("Invalid verification code. Please check your authenticator app and try again.");
        setLoading(false);
        return;
      }

      // Success, route to Admin Panel
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "TOTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-200">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200 mb-4">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-serif font-extrabold text-gray-900">
            Couture Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure management console
          </p>
        </div>

        {/* Locked Screen */}
        {isLocked ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-center space-y-4">
            <Lock className="h-8 w-8 text-red-600 mx-auto" />
            <h3 className="text-lg font-semibold text-red-800">Account Locked</h3>
            <p className="text-sm text-red-700">
              This admin account has been locked due to excessive failed attempts. 
              Please contact the systems administrator to reset your lockout.
            </p>
            {lockAttemptsInfo && (
              <div className="text-xs text-red-500 pt-2 border-t border-red-100">
                Failed Password attempts: {lockAttemptsInfo.pw} | MFA: {lockAttemptsInfo.mfa}
              </div>
            )}
          </div>
        ) : (
          /* Step-based Forms */
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                {error}
              </div>
            )}

            {step === "login" && (
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="space-y-4 rounded-md">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm"
                      placeholder="admin@nainihanvi.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-sm pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors disabled:bg-amber-400"
                  >
                    {loading ? "Authenticating..." : "Login"}
                  </button>
                </div>
              </form>
            )}

            {step === "mfa" && (
              <form className="mt-8 space-y-6" onSubmit={handleMfaVerify}>
                <div className="text-center space-y-2">
                  <KeyRound className="h-8 w-8 text-amber-600 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-xs text-gray-500">
                    Enter the 6-digit verification code from your authenticator app.
                  </p>
                </div>

                <div>
                  <label htmlFor="mfa-code" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code
                  </label>
                  <input
                    id="mfa-code"
                    name="mfa-code"
                    type="text"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-center text-xl font-bold tracking-widest"
                    placeholder="000000"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors disabled:bg-amber-400"
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>
                </div>
              </form>
            )}

            {step === "mfa-enroll" && (
              <form className="mt-8 space-y-6" onSubmit={handleMfaEnrollVerify}>
                <div className="text-center space-y-2">
                  <KeyRound className="h-8 w-8 text-amber-600 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900">Enroll Authenticator (2FA)</h3>
                  <p className="text-xs text-gray-500">
                    To secure your account, scan the code or enter the secret in your Google Authenticator or Duo app.
                  </p>
                </div>

                <div className="space-y-4">
                  {enrollmentData?.qrCodeSvg ? (
                    <div className="flex justify-center border border-gray-100 p-2 bg-gray-50 rounded-lg">
                      <img src={enrollmentData.qrCodeSvg} alt="MFA QR Code" className="w-48 h-48" />
                    </div>
                  ) : null}

                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Secret Key</span>
                    <code className="text-xs font-mono font-bold break-all select-all text-amber-800">
                      {enrollmentData?.secret}
                    </code>
                  </div>

                  <div>
                    <label htmlFor="mfa-enroll-code" className="block text-sm font-medium text-gray-700 mb-1">
                      Enter Verification Code
                    </label>
                    <input
                      id="mfa-enroll-code"
                      type="text"
                      pattern="\d{6}"
                      maxLength={6}
                      required
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 text-center text-xl font-bold tracking-widest"
                      placeholder="000000"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors disabled:bg-amber-400"
                  >
                    {loading ? "Verifying Setup..." : "Verify & Enable 2FA"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  );
}
