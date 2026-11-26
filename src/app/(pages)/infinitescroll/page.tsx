
"use client";

import { useEffect, useState } from "react";
import NewsCard, { Article } from "@/src/app/component/NewsCard";

export default function InfiniteScrollPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/news?page=${page}`);
        const data = await response.json();
        console.log("Requested Page:", page);
        console.log("Articles Received:", data.articles?.length);
        console.log("Total Results:", data.totalResults);
        console.log("API Response:", data);

        if (data.articles && data.articles.length > 0) {
          setArticles((previousArticles) => [
            ...previousArticles,
            ...data.articles,
          ]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (
        scrollPosition >= pageHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((previousPage) => previousPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);


  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="mb-3 text-center text-3xl font-bold text-gray-800">
        Latest News
      </h1>
      <p className="mb-5 text-center text-gray-500">
        Explore the latest technology news
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>

      {loading && (
        <p className="py-8 text-center text-lg font-semibold">
          Loading more news...
        </p>
      )}

      {!hasMore && (
        <p className="py-8 text-center text-gray-500">
          No more news available.
        </p>
      )}
    </main>
  );
}
