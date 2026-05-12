"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/infrastructure/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [orgName, setOrgName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const router = useRouter()
  const { loginWithPassword, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      if (isLogin) {
        const { error: loginError } = await loginWithPassword(email, password)
        if (loginError) {
          setError(loginError.message)
          return
        }
        router.push("/dashboard")
        router.refresh()
      } else {
        const { data, error: signUpError } = await signUp(email, password, fullName, orgName)
        
        if (signUpError) {
          // If the error is about existing user but we successfully created org/profile in a retry, 
          // or if it's a specific DB error, we catch it here.
          setError(signUpError.message || "Sign up failed. Please try again.")
          return
        }

        // Handle success
        if (data?.session) {
          setSuccessMessage("Account created successfully! Redirecting to dashboard...")
          setTimeout(() => {
            router.push("/dashboard")
            router.refresh()
          }, 2000)
        } else {
          setSuccessMessage("Account created! You can now sign in with your credentials.")
          setIsLogin(true)
          // Reset fields
          setFullName("")
          setOrgName("")
        }
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isLogin ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Enter your credentials to access your account" 
              : "Fill in the details below to get started"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {!isLogin && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    type="text"
                    placeholder="Acme Inc."
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-zinc-50 dark:bg-zinc-900"
                  />
                </div>
              </>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-zinc-50 dark:bg-zinc-900"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-zinc-50 dark:bg-zinc-900"
              />
            </div>
            
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-center">
                <p className="text-sm font-medium text-destructive">
                  {error}
                </p>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-center">
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {successMessage}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              className="w-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading 
                ? (isLogin ? "Signing in..." : "Creating account...") 
                : (isLogin ? "Sign in" : "Create account")}
            </Button>
            <div className="text-center text-sm">
              {isLogin ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false)
                      setError(null)
                      setSuccessMessage(null)
                    }}
                    className="font-medium underline underline-offset-4"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true)
                      setError(null)
                      setSuccessMessage(null)
                    }}
                    className="font-medium underline underline-offset-4"
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
