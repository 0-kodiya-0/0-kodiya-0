import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Set your SendGrid API key (store in environment variables)
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const msg = {
      to: 'contact@sanithu-jayakody.me',     // Email goes TO your contact address
      from: 'noreply@sanithu-jayakody.me',   // Email comes FROM your no-reply address
      replyTo: email,                        // Set reply-to as the user's email
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message:

${message}
      `,
      html: `
<div>
  <h3>New Contact Form Submission</h3>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <p><strong>Message:</strong></p>
  <p>${message.replace(/\n/g, '<br>')}</p>
</div>
      `,
    };

    // Send email
    await sgMail.send(msg);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}