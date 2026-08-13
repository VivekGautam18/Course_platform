import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AuthPageProps {
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const { login, register, forgotPassword } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      if (mode === "login") {

        const res = await login(email, password);

        if (!res.success) {
          setError(res.message);
          return;
        }

        onSuccess();

      } else {

        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }

        const res = await register(
          name,
          email,
          phone,
          password
        );

        if (!res.success) {
          setError(res.message);
          return;
        }

        alert(
          "Registration successful. Please verify your email before logging in."
        );

        setMode("login");

      }

    } finally {

      setLoading(false);

    }

  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await forgotPassword(forgotEmail);
    setMsg(res.message);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md overflow-hidden text-left">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 text-white text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-white font-black text-xl mx-auto flex items-center justify-center border border-white/20">
            SG
          </div>
          <h2 className="text-xl font-bold pt-1">Sneha Gupta Portal</h2>
          <p className="text-xs text-blue-100">CA Inter & Final Student Authentication</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@gmail.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
          {mode === "register" && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Confirm Password *
              </label>

              <div className="relative">

                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />

                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900 dark:text-white"
                />

              </div>

            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                WhatsApp Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9123456789"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
          )}
          {
            error && (

              <div className="rounded-xl bg-red-100 border border-red-300 p-3 text-sm text-red-600">

                {error}

              </div>

            )
          }
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2"
          >
            <span>

              {loading
                ? "Please wait..."
                : mode === "login" 
                  ? "Login to Portal"
                  : "Create Account"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2 text-xs text-slate-500">
            {mode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Register Here
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Login Here
                </button>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full space-y-4 text-left border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Reset Password</h3>
            {msg ? (
              <p className="text-xs text-emerald-600 font-semibold">{msg}</p>
            ) : (
              <form onSubmit={handleForgot} className="space-y-3">
                <p className="text-xs text-slate-500">Enter your registered email address to receive reset link.</p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl"
                >
                  Send Reset Link
                </button>
              </form>
            )}
            <button
              onClick={() => {
                setShowForgotModal(false);
                setMsg('');
              }}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
