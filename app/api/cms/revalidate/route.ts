import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type WebhookBody = {
  _type?: string;
  slug?: string | { current?: string };
};

function matchesSecret(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function POST(request: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  const received = request.headers.get("x-sanity-secret") || "";

  if (!expected || !received || !matchesSecret(received, expected)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: WebhookBody;
  try {
    body = (await request.json()) as WebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;

  if (body._type === "product") {
    revalidateTag("catalog", "max");
    revalidatePath("/");
    revalidatePath("/products/");
    if (slug) {
      revalidateTag(`product:${slug}`, "max");
      revalidatePath(`/products/${slug}/`);
    }
  } else if (body._type === "locationPage") {
    revalidateTag("location-sitemap", "max");
    revalidatePath("/locations/");
    revalidatePath("/sitemap.xml");
    if (slug) {
      revalidateTag(`location:${slug}`, "max");
      revalidatePath(`/locations/${slug}/`);
    }
  } else if (body._type === "page") {
    revalidateTag("page-sitemap", "max");
    revalidatePath("/sitemap.xml");
    if (slug) {
      revalidateTag(`page:${slug}`, "max");
      revalidatePath(`/content/${slug}/`);
    }
  } else {
    revalidatePath("/");
  }

  return NextResponse.json({ revalidated: true, type: body._type || null, slug: slug || null });
}
