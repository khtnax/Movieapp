import Link from "next/link";
import { Header } from "@/components/Header";

type Genre = {
  id: number;
  name: string;
};

async function getGenres(): Promise<Genre[]> {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await res.json();
  return data.genres;
}

export default async function GenrePage() {
  const genres = await getGenres();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="mx-auto max-w-[1200px] px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold">Genres</h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}?name=${genre.name}`}
              className="rounded-xl border bg-white px-6 py-5 text-center font-semibold shadow-sm transition hover:bg-purple-600 hover:text-white"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
