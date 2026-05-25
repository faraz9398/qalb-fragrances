"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function StudioRedirectPage() {
  return (
    <div className="min-h-screen bg-qalb-cream flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-qalb-gold/10 flex items-center justify-center mx-auto mb-4">
          <span className="font-heading text-2xl text-qalb-gold">CMS</span>
        </div>
        <h1 className="font-heading text-xl text-qalb-black mb-2">
          Content Management
        </h1>
        <p className="text-sm text-qalb-black/50 mb-6">
          Manage your products, pages, and site settings.
        </p>

        <div className="space-y-3">
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-qalb-black text-qalb-cream text-sm rounded-md hover:bg-qalb-gold hover:text-qalb-black transition-all"
          >
            <ExternalLink size={16} />
            Open Sanity Dashboard
          </a>
          <Link
            href="/"
            className="block text-xs text-qalb-black/40 hover:text-qalb-gold transition-colors"
          >
            Back to site
          </Link>
        </div>

        <p className="text-xs text-qalb-black/30 mt-6">
          After setting up your Sanity project, you&apos;ll manage content at{" "}
          <code className="bg-qalb-black/5 px-1 rounded text-[10px]">
            your-project-id.sanity.studio
          </code>
        </p>
      </div>
    </div>
  );
}
