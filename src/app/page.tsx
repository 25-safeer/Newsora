
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-12">
      <h1 className="mb-3 text-5xl font-extrabold text-blue-600">
        Newsora
      </h1>

      <p className="mb-12 text-center text-lg text-gray-600">
        Stay Informed. Stay Ahead.
      </p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">

        {/* Pagination */}
        <Link
          href="/pagination"
          className="rounded-2xl bg-white p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Pagination
          </h2>

          <p className="mb-6 text-gray-600">
            Explore news articles page by page using Previous and Next buttons.
          </p>

          <span className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Explore Pagination
          </span>
        </Link>

        {/* Infinite Scroll */}
        <Link
          href="/infinitescroll"
          className="rounded-2xl bg-white p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Infinite Scroll
          </h2>

          <p className="mb-6 text-gray-600">
            Discover more news automatically as you scroll down.
          </p>

          <span className="inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
            Explore Infinite Scroll
          </span>
        </Link>

      </div>

      <footer className="mt-16 text-sm text-gray-500">
        © 2026 Newsora. All rights reserved.
      </footer>
    </main>
  );
}
