"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { CarouselDemo } from "@/components/Carousel";
import { MovieSection } from "@/components/MovieSection";
import { Header } from "@/components/Header";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        };

        const popularRes = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          { headers },
        );

        const upcomingRes = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          { headers },
        );

        const topRatedRes = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          { headers },
        );

        setPopularMovies(popularRes.data.results);
        setUpcomingMovies(upcomingRes.data.results);
        setTopRatedMovies(topRatedRes.data.results);
      } catch (error) {
        console.log("TMDB API error:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <Header />

        <CarouselDemo movies={popularMovies} />

        <MovieSection title="Upcoming" movies={upcomingMovies.slice(0, 10)} />

        <MovieSection title="Popular" movies={popularMovies.slice(0, 10)} />

        <MovieSection title="Top Rated" movies={topRatedMovies.slice(0, 10)} />
      </main>
    );
  }

  return (
    <main className="bg-white">
      <Header />

      <CarouselDemo movies={popularMovies} />

      <MovieSection title="Upcoming" movies={upcomingMovies.slice(0, 10)} />

      <MovieSection title="Popular" movies={popularMovies.slice(0, 10)} />

      <MovieSection title="Top Rated" movies={topRatedMovies.slice(0, 10)} />
    </main>
  );
}
