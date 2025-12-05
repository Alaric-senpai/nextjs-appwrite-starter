import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Shield, 
  Lock, 
  Mail, 
  Github, 
  Chrome,
  LayoutDashboard,
  SidebarIcon,
  User,
  Key,
  Zap,
  Database,
  CheckCircle2,
  Crown,
  Terminal as TerminalIcon,
  Code2,
  Settings,
  Repeat,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { CodeBlock } from "@/components/ui/code-block";
import { Terminal, AnimatedSpan } from "@/components/ui/terminal";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Authentication",
      description: "Complete auth system with email/password, magic links, and OAuth providers",
      items: ["Email/Password", "Magic Links", "Session Management"]
    },
    {
      icon: Chrome,
      title: "OAuth Providers",
      description: "Seamless integration with popular OAuth providers",
      items: ["GitHub OAuth", "Google OAuth", "Extensible Provider System"]
    },
    {
      icon: Lock,
      title: "Security & Middleware",
      description: "Enterprise-grade security with route protection and proxy",
      items: ["Route Guards", "Session Validation", "CSRF Protection"]
    },
    {
      icon: LayoutDashboard,
      title: "Dashboard UI",
      description: "Beautiful, responsive dashboard with modern components",
      items: ["Responsive Design", "Dark Mode Support", "Component Library"]
    },
    // {
    //   icon: SidebarIcon,
    //   title: "Navigation System",
    //   description: "Intuitive sidebar navigation with mobile support",
    //   items: ["Collapsible Sidebar", "Mobile Menu", "Active States"]
    // },
    {
      icon: User,
      title: "Account Management",
      description: "Complete user account operations and profile management",
      items: ["Profile Updates", "Password Changes", "Account Deletion"]
    },
    {
      icon: Database,
      title: "Appwrite Integration",
      description: "Full-featured Appwrite backend integration",
      items: ["Database Operations", "File Storage", "Real-time Updates"]
    },
    {
      icon: Zap,
      title: "Developer Experience",
      description: "Modern stack with best practices and tooling",
      items: ["TypeScript", "Tailwind CSS", "React Hook Form"]
    },
    {
      icon: Crown,
      title: "Role based access control",
      description: "Supports role based dashboards, allowing for your product to take off easily",
      items: ['Admin Dashboard', "Client Dashboard"]
    }
  ];

  const techStack = [
    "Next.js",
    "Appwrite",
    "TypeScript",
    "Tailwind CSS",
    "motion",
    "shadcn",
    "Zod Validation",
    "React Hook Form",
    "Lucide Icons",
    "Tanstack Query"
  ];

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-background dark:from-slate-900 dark:via-gray-900 via-background to-secondary/10 dark:to-slate-950">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b dark:bg-gray-950 backdrop-blur-md supports-backdrop-filter:bg-background/80 shadow-sm dark:shadow-md dark:shadow-primary/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link 
                href={'/'} 
                className="flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-tight group"
              >

                <h2 className="text-md">
                  Next appwrite starter
                </h2>
              </Link>
            
              {/* Nav Actions */}
              <div className="flex items-center gap-2 md:gap-4">
                <AnimatedThemeToggler />
                
                <Button 
                  asChild 
                  className="group rounded-full dark:bg-white px-4  shadow-lg hover:shadow-xl "
                >
                  <Link href={'/auth/login'} className="flex items-center justify-between gap-2 dark:text-black text-lg">
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Start</span>
                    <span className="bg-black flex items-center justify-center p-1 rounded-full size-7 transition-transform duration-300 group-hover:translate-x-1.5">
                      <ArrowRight className="size-4 group-hover:-rotate-45  duration-300 ease-in-out transition-transform text-white" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-auto px-4 py-24 md:py-40 relative overflow-hidden">
          <div className="absolute inset-0 -mx-4">
            <Spotlight />
          </div>
          
          {/* Decorative grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
          
          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <Badge variant="secondary" className="px-4 py-2 shadow-md dark:shadow-primary/10 hover:scale-105 transition-transform">
              <span className="text-xs font-semibold">✨ Production Ready Template</span>
            </Badge>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Next.js + Appwrite
              </span>
              <span className="block mt-3 bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Starter Template
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              A complete, production-ready starter template with authentication, 
              role-based dashboard, and all the features you need to build modern web applications.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              <Button asChild size="lg" className="rounded-full px-10 h-14 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                <Link href="/auth/login" className="flex items-center gap-2">
                  Start Building
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-10 h-14 text-base hover:bg-primary/5 dark:hover:bg-primary/10">
                <Link href="https://github.com" target="_blank" className="flex items-center gap-2">
                  <Github className="size-5" />
                  View on GitHub
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-500" />
                <span className="text-muted-foreground">TypeScript Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-500" />
                <span className="text-muted-foreground">Full Auth System</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-500" />
                <span className="text-muted-foreground">Production Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-primary mb-2">BUILT WITH</p>
              <h3 className="text-2xl font-bold">Modern Technologies</h3>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent" />
              <div className="flex flex-wrap justify-center gap-3 relative z-10">
                {techStack.map((tech, index) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="px-5 py-2.5 text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:bg-slate-950 dark:border-slate-800 transition-all duration-200 dark:hover:bg-primary/20 cursor-default hover:scale-110 hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="mb-4">
                <Zap className="size-3 mr-2" />
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything You Need
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A comprehensive starter template with authentication, security, 
                and beautiful UI components out of the box.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.title}
                    className="group relative p-8 rounded-2xl border bg-card/50 dark:bg-gray-950/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    
                    <div className="relative z-10">
                      <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg group-hover:shadow-primary/50 group-hover:scale-110">
                        <Icon className="size-7" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                        {feature.description}
                      </p>

                      <ul className="space-y-3">
                        {feature.items.map((item) => (
                          <li key={item} className="flex items-start text-sm group/item">
                            <CheckCircle2 className="size-4 mr-2 mt-0.5 text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                            <span className="group-hover/item:text-foreground transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Authentication Features */}
        <section className="container mx-auto px-4 py-24 bg-secondary/5 dark:bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    <Shield className="size-3 mr-2" />
                    Authentication
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Multiple Auth Methods
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Support for email/password authentication, magic links, and OAuth 
                    providers including GitHub and Google. Secure, scalable, and easy to extend.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Mail className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2 text-lg">Email Authentication</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Traditional email/password login with magic link support for passwordless authentication
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Github className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2 text-lg">GitHub OAuth</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        One-click login with GitHub accounts, perfect for developer-focused applications
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Chrome className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2 text-lg">Google OAuth</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Seamless Google authentication integration for mainstream users
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-linear-to-br from-primary/10 to-purple-500/10 dark:from-primary/5 dark:to-purple-500/5 rounded-3xl p-8 border dark:border-primary/20 backdrop-blur-sm">
                  <div className="space-y-5">
                    <div className="bg-background/80 dark:bg-background/50 backdrop-blur-sm rounded-xl p-5 border shadow-lg dark:shadow-primary/5 hover:shadow-xl hover:scale-105 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center ring-4 ring-primary/10">
                          <Key className="size-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">Secure Sessions</div>
                          <div className="text-sm text-muted-foreground">JWT-based authentication</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-background/80 dark:bg-background/50 backdrop-blur-sm rounded-xl p-5 border shadow-lg dark:shadow-primary/5 hover:shadow-xl hover:scale-105 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center ring-4 ring-primary/10">
                          <Shield className="size-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">Protected Routes</div>
                          <div className="text-sm text-muted-foreground">Middleware-based protection</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-background/80 dark:bg-background/50 backdrop-blur-sm rounded-xl p-5 border shadow-lg dark:shadow-primary/5 hover:shadow-xl hover:scale-105 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center ring-4 ring-primary/10">
                          <User className="size-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg">User Management</div>
                          <div className="text-sm text-muted-foreground">Complete account operations</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Getting Started Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <TerminalIcon className="size-3 mr-2" />
                Quick Start
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Started in Minutes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Clone the repository and start building your application with just a few commands
              </p>
            </div>

            <div className="space-y-8">
              {/* Installation Steps */}
              <div className="relative bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-10 shadow-xl dark:shadow-primary/10 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-purple-500/5" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TerminalIcon className="size-7 text-primary" />
                    </div>
                    Installation Steps
                  </h3>
                  
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">1</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Clone the repository</h4>
                          <Terminal sequence={false} className="max-w-full">
                            <AnimatedSpan startOnView={false}><span className="text-green-400">$ </span>git clone https://github.com/yourusername/next-appwrite-starter.git</AnimatedSpan>
                            <AnimatedSpan startOnView={false}><span className="text-green-400">$ </span>cd next-appwrite-starter</AnimatedSpan>
                          </Terminal>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">2</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Install dependencies</h4>
                          <Terminal sequence={false} className="max-w-full">
                            <AnimatedSpan startOnView={false}><span className="text-green-400">$ </span>pnpm install</AnimatedSpan>
                          </Terminal>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">3</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Configure environment</h4>
                          <Terminal sequence={false} className="max-w-full">
                            <AnimatedSpan startOnView={false}><span className="text-green-400">$ </span>cp .env.example .env.local</AnimatedSpan>
                          </Terminal>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">4</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">Start development</h4>
                          <Terminal sequence={false} className="max-w-full">
                            <AnimatedSpan startOnView={false}><span className="text-green-400">$ </span>pnpm dev</AnimatedSpan>
                            <AnimatedSpan startOnView={false}><span className="text-blue-400">▲</span> Next.js 16.0.7</AnimatedSpan>
                            <AnimatedSpan startOnView={false}><span className="text-muted-foreground">- Local:</span> http://localhost:3000</AnimatedSpan>
                            <AnimatedSpan startOnView={false}><span className="text-green-400">✓</span> Ready in 2.3s</AnimatedSpan>
                          </Terminal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Config Helpers Section */}
        <section className="container mx-auto px-4 py-24 bg-secondary/5 dark:bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="mb-4">
                <Settings className="size-3 mr-2" />
                Developer Tools
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful Helper Utilities
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Built-in helpers for logging, retry logic, and configuration management to accelerate development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Logger Helper */}
              <div className="group bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-8 shadow-xl dark:shadow-primary/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-lg">
                    <Code2 className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Logger Utility</h3>
                    <p className="text-sm text-muted-foreground">Type-safe logging with levels</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Environment-aware logging system with multiple log levels and structured output for better debugging.
                </p>

                <CodeBlock
                  language="typescript"
                  filename="config/helpers/logger.ts"
                  code={`import { createLogger } from '@/config/helpers'

// Create a logger instance
const logger = createLogger('AUTH', {
  minLevel: 'debug'
})

// Use different log levels
logger.debug('User session check', { userId: '123' })
logger.info('User logged in successfully')
logger.warn('Session expiring soon')
logger.error(new Error('Login failed'))`}
                />

                <div className="mt-6 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    Automatically disabled in production for security
                  </p>
                </div>
              </div>

              {/* Retry Helper */}
              <div className="group bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-8 shadow-xl dark:shadow-primary/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-lg">
                    <Repeat className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Retry Logic</h3>
                    <p className="text-sm text-muted-foreground">Exponential backoff retry</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Automatic retry mechanism with exponential backoff for reliable network operations.
                </p>

                <CodeBlock
                  language="typescript"
                  filename="config/helpers/retry.helpers.ts"
                  code={`import { withRetry } from '@/config/helpers'

// Wrap any async operation with retry logic
const data = await withRetry(
  async () => {
    return await fetch('/api/data')
  },
  3,  // max retries
  1000,  // initial delay (ms)
  'FetchData'  // operation name
)

// Configurable retry on specific errors
// - Network timeouts
// - Connection resets
// - DNS failures`}
                />

                <div className="mt-6 p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    Smart retry on transient failures only
                  </p>
                </div>
              </div>

              {/* Config Management */}
              <div className="group bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-8 shadow-xl dark:shadow-primary/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-lg">
                    <Settings className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Configuration</h3>
                    <p className="text-sm text-muted-foreground">Centralized config management</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Type-safe configuration with environment-specific settings and sensible defaults.
                </p>

                <CodeBlock
                  language="typescript"
                  filename="config/appwrite.config.ts"
                  code={`export const appwritecfg = {
  project: {
    id: process.env.APPWRITE_PROJECT_ID,
    endpoint: process.env.APPWRITE_ENDPOINT,
    apikey: process.env.APPWRITE_API_KEY
  },
  tables: {
    users: process.env.APPWRITE_USERS_TABLE
  }
}

// Network configuration
export const APPWRITE_NETWORK_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
  REQUEST_TIMEOUT: 30000
}`}
                />
              </div>

              {/* Session Config */}
              <div className="group bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-8 shadow-xl dark:shadow-primary/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-lg">
                    <Key className="size-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Session Management</h3>
                    <p className="text-sm text-muted-foreground">Secure cookie handling</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Secure session configuration with HTTP-only cookies and CSRF protection built-in.
                </p>

                <CodeBlock
                  language="typescript"
                  filename="config/helpers/config.ts"
                  code={`export const SESSION_CONFIG = {
  COOKIE_NAME: 'appwrite-session',
  ROLE_COOKIE_NAME: 'user-role',
  MAX_AGE: 60 * 60 * 24 * 30, // 30 days
  COOKIE_OPTIONS: {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  }
}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Server Actions Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="mb-4">
                <Zap className="size-3 mr-2" />
                Server Actions
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Type-Safe Server Actions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Built with next-safe-action for type-safe, validated server-side operations with automatic error handling
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-10 shadow-xl dark:shadow-primary/10 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="size-14 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                    <Zap className="size-7 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">Creating Server Actions</h3>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</div>
                      <h4 className="text-lg font-semibold text-foreground">Define your action client</h4>
                    </div>
                    <CodeBlock
                      language="typescript"
                      filename="actions/safe-action.ts"
                      code={`import { createSafeActionClient } from "next-safe-action"

// Create the client with default options
export const actionClient = createSafeActionClient()`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</div>
                      <h4 className="text-lg font-semibold text-foreground">Create type-safe actions with validation</h4>
                    </div>
                    <CodeBlock
                      language="typescript"
                      filename="actions/server-action.ts"
                      code={`"use server"
import { actionClient } from "./safe-action"
import { LoginformSchema } from "../lib/form-schema"

export const LoginserverAction = actionClient
  .inputSchema(LoginformSchema)
  .action(async ({ parsedInput }) => {
    // parsedInput is fully typed and validated
    const { email, password } = parsedInput
    
    // Your authentication logic here
    return {
      success: true,
      message: "Login successful"
    }
  })`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</div>
                      <h4 className="text-lg font-semibold text-foreground">Use in your components</h4>
                    </div>
                    <CodeBlock
                      language="typescript"
                      filename="components/forms/LoginForm.tsx"
                      code={`"use client"
import { useAction } from "next-safe-action/hooks"
import { LoginserverAction } from "@/actions/server-action"

const formAction = useAction(LoginserverAction, {
  onSuccess: (data) => {
    // Handle success
    console.log(data)
  },
  onError: (error) => {
    // Handle error
    console.error(error)
  }
})

// Execute the action
formAction.execute({ email, password })`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appwrite Integration Section */}
        <section className="container mx-auto px-4 py-24 bg-secondary/5 dark:bg-secondary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="secondary" className="mb-4">
                <Database className="size-3 mr-2" />
                Backend Integration
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Server-Side Appwrite Clients
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Pre-configured Appwrite clients for both admin and user sessions with automatic retry and error handling
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Admin Session */}
              <div className="group bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-8 shadow-xl dark:shadow-primary/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Shield className="size-7 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Admin Session</h3>
                    <p className="text-sm text-muted-foreground">Full service access</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Complete access to all Appwrite services using secure API key authentication for server-side operations.
                </p>

                <CodeBlock
                  language="typescript"
                  filename="server/clients/index.ts"
                  code={`import { createAdminSession } from '@/server/clients'

// Get admin session
const session = await createAdminSession()

// Access all services
const user = await session.accounts.get('<USER_ID>')
const team = await session.teams.create('<TEAM_ID>')
const doc = await session.databases.createDocument(
  '<DATABASE_ID>',
  '<COLLECTION_ID>',
  '<DOCUMENT_ID>',
  { name: 'John' }
)`}
                />

                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" />
                    Available Services:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['accounts', 'teams', 'databases', 'storage', 'functions', 'messaging'].map(service => (
                      <Badge key={service} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* User Session */}
              <div className="group bg-card/50 dark:bg-card/30 backdrop-blur-sm rounded-3xl border p-8 shadow-xl dark:shadow-primary/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-14 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <User className="size-7 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">User Session</h3>
                    <p className="text-sm text-muted-foreground">Scoped user access</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  User-scoped access with session token authentication from secure HTTP-only cookies.
                </p>

                <CodeBlock
                  language="typescript"
                  filename="server/clients/index.ts"
                  code={`import { createUserSession } from '@/server/clients'

// Get user session from cookies
const session = await createUserSession()

// Access user-specific data
const account = await session.accounts.get()
const prefs = await session.accounts.getPrefs()

// User operations
const docs = await session.databases.listDocuments(
  '<DATABASE_ID>',
  '<COLLECTION_ID>'
)`}
                />

                <div className="mt-6 p-4 bg-linear-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 rounded-xl border border-primary/20">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    Automatically uses session from HTTP-only cookies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="max-w-5xl mx-auto text-center relative">
            {/* Decorative gradient orbs */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            </div>
            
            <div className="bg-linear-to-br from-card/80 to-card/40 dark:from-card/50 dark:to-card/20 backdrop-blur-xl rounded-3xl p-16 border border-primary/20 shadow-2xl dark:shadow-primary/10">
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="size-3 mr-2" />
                Start Building Today
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Ready to Start Building?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Get started with this production-ready template and build your next 
                application with enterprise-grade authentication and security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="rounded-full px-10 py-6 text-lg shadow-xl bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary dark:shadow-primary/30 hover:scale-105 transition-transform">
                  <Link href="/auth/login">
                    Get Started Now
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-10 py-6 text-lg border-2 hover:bg-secondary/80">
                  <Link href="https://github.com" target="_blank">
                    <Github className="mr-2 size-5" />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t mt-20 dark:border-border/50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>Built with <span className="text-primary">Next.js</span> and <span className="text-primary">Appwrite</span> • MIT License</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
