import "./globals.css";
import Nav from "@/components/global/Nav";
import { auth } from "@/lib/auth";



// Root layout for the application. This server component:
// - Fetches the current authenticated user via `auth()`
// - Renders the site-wide `Nav` with that user data
// - Wraps the application `children` under the HTML/body structure
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve the current user (if any) to pass into the Nav
  const user = await auth()
  return (
    <html lang="en">
      <body>
        <Nav user={user} />
        {children}
      </body>
    </html>
  );
}
