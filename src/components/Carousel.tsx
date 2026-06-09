"use client";

import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
};

type CarouselDemoProps = {
  movies: Movie[];
};

export function CarouselDemo({ movies }: CarouselDemoProps) {
  const featuredMovies = movies.slice(0, 5);

  return (
    <Carousel className="relative mx-auto h-[600px] w-full max-w-[1500px]">
      <CarouselContent>
        {featuredMovies.map((movie) => (
          <CarouselItem key={movie.id}>
            <Card className="h-[600px] w-full overflow-hidden rounded-none border-0">
              <CardContent className="relative h-full w-full p-0">
                {movie.backdrop_path && (
                  <img
                    src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-16 left-16 max-w-[700px] text-white">
                  <h1 className="mb-3 text-5xl font-bold">{movie.title}</h1>

                  <p className="mb-4 flex items-center gap-2 text-lg">
                    <Star fill="yellow" stroke="yellow" />
                    {movie.vote_average.toFixed(1)}/10
                  </p>

                  <p className="max-w-[600px] text-sm text-gray-200">
                    {movie.overview}
                  </p>

                  <button className="mt-6 rounded-md bg-white px-5 py-2 text-sm font-semibold text-black">
                    Watch Trailer
                  </button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />
    </Carousel>
  );
}
