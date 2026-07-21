import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display holo-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="btn-pink">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-pink">Try again</button>
          <a href="/" className="btn-outline-cyan">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Twist and Glow | Las Vegas Face Painting and Event Entertainment" },
      { name: "description", content: "Premium face painting, UV glow art, and event entertainment in Las Vegas. Corporate activations, festivals, and unforgettable parties." },
      { name: "author", content: "Twist and Glow LLC" },
      { property: "og:title", content: "Twist and Glow | Las Vegas Face Painting and Event Entertainment" },
      { property: "og:description", content: "Premium face painting, UV glow art, and event entertainment in Las Vegas. Corporate activations, festivals, and unforgettable parties." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Twist and Glow | Las Vegas Face Painting and Event Entertainment" },
      { name: "twitter:description", content: "Premium face painting, UV glow art, and event entertainment in Las Vegas. Corporate activations, festivals, and unforgettable parties." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a79a7d27-8544-4ae6-88ad-e6792c0c11ad/id-preview-a5c54e35--eaf5e8fc-69dd-4dfd-a749-3f5b1534f33a.lovable.app-1781196319661.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a79a7d27-8544-4ae6-88ad-e6792c0c11ad/id-preview-a5c54e35--eaf5e8fc-69dd-4dfd-a749-3f5b1534f33a.lovable.app-1781196319661.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main className="pt-[76px]"><Outlet /></main>
      <Footer />
      <BookingModal />
    </QueryClientProvider>
  );
}

