

export type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export default function NewsCard({
  article,
}: {
  article: Article;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition hover:shadow-lg">

      {/* News Image */}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="h-48 w-full shrink-0 object-cover"
        />
      )}

      {/* News Details */}
      <div className="flex flex-1 flex-col p-5">

        <p className="mb-2 text-sm font-semibold text-blue-600">
          {article.source.name}
        </p>

        <h2 className="mb-3 line-clamp-2 min-h-14 text-lg font-bold text-gray-800">
          {article.title}
        </h2>

        <p className="mb-4 line-clamp-4 text-sm leading-6 text-gray-600">
          {article.description || "No description available."}
        </p>

        <p className="mt-auto mb-4 text-xs text-gray-400">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Read More
        </a>

      </div>
    </div>
  );
}
