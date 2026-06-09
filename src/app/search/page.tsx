import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type SearchPageProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

async function searchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await res.json();
  return data.results;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;

  const movies = query ? await searchMovies(query) : [];

  return (
    <main className="min-h-screen bg-white dark:bg-black dark:text-white">
      <Header />

      <section className="mx-auto max-w-[1200px] px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold">Search result: {query}</h1>

        {movies.length === 0 ? (
          <p className="text-gray-500">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
