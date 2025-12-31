"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

export default function SignUpClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const BACKEND_URL = "https://treazoxbackend.vercel.app/api/users/signup";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ SAFE: runs only on client
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setReferralCode(ref);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!acceptPolicy) {
      toast.error("You must accept the Terms & Policy!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          referralCode,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success(data.message || "Signup successful!");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <Toaster position="top-right" />

      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />

          {/* ✅ Auto-filled from URL */}
          <input
            placeholder="Referral Code (optional)"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />

          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={acceptPolicy} onChange={e => setAcceptPolicy(e.target.checked)} />
            I accept the <Link href="/policy">Terms & Policy</Link>
          </label>

          <button disabled={loading} className="w-full bg-primary text-white py-3 rounded">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
