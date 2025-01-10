export const GET = async (req) => {
  try {
    const searchParams = await req.nextUrl.searchParams;
    if (!searchParams.get("url")) throw Error("URL PARAM NOT FOUND");
    const url = decodeURIComponent(searchParams.get("url"));

    const response = await fetch(url);
    const blob = await response.blob();

    const headers = new Headers();

    headers.set("Content-Type", "application/pdf");

    return Response.json(blob, { status: 200, statusText: "OK", headers });
  } catch (error) {
    console.log(error.message);
    return Response.json(null, { status: 400 });
  }
};
