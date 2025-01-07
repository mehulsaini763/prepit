export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request) {
  await request;
  const baseAmount = process.env.BASE_AMOUNT;
  return Response.json(baseAmount);
}
