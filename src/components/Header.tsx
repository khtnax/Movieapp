"use client";

import Link from "next/link";
import { Search, ChevronDown, ChevronRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 99, name: "Documentary" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");
  const [showGenre, setShowGenre] = useState(false);

  const handleSearch = () => {
    if (searchValue.trim() === "") return;
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-black dark:text-white">
      <div className="relative mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold italic text-purple-600">
          Movie Z
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowGenre(!showGenre)}
              className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Genre
              <ChevronDown size={16} />
            </button>

            {showGenre && (
              <div className="absolute left-0 top-[48px] w-[520px] rounded-xl border bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-black dark:text-white">
                <h2 className="text-xl font-bold">Genres</h2>
                <p className="mt-1 text-sm text-gray-500">
                  See lists of movies by genre
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/genre/${genre.id}?name=${genre.name}`}
                      onClick={() => setShowGenre(false)}
                      className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium hover:bg-purple-600 hover:text-white"
                    >
                      {genre.name}
                      <ChevronRight size={12} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex w-[360px] items-center gap-2 rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-black">
            <Search size={16} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="rounded-md border p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
