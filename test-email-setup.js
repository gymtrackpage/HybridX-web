// Simple test script to verify email configuration
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env' });

async function testEmailSetup() {
  console.log('Testing email configuration...\n');

  console.log('SMTP Settings:');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Port:', process.env.SMTP_PORT);
  console.log('User:', process.env.SMTP_USER);
  console.log('From:', process.env.SMTP_FROM);
  console.log('Password configured:', process.env.SMTP_PASSWORD ? 'Yes' : 'No');
  console.log('');

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    // Send test email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"HybridX Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself
      subject: 'HybridX Email Setup Test ✅',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #fadb5c; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #000000;">Email Setup Successful!</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #000000;">✅ Your SMTP configuration is working correctly!</h2>
            <p style="color: #333333; line-height: 1.6;">
              This test email confirms that your HybridX training plan email system is ready to send automated emails.
            </p>
            <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #fadb5c;">
              <p style="margin: 5px 0;"><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</p>
              <p style="margin: 5px 0;"><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</p>
              <p style="margin: 5px 0;"><strong>From Email:</strong> ${process.env.SMTP_FROM}</p>
            </div>
            <p style="color: #333333;">
              Next step: Test the full training plan generation by submitting the form on your website!
            </p>
          </div>
          <div style="background-color: #000000; padding: 20px; text-align: center; color: #ffffff; font-size: 12px;">
            <p style="margin: 0;">HybridX Email System Test</p>
          </div>
        </div>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\nCheck your inbox:', process.env.SMTP_USER);

  } catch (error) {
    console.error('❌ Error:', error.message);

    if (error.code === 'EAUTH') {
      console.log('\n⚠️  Authentication failed. Please check:');
      console.log('   1. SMTP_USER is correct');
      console.log('   2. SMTP_PASSWORD is the correct App Password (16 characters, no spaces)');
      console.log('   3. 2-Step Verification is enabled in your Google account');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n⚠️  Connection failed. Please check:');
      console.log('   1. SMTP_HOST is correct (should be smtp.gmail.com)');
      console.log('   2. SMTP_PORT is correct (should be 587)');
      console.log('   3. Your internet connection is working');
    }
  }
}

testEmailSetup();
