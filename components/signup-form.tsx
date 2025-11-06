"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createUser } from "@/backend/database/post-user"
import { preventSpaces } from "@/utils/input-validations"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    preventSpaces(e);
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match")
      }

      // Validate password length
      if (formData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Create user with plain password for now
      const response = await createUser({
        username: formData.username,
        password: formData.password // This will be replaced with hashed password later
      })

      if (!response.success) {
        throw new Error(response.error)
      }

      // Redirect to login or dashboard
      window.location.href = "/sign-in"

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your username below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="myUsername"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <FieldDescription>
                  You&apos;ll use this for logging in.
                </FieldDescription>
              </Field>
              <Field>
                <Field className="grid grid-cols-1 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Already have an account?
              </FieldSeparator>
              <FieldDescription className="text-center">
                <a href="/sign-in">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-primary relative hidden md:block">
            {/* <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
