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
    URL.COINGECKO.API_KEY_QUERY_PARAM,
    process.env.COINGECKO_API_KEY,
  ].join("");

  const response = await fetch(route);
  const result = await response.json();
  const usd = result[params.id].usd;
  return Response.json({ id: params.id, usd });
}
