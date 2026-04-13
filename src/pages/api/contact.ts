import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  let body: { name?: string; email?: string; company?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }

  const { name, email, company, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Clearpath Contact <onboarding@resend.dev>',
    to: 'angshuman.rudra@gmail.com',
    replyTo: email,
    subject: `New inquiry from ${name}${company ? ` at ${company}` : ''}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #1C1917;">New Contact Form Submission</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:8px 0; color:#6b7280; width:100px;">Name</td><td style="padding:8px 0; font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0; color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:8px 0; color:#6b7280;">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
        </table>
        <hr style="border:1px solid #e5e7eb; margin:16px 0;" />
        <p style="color:#1C1917; line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
      </div>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
