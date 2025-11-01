import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/libs/session";

const protectedRouteList = ["/"];
const publicRouteList = ["/login"];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  console.log("user Session", session);

  const isProtecedRoute = protectedRouteList.includes(request.nextUrl.pathname);
  const isPublicRoute = publicRouteList.includes(request.nextUrl.pathname);

  // Redirection vers la page d'accueil en cas de connexion
  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  //  Redirection wer la page de donnexion en cas ou non connecté
  if (!isPublicRoute && !session?.user) {
    console.log("user Session", session?.user);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images/*.*|favicon.ico).*)", // tout sauf fichiers système et API
  ],
};
