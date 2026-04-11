import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OpenStemNeo — Học khoa học như một nhà khoa học",
    template: "%s · OpenStemNeo",
  },
  description:
    "Nền tảng học khoa học K12 tiếng Việt theo mô hình phenomenon-based. Việt hóa từ OpenSciEd — mở, miễn phí, dành cho học sinh và giáo viên.",
  applicationName: "OpenStemNeo",
  keywords: [
    "OpenStemNeo",
    "OpenSciEd",
    "khoa học",
    "K12",
    "phenomenon-based",
    "học sinh",
    "giáo viên",
    "OER",
  ],
  authors: [{ name: "OpenStemNeo" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "OpenStemNeo — Học khoa học như một nhà khoa học",
    description:
      "Nền tảng học khoa học K12 tiếng Việt. Mỗi bài học bắt đầu từ một hiện tượng có thật.",
    siteName: "OpenStemNeo",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenStemNeo",
    description: "Học khoa học K12 qua hiện tượng. Tiếng Việt. Mở.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${sans.variable} ${mono.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
