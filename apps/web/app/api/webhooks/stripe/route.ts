import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-05-27.dahlia",
  })

  // Use the Service Role client to bypass RLS
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const stripeCustomerId = session.customer as string

        if (!userId) {
          console.error("No userId found in checkout session metadata")
          break
        }

        // Upgrade the user to pro and save their Stripe customer ID
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            plan_type: "pro",
            stripe_customer_id: stripeCustomerId,
            subscription_status: "active",
          })
          .eq("id", userId)

        if (error) {
          console.error("Failed to update profile on checkout:", error.message)
        } else {
          console.log(`User ${userId} upgraded to pro plan.`)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const stripeCustomerId = subscription.customer as string

        // Downgrade the user back to free
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({
            plan_type: "free",
            subscription_status: "canceled",
          })
          .eq("stripe_customer_id", stripeCustomerId)

        if (error) {
          console.error("Failed to downgrade profile on subscription deletion:", error.message)
        } else {
          console.log(`Customer ${stripeCustomerId} downgraded to free plan.`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (err: any) {
    console.error("Error processing webhook event:", err.message)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
