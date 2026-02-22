"use client"
import { Button } from "@/components/ui/button"
import { FieldSeparator } from "@/components/ui/field"
import { OAuthServerAction } from "@/actions/auth.actions"
import { useAction } from "next-safe-action/hooks"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

const socialMediaButtons = [
  {
    src: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
    label: "Google",
    provider: "google"
  },
  {
    src: "https://cdn.brandfetch.io/idZAyF9rlg/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1719469980739",
    label: "GitHub",
    provider: "github"
  }
]

// Additional providers available: microsoft, apple, facebook
const allProviders = [
  ...socialMediaButtons,
  {
    src: "https://cdn.brandfetch.io/idAnr3QEFq/theme/dark/symbol.svg",
    label: "Microsoft",
    provider: "microsoft"
  },
  {
    src: "https://cdn.brandfetch.io/idAnr3QEFq/theme/dark/symbol.svg", 
    label: "Apple",
    provider: "apple"
  },
  {
    src: "https://cdn.brandfetch.io/idFdo8ulhr/theme/dark/symbol.svg",
    label: "Facebook", 
    provider: "facebook"
  }
]

interface SocialLoginProps {
  mode?: "login" | "signup"
  showAllProviders?: boolean
}

export function SocialLogin({ showAllProviders = false }: SocialLoginProps) {
  const [error, setError] = useState<string | null>(null);
  const { execute, isExecuting } = useAction(OAuthServerAction, {
    onSuccess: ({ data }) => {
      if (data?.redirectUrl) {
         window.location.href = data.redirectUrl;
      }
    },
    onError: ({ error }) => {
      if (error?.serverError) {
        setError(error.serverError);
      } else {
        setError("Failed to initialize OAuth");
      }
    }
  })

  const handleSocialLogin = (provider: string) => {
    setError(null);
    execute({ provider: provider as "google" | "github" | "microsoft" | "apple" | "facebook" })
  }

  const buttons = showAllProviders ? allProviders : socialMediaButtons

  return (
    <>
      <FieldSeparator className="my-6">OR</FieldSeparator>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className={`grid gap-3 w-full ${showAllProviders ? 'grid-cols-2' : 'grid-cols-2'}`}>
        {buttons.map((button) => (
          <Button
            key={button.provider}
            variant="outline"
            type="button"
            disabled={isExecuting}
            onClick={() => handleSocialLogin(button.provider)}
            className="h-11 gap-3 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 transition-all"
          >
            <div className="grid place-items-center rounded-full bg-white dark:bg-white size-7 p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={button.src} alt={button.label} width={20} height={20} />
            </div>
            <span className="text-xs font-medium">
              {button.label}
            </span>
          </Button>
        ))}
      </div>
    </>
  )
}
