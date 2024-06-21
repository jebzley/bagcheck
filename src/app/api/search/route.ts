import { URL } from "@/constants/url";
import type { NextRequest } from "next/server";

// TODO: Make an interface that works around the app
export interface CoinResponse {
  api_symbol: string;
  id: string;
  large: string;
  market_cap_rank: number;
  name: string;
  symbol: string;
  thumb: string;
}

export interface SearchCoinResponse {
  coins: CoinResponse[];
}
// TODO: API error handling
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const term = params.get("term");

  const route = [
    URL.COINGECKO.BASE_ROUTE,
    URL.COINGECKO.SEARCH,
    term ?? "",
    URL.COINGECKO.API_KEY_QUERY_PARAM,
    process.env.COINGECKO_API_KEY,
  ].join("");

  const response = await fetch(route);
  const result = await response.json();
  const coins: SearchCoinResponse = result.coins;
  return Response.json({ coins });
}
