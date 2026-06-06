"use server"

import { createServerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function linkStripeId() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const stripeId = process.env.STRIPE_CUSTOMER_ID || process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_ID
  
  if (!stripeId) {
    throw new Error("No Stripe ID found in environment variables. Please add STRIPE_CUSTOMER_ID to your .env file.")
  }

  const { error } = await supabase
    .from('profiles')
    .update({ stripe_customer_id: stripeId })
    .eq('id', user.id)

  if (error) {
    throw new Error("Failed to update database: " + error.message)
  }

  return { success: true }
}
