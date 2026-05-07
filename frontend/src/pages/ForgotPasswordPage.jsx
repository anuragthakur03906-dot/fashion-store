import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, InputAdornment } from '@mui/material';
import { Email, ArrowBack } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await forgotPassword(email);
    setLoading(false);
    if (success) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar onCartClick={() => {}} />
        <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Email className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a password reset link to <strong>{email}</strong>.
            </p>
            <Link to="/login">
              <Button variant="contained" sx={{ backgroundColor: '#b8a99a' }}>
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar onCartClick={() => {}} />
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <Link to="/login" className="inline-flex items-center text-beige-500 hover:text-beige-600 mb-6">
            <ArrowBack className="w-4 h-4 mr-1" />
            Back to Login
          </Link>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Forgot Password?</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your email to reset password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#b8a99a',
                '&:hover': { backgroundColor: '#9e8d7c' },
                textTransform: 'none',
                py: 1.5,
              }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;