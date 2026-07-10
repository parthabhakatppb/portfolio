import { ImageResponse } from "next/og";
import { resume } from "@/data/resume";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(_req: NextRequest): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0a0a14",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 9999,
            border: "1px solid rgba(56,189,248,0.3)",
            background: "rgba(56,189,248,0.08)",
            marginBottom: 32,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ fontSize: 14, fontFamily: "monospace", color: "rgba(56,189,248,0.9)", letterSpacing: "0.1em" }}>
            OPEN TO FULL-TIME ML/AI ENGINEER ROLES
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 16,
            background: "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {resume.name}
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", marginBottom: 48 }}>
          {resume.tagline}
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Deep Learning", "Agentic AI", "Computer Vision", "LLMs", "NLP"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 16px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
          }}
        >
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
            {resume.education.institution}
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            {resume.location}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
