import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // use this until you verify a domain
      to: "shalomatiba90@gmail.com",
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #f0eee6; padding: 32px; max-width: 600px;">
          <h2 style="color: #c8f500; margin: 0 0 24px; font-size: 20px; letter-spacing: -0.02em;">
            New message from your portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 12px 0; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td>
              <td style="padding: 12px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 12px 0; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 12px 0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #c8f500; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr style="border-bottom: 1px solid #1a1a1a;">
                <td style="padding: 12px 0; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
                <td style="padding: 12px 0; font-size: 14px;">
                    <a href="tel:${phone}" style="color: #c8f500; text-decoration: none;">${phone}</a>
                </td>
            </tr>
            ` : ""}
            ${company ? `
            <tr style="border-bottom: 1px solid #1a1a1a;">
              <td style="padding: 12px 0; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Company</td>
              <td style="padding: 12px 0; font-size: 14px;">${company}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 12px 0; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}