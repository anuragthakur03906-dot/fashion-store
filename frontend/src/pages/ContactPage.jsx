import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { Send, Phone, Email as EmailIcon, LocationOn } from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent successfully!');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar onCartClick={() => {}} />
      <div className="min-h-screen bg-beige-50 dark:bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-400">We'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              {submitted && (
                <Alert severity="success" className="mb-6">
                  Thank you! We'll get back to you soon.
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ backgroundColor: '#b8a99a', '&:hover': { backgroundColor: '#9e8d7c' } }}
                  endIcon={<Send />}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-beige-500" />
                    <span>+91 8580909512</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <EmailIcon className="text-beige-500" />
                    <span>anuragthakur03906@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <LocationOn className="text-beige-500" />
                    <span>Himachal Pradesh, India</span>
                  </div>
                </div>
              </div>

              {/* Map or additional info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                    <span className="font-semibold text-red-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;