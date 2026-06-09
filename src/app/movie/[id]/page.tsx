import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { Play, Star } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

type Genre = {
  id: number;
  name: string;
};

type Cast = {
  id: number;
  name: string;
};

type Crew = {
  id: number;
  name: string;
  job: string;
};

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
};

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type Video = {
  key: string;
  site: string;
  type: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getMovieDetail(id: string): Promise<MovieDetail> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie detail");
  }

  return res.json();
}

async function getMovieCredits(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch credits");
  }

  return res.json();
}

async function getMovieVideos(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  const data = await res.json();
  return data.results as Video[];
}

async function getMoreLikeThis(id: string): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        accept: "application/json",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const data = await res.json();
  return data.results;
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;

  const movie = await getMovieDetail(id);
  const credits = await getMovieCredits(id);
  const videos = await getMovieVideos(id);
  const moreMovies = await getMoreLikeThis(id);

  const director = credits.crew.find(
    (person: Crew) => person.job === "Director",
  );

  const writers = credits.crew
    .filter(
      (person: Crew) =>
        person.job === "Writer" ||
        person.job === "Screenplay" ||
        person.job === "Story",
    )
    .slice(0, 3);

  const stars = credits.cast.slice(0, 3) as Cast[];

  const trailer = videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <p className="mt-2 text-sm text-gray-600">
              {movie.release_date} · PG · {Math.floor(movie.runtime / 60)}h{" "}
              {movie.runtime % 60}m
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold">Rating</p>

            <div className="mt-1 flex items-center gap-2">
              <Star size={24} className="fill-yellow-400 text-yellow-400" />

              <div>
                <p className="text-sm font-bold">
                  {movie.vote_average.toFixed(1)}/10
                </p>
                <p className="text-xs text-gray-500">{movie.vote_count}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <div>
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="h-[360px] w-full rounded-md object-cover"
              />
            ) : (
              <div className="flex h-[360px] items-center justify-center rounded-md bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-md">
            {movie.backdrop_path ? (
              <img
                src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                className="h-[360px] w-full object-cover"
              />
            ) : (
              <div className="h-[360px] bg-gray-200" />
            )}

            <div className="absolute inset-0 bg-black/20" />

            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Play size={16} className="fill-black" />
                </span>
                Play trailer
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full border px-3 py-1 text-xs font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-[1000px] text-sm leading-6 text-gray-700">
          {movie.overview}
        </p>

        <div className="mt-6 max-w-[1000px] divide-y border-y">
          <div className="grid grid-cols-[120px_1fr] py-4 text-sm">
            <p className="font-bold">Director</p>
            <p>{director?.name || "Unknown"}</p>
          </div>

          <div className="grid grid-cols-[120px_1fr] py-4 text-sm">
            <p className="font-bold">Writers</p>
            <p>
              {writers.length > 0
                ? writers.map((writer: Crew) => writer.name).join(" · ")
                : "Unknown"}
            </p>
          </div>

          <div className="grid grid-cols-[120px_1fr] py-4 text-sm">
            <p className="font-bold">Stars</p>
            <p>{stars.map((star) => star.name).join(" · ")}</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">More like this</h2>
            <button className="text-sm font-medium">See more →</button>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {moreMovies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
