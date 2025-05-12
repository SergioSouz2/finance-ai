"use client";

import { Button } from "@/app/_components/ui/button";
import { creteStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanoButton = () => {
  const { user } = useUser();
  async function handleAcquirePlanoClick() {
    const { sessionId } = await creteStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe not found");
    }
    await stripe.redirectToCheckout({ sessionId });
  }

  const hasPremiumPLan = user?.publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPLan) {
    return (
      <Button
        asChild
        variant={"link"}
        className="w-full rounded-full font-bold"
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user?.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant={"default"}
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanoClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanoButton;
