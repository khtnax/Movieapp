import Link from "next/link";
import { Star } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="cursor-pointer overflow-hidden rounded-lg bg-white text-black transition hover:scale-105 dark:bg-black dark:text-white">
        {movie.poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="h-[260px] w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-[260px] w-full items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500 dark:bg-gray-800">
            No Image
          </div>
        )}

        <div className="pt-2">
          <div className="flex items-center gap-1 text-xs text-black dark:text-white">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>{movie.vote_average.toFixed(1)}/10</span>
          </div>

          <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-black dark:text-white">
            {movie.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
