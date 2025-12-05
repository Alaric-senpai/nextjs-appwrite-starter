"use client"
import { Button } from "@/components/ui/button"
import { FieldSeparator } from "@/components/ui/field"
import { Models } from "node-appwrite"
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




interface SocialLoginProps {
  mode: "login" | "signup"
}

export function SocialLogin({ mode='login' }: SocialLoginProps) {
  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login logic
    console.log(`${mode} with ${provider}`)
  }

  return (
    <>
      <FieldSeparator className="my-6">OR</FieldSeparator>

      <div className="flex flex-col gap-3 w-full">
        {socialMediaButtons.map((button) => (
          <Button
            key={button.provider}
            variant="outline"
            type="button"
            onClick={() => handleSocialLogin(button.provider)}
            className="h-11 gap-3 hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20 transition-all"
          >
            <div className="grid place-items-center rounded-full bg-white dark:bg-white size-7 p-1">
              <img src={button.src} alt={button.label} width={20} height={20} />
            </div>
            <span className="text-sm font-medium">
              Continue with {button.label}
            </span>
          </Button>
        ))}
      </div>
    </>
  )
}
