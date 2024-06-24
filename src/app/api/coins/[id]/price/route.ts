import { URL } from "@/constants/url";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const route = [
    URL.COINGECKO.BASE_ROUTE,
    URL.COINGECKO.PRICE,
    `${params.id}`,
    URL.COINGECKO.VS_USD,
    URL.COINGECKO.PRECISION_2,
    URL.COINGECKO.INCLUDE_MCAP,
    URL.COINGECKO.API_KEY_QUERY_PARAM,
    process.env.COINGECKO_API_KEY,
  ].join("");

  try {
    const response = await fetch(route);
    const result = await response.json();
    const usd = result[params.id].usd;
    const mcap = result[params.id].usd_market_cap;
    return Response.json({ id: params.id, usd, mcap });
  } catch (error) {
    throw new Error(`could not fetch price for ${params.id}`);
  }
}
