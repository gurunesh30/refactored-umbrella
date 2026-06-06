import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

export const dynamic = 'force-dynamic'

export async function GET() {
  const diagnostics: any = {}

  // 1. Supabase Health Check
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      // Lightweight validation query on profiles table
      const { data, error } = await supabase.from('profiles').select('id').limit(1)
      if (error) {
        diagnostics.supabase = {
          status: "failed",
          error: error.message,
          configured: true
        }
      } else {
        diagnostics.supabase = {
          status: "success",
          message: "Successfully connected to Supabase and queried profiles table.",
          configured: true
        }
      }
    } catch (err: any) {
      diagnostics.supabase = {
        status: "failed",
        error: err.message || "Unknown error occurred.",
        configured: true
      }
    }
  } else {
    diagnostics.supabase = {
      status: "not_configured",
      message: "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing.",
      configured: false
    }
  }

  // 2. Stripe Health Check
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (stripeSecretKey) {
    try {
      const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2026-05-27.dahlia" as any,
      })
      // Attempt to retrieve products list to confirm API key authorization
      await stripe.products.list({ limit: 1 })
      diagnostics.stripe = {
        status: "success",
        message: "Successfully authenticated Stripe API key and fetched products list.",
        configured: true
      }
    } catch (err: any) {
      diagnostics.stripe = {
        status: "failed",
        error: err.message || "Unknown Stripe error occurred.",
        configured: true
      }
    }
  } else {
    diagnostics.stripe = {
      status: "not_configured",
      message: "Stripe secret key (STRIPE_SECRET_KEY) is missing.",
      configured: false
    }
  }

  // 3. Vercel Health Check
  const vercelProjectId = process.env.VERCEL_PROJECT_ID
  const vercelOrgId = process.env.VERCEL_ORG_ID

  if (vercelProjectId && vercelOrgId) {
    diagnostics.vercel = {
      status: "success",
      message: "Vercel environment variables (VERCEL_PROJECT_ID, VERCEL_ORG_ID) are configured.",
      configured: true
    }
  } else {
    diagnostics.vercel = {
      status: "not_configured",
      message: "Vercel environment variables (VERCEL_PROJECT_ID, VERCEL_ORG_ID) are missing.",
      configured: false
    }
  }

  // Determine overall status
  const services = Object.values(diagnostics) as any[]
  const hasFailed = services.some(s => s.status === "failed")
  const overallStatus = hasFailed ? "error" : "healthy"

  const response = NextResponse.json({
    status: overallStatus,
    timestamp: new Date().toISOString(),
    diagnostics
  })

  // CORS headers
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")

  return response
}

export async function OPTIONS() {
  const response = new Response(null, { status: 204 })
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")
  return response
}
