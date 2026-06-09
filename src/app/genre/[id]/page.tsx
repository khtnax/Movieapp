import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    name?: string;
  }>;
};

async function getMoviesByGenre(id: string): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies by genre");
  }

  const data = await res.json();
  return data.results;
}

export default async function GenreMoviePage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { name } = await searchParams;

  const movies = await getMoviesByGenre(id);

  return (
    <main className="min-h-screen bg-white dark:bg-black dark:text-white">
      <Header />

      <section className="mx-auto max-w-[1200px] px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold">
          {name ? `${name} Movies` : "Genre Movies"}
        </h1>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
