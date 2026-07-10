import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = (await req.json()) as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Graceful fallback when key is not set (e.g. local dev without .env)
      console.warn("RESEND_API_KEY not set — email not sent.");
      return NextResponse.json({ ok: true, warn: "Email service not configured" });
    }

    // Lazy import so Resend is never instantiated at module-level during build
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["bhakatparthapratim@gmail.com"],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      html: `
        <div style="font-family:monospace;background:#0a0a14;color:#e2e8f0;padding:32px;border-radius:12px;max-width:600px;">
          <h2 style="color:#38bdf8;margin-top:0;">New Portfolio Contact</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#94a3b8;width:80px;">From:</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#94a3b8;">Email:</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#38bdf8;">${email}</a></td></tr>
          </table>
          <hr style="border-color:rgba(255,255,255,0.1);margin:16px 0;"/>
          <p style="color:#94a3b8;margin-bottom:8px;">Message:</p>
          <p style="white-space:pre-wrap;background:rgba(255,255,255,0.05);padding:16px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
