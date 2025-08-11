import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: 'Exhibition Website <onboarding@resend.dev>',
      to: ['hauts0726@gmail.com'],
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Email not sent' },
      { status: 500 }
    );
  }
}
