import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';
import { Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('CUSTOMER');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
        if (response.data.success) {
          const token = response.data.data.token;
          axios.defaults.headers.common['Authorization'] = "Bearer " + token;
          
          const meRes = await axios.get('http://localhost:8080/api/users/me');
          const me = meRes.data.data;
          
          const userRoles = me.roles?.map((r: any) => r.name) || ['ROLE_USER'];
          const userObj = { id: me.id, username: me.username, roles: userRoles };
          
          login(token, userObj);
          
          if (userRoles.includes('ROLE_ADMIN')) navigate('/dashboard');
          else if (userRoles.includes('ROLE_SUPPLIER')) navigate('/supplier/dashboard');
          else navigate('/customers/portal');
        }
      } else {
        let roles = ['ROLE_USER'];
        if (accountType === 'CUSTOMER') roles = ['ROLE_USER', 'ROLE_CUSTOMER'];
        if (accountType === 'SUPPLIER') roles = ['ROLE_USER', 'ROLE_SUPPLIER'];

        await axios.post('http://localhost:8080/api/auth/register', {
          username,
          password,
          email,
          roles
        });
        setSuccess('Account created successfully! Please sign in.');
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      
      <div className="relative w-full max-w-5xl h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        
        {/* Forms Container */}
        <motion.div 
          className="absolute top-0 w-full lg:w-1/2 h-full flex flex-col justify-center px-8 sm:px-16 bg-white z-0"
          animate={{ x: isLogin ? "0%" : "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-full max-w-sm mx-auto"
            >
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                {isForgotMode ? "Reset Password" : isLogin ? "Sign in to Shopluxe" : "Create Account"}
              </h1>
              <p className="text-sm font-medium text-slate-500 mb-8">
                {isLogin ? 'Use your credentials to access your portal.' : 'Join the most premium marketplace today.'}
              </p>

              {error && <div className="p-3 mb-6 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl">{error}</div>}
              {success && <div className="p-3 mb-6 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-bold rounded-xl">{success}</div>}

                            <form onSubmit={handleSubmit} className="space-y-4">
                
                {isForgotMode ? (
                  <>
                    <p className="text-xs text-slate-500 mb-4 font-semibold">Enter your email address to receive a password reset link.</p>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                        value={email} onChange={e => setEmail(e.target.value)} required
                      />
                    </div>
                    <div className="flex justify-between items-center pb-2 mt-4">
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotMode(false); }} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Back to Login</a>
                    </div>
                    <button type="button" onClick={async () => { 
  if (!email) { setError('Please enter your email'); return; }
  try {
    setIsLoading(true);
    const res = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
    setSuccess(res.data.message);
    setIsForgotMode(false);
  } catch (err) {
    setError('Failed to send email. Ensure the backend SMTP is configured.');
  } finally {
    setIsLoading(false);
  }
}} className="w-full bg-[#111] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center mt-4">
                      Send Recovery Link
                    </button>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                        value={username} onChange={e => setUsername(e.target.value)} required
                      />
                    </div>

                    {!isLogin && (
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                          value={email} onChange={e => setEmail(e.target.value)} required
                        />
                      </div>
                    )}

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                        value={password} onChange={e => setPassword(e.target.value)} required
                      />
                    </div>

                    {!isLogin && (
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select 
                          className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors appearance-none"
                          value={accountType} onChange={e => setAccountType(e.target.value)}
                        >
                          <option value="CUSTOMER">Customer Account</option>
                          <option value="SUPPLIER">Supplier / Vendor</option>
                        </select>
                      </div>
                    )}

                    {isLogin && (
                      <div className="flex justify-end pb-2">
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotMode(true); }} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">Forgot your password?</a>
                      </div>
                    )}

                    <button 
                      disabled={isLoading}
                      type="submit" 
                      className="w-full bg-[#111] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-colors flex items-center justify-center group disabled:opacity-50 mt-4"
                    >
                      {isLoading ? 'Processing...' : (isLogin ? 'SIGN IN' : 'SIGN UP')}
                      {!isLoading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Sliding Overlay Container */}
        <motion.div 
          className="hidden lg:block absolute top-0 w-1/2 h-full z-10 overflow-hidden shadow-2xl"
          animate={{ x: isLogin ? "100%" : "0%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
        >
          {/* We use a wrapper to reverse the sliding animation so the background stays relatively still */}
          <motion.div 
            className="absolute top-0 w-[200%] h-full bg-[#111] flex"
            animate={{ x: isLogin ? "-50%" : "0%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
          >
            {/* Left side of overlay (shown during Sign Up) */}
            <div className="w-1/2 h-full relative flex items-center justify-center p-16 text-center">
              <img src="/MacBook_Pro.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Sign up" />
              <div className="relative z-10 text-white max-w-sm">
                <h2 className="text-4xl font-black mb-4">Welcome Back!</h2>
                <p className="text-sm text-slate-300 font-medium mb-8 leading-relaxed">
                  To keep connected with us please login with your personal info.
                </p>
                <button 
                  onClick={() => {setError(''); setSuccess(''); setIsLogin(true);}}
                  className="border-2 border-white text-white px-10 py-3 rounded-full text-xs font-black tracking-widest uppercase hover:bg-white hover:text-[#111] transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Right side of overlay (shown during Login) */}
            <div className="w-1/2 h-full relative flex items-center justify-center p-16 text-center">
              <img src="/PlayStation_5.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Sign in" />
              <div className="relative z-10 text-white max-w-sm">
                <h2 className="text-4xl font-black mb-4">Hello, Friend!</h2>
                <p className="text-sm text-slate-300 font-medium mb-8 leading-relaxed">
                  Enter your personal details and start your journey with Shopluxe today.
                </p>
                <button 
                  onClick={() => {setError(''); setSuccess(''); setIsLogin(false);}}
                  className="border-2 border-white text-white px-10 py-3 rounded-full text-xs font-black tracking-widest uppercase hover:bg-white hover:text-[#111] transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}






