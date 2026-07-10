import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = (await req.json()) as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields (name, email, message)" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim();
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Invalid email format. Please check that your email address contains '@' and a domain (e.g., yourname@gmail.com)." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

    let errors: string[] = [];

    // 1. Try sending via Resend first (SDK-based, no Cloudflare HTML blocking issues)
    if (resendApiKey && resendApiKey.startsWith("re_")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["bhakatparthapratim@gmail.com"],
          replyTo: emailRegex.test(cleanEmail) ? cleanEmail : undefined,
          subject: `Portfolio contact from ${name}`,
          html: `
            <div style="font-family:monospace;background:#0a0a14;color:#e2e8f0;padding:32px;border-radius:12px;max-width:600px;border:1px solid rgba(0,240,255,0.2);">
              <h2 style="color:#00f0ff;margin-top:0;">New Portfolio Transmission</h2>
              <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
                <tr><td style="padding:6px 0;color:#94a3b8;width:80px;">Name:</td><td style="padding:6px 0;font-weight:bold;color:#fff;">${name}</td></tr>
                <tr><td style="padding:6px 0;color:#94a3b8;">Email:</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#00f0ff;text-decoration:none;">${email}</a></td></tr>
              </table>
              <hr style="border-color:rgba(255,255,255,0.1);margin:16px 0;"/>
              <p style="color:#94a3b8;margin-bottom:8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message Content:</p>
              <p style="white-space:pre-wrap;background:rgba(255,255,255,0.04);padding:16px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);color:#e2e8f0;line-height:1.6;">${message}</p>
            </div>
          `,
        });

        if (!error && data?.id) {
          return NextResponse.json({ ok: true, id: data.id, provider: "resend" });
        } else if (error) {
          console.warn("Resend attempt failed:", error.message);
          errors.push(`Resend: ${error.message}`);
        }
      } catch (resendErr: any) {
        console.warn("Resend exception:", resendErr.message);
        errors.push(`Resend: ${resendErr.message}`);
      }
    }

    // 2. Try sending via Web3Forms (or fallback if Resend had domain errors)
    if (web3formsKey) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            subject: `New Portfolio Contact from ${name}`,
            message,
          }),
        });

        const textResponse = await web3Res.text();
        // Safely check if response is JSON or HTML/Cloudflare check
        if (textResponse.trim().startsWith("<")) {
          console.warn("Web3Forms returned HTML instead of JSON:", textResponse.slice(0, 150));
          errors.push("Web3Forms returned HTML (possible Cloudflare block or invalid access key)");
        } else {
          let web3Data;
          try {
            web3Data = JSON.parse(textResponse);
          } catch (parseErr) {
            errors.push("Web3Forms returned invalid JSON");
          }

          if (web3Data?.success) {
            return NextResponse.json({ ok: true, provider: "web3forms" });
          } else if (web3Data) {
            console.warn("Web3Forms API error:", web3Data.message);
            errors.push(`Web3Forms: ${web3Data.message || "Failed to submit"}`);
          }
        }
      } catch (web3Err: any) {
        console.warn("Web3Forms network error:", web3Err.message);
        errors.push(`Web3Forms: ${web3Err.message}`);
      }
    }

    // 3. If we got here, neither provider succeeded
    if (errors.length > 0) {
      return NextResponse.json(
        { error: `Email provider error: ${errors.join(" | ")}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "No valid API keys (RESEND_API_KEY or WEB3FORMS_ACCESS_KEY) found in server environment (.env.local).",
      },
      { status: 503 }
    );
  } catch (err: any) {
    console.error("Contact API exception:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
