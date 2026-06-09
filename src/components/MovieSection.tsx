import { MovieCard } from "./MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type MovieSectionProps = {
  title: string;
  movies: Movie[];
};

export function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <div className="w-full bg-white dark:bg-black">
      <section className="mx-auto max-w-[1200px] px-6 py-10 text-black dark:text-white">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button className="text-sm font-medium text-purple-600 dark:text-purple-400">
            See more
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
