"use client";

import { useState } from "react";
import { searchItems } from "./data/searchData";
import Link from "next/link";
import { Search, X } from "lucide-react";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = searchItems.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    );
  });

  return (
    <>
      {/* SEARCH ICON */}
      <button onClick={() => setOpen(true)}>
        <Search size={20} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-start justify-center pt-40 px-6">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <input
                autoFocus
                type="text"
                placeholder="Search services, pages, materials..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none"
              />

              <button onClick={() => setOpen(false)} className="ml-4">
                <X />
              </button>
            </div>

            {/* RESULTS */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {results.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className="block p-4 rounded-lg hover:bg-gray-50 border"
                >
                  {item.title}
                </Link>
              ))}

              {query && results.length === 0 && (
                <p className="text-gray-400 text-sm">No results found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
