"use client";

import { Button } from "@/app/_components/ui/button";
import { creteStripeCheckout } from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanoButton = () => {
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

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanoClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanoButton;
