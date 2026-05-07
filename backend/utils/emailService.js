// Email service using Nodemailer for SMTP
const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Fashion Store" <${process.env.SMTP_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #b8a99a;">Welcome to FashionStore!</h1>
      <p>Dear ${userName},</p>
      <p>Thank you for registering with FashionStore. We're excited to have you on board!</p>
      <p>Start exploring our exclusive collection of fashion items and enjoy a seamless shopping experience.</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
           style="background-color: #b8a99a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
          Start Shopping
        </a>
      </div>
      <p>Best regards,<br>FashionStore Team</p>
    </div>
  `;
  
  await sendEmail({
    email: userEmail,
    subject: 'Welcome to FashionStore!',
    html: html,
  });
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, userName, resetToken, resetUrl) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #b8a99a;">Password Reset Request</h1>
      <p>Dear ${userName},</p>
      <p>You requested to reset your password. Click the button below to reset it:</p>
      <div style="margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #b8a99a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </div>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This reset link will expire in 1 hour.</p>
      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 12px;">If the button doesn't work, copy and paste this link:<br>${resetUrl}</p>
      <p>Best regards,<br>FashionStore Team</p>
    </div>
  `;
  
  await sendEmail({
    email: userEmail,
    subject: 'Password Reset Request - FashionStore',
    html: html,
  });
};

// Send contact form notification to admin
const sendContactNotification = async (contactData) => {
  const { name, email, subject, message } = contactData;
  
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #b8a99a;">New Contact Form Submission</h1>
      <div style="background-color: #f5f0e8; padding: 20px; border-radius: 8px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: white; padding: 15px; border-radius: 5px;">${message}</p>
      </div>
      <p style="margin-top: 20px; color: #666;">This message was sent from your website contact form.</p>
    </div>
  `;
  
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #b8a99a;">Thank You for Contacting Us!</h1>
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to FashionStore. We have received your message and will get back to you within 24 hours.</p>
      <div style="background-color: #f5f0e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
      </div>
      <p>Best regards,<br>FashionStore Customer Support</p>
    </div>
  `;
  
  // Send to admin (your email)
  await sendEmail({
    email: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `New Contact: ${subject}`,
    html: adminHtml,
  });
  
  // Send confirmation to user
  await sendEmail({
    email: email,
    subject: 'We received your message - FashionStore',
    html: userHtml,
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendContactNotification,
};