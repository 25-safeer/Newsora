
"use client";

import { useEffect, useState } from "react";
import NewsCard, { Article } from "@/src/app/component/NewsCard";

export default function PaginationPage() {

    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchNews = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`/api/news?page=${page}`);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch news");
                }

                setArticles(data.articles);
                console.log("Current Page:", page);
                console.log("Articles received:", data.articles.length);
                console.log("Total Results:", data.totalResults);
                setTotalResults(data.totalResults);

            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNews();

    }, [page]);

    const totalPages = Math.ceil(totalResults / 12);

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">

            <div className="mx-auto max-w-7xl">

                {/* Page Heading */}
                <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
                    Latest News
                </h1>

                <p className="mb-10 text-center text-gray-500">
                    Explore the latest technology news
                </p>

                {/* Loading */}
                {loading && (
                    <p className="py-10 text-center text-lg">
                        Loading news...
                    </p>
                )}

                {/* Error */}
                {error && (
                    <p className="py-10 text-center text-red-600">
                        {error}
                    </p>
                )}

                {/* News Articles */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {articles.map((article, index) => (
                            <NewsCard
                                key={`${article.url}-${index}`}
                                article={article}
                            />
                        ))}

                    </div>
                )}

                {/* No Articles */}
                {!loading && !error && articles.length === 0 && (
                    <p className="mt-10 text-center text-gray-500">
                        No news articles found.
                    </p>
                )}

                {/* Pagination Buttons */}
                <div className="mt-12 flex items-center justify-center gap-6">

                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1 || loading}
                        className="rounded-lg bg-gray-800 px-6 py-3 text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="font-semibold text-gray-800">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages || loading}
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>

            </div>

        </main>
    );
}
