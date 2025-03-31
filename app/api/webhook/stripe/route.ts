import { prisma } from "@/lib/db";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const hadersList = await headers();
  const signature = hadersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const customerId = session.customer;

    const jobId = session.metadata?.jobId;

    if (!jobId) {
      return new Response("Missing job id", { status: 400 });
    }

    const company = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId as string,
      },
      select: {
        Company: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!company) {
      return new Response("Missing company", { status: 400 });
    }

    await prisma.jobPost.update({
      where: {
        id: jobId,
        companyId: company?.Company?.id as string,
      },
      data: {
        status: "ACTIVE",
      },
    });
  }

  return new Response(null, { status: 200 });
}
