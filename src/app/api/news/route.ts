
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page") || "1";
    const query = searchParams.get("q") || "technology";

    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { message: "API key is missing" },
        { status: 500 }
      );
    }

    const url = new URL(
      "https://newsapi.org/v2/everything"
    );

    url.searchParams.set("q", query);
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", "12");
    url.searchParams.set("sortBy", "publishedAt");

    const response = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": apiKey,
      },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "News API error" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
