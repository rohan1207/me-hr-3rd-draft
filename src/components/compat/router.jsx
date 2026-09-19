"use client";

import { forwardRef, useEffect } from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useParams as useNextParams } from "next/navigation";

/**
 * Thin compatibility layer so components copied from the Vite/react-router
 * app keep working unchanged on top of the Next.js App Router.
 */

export const Link = forwardRef(function Link(
  { to, href, replace, state, preventScrollReset, reloadDocument, children, ...rest },
  ref
) {
  return (
    <NextLink ref={ref} href={to ?? href ?? "#"} replace={replace} {...rest}>
      {children}
    </NextLink>
  );
});

export const NavLink = forwardRef(function NavLink(
  { to, href, end = false, className, style, children, replace, ...rest },
  ref
) {
  const pathname = usePathname() || "/";
  const target = to ?? href ?? "/";
  const base = String(target).split(/[?#]/)[0];
  const isActive = end
    ? pathname === base
    : pathname === base || (base !== "/" && pathname.startsWith(`${base}/`));

  const resolvedClass =
    typeof className === "function" ? className({ isActive, isPending: false }) : className;
  const resolvedStyle =
    typeof style === "function" ? style({ isActive, isPending: false }) : style;
  const content =
    typeof children === "function" ? children({ isActive, isPending: false }) : children;

  return (
    <NextLink
      ref={ref}
      href={target}
      replace={replace}
      className={resolvedClass}
      style={resolvedStyle}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {content}
    </NextLink>
  );
});

export function Navigate({ to, replace = true }) {
  const router = useRouter();

  useEffect(() => {
    if (!to) return;
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, router]);

  return null;
}

export function useLocation() {
  const pathname = usePathname() || "/";

  return {
    pathname,
    search: "",
    hash: typeof window !== "undefined" ? window.location.hash : "",
    state: null,
    key: "default",
  };
}

export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === "number") {
      router.back();
      return;
    }
    if (options.replace) router.replace(to);
    else router.push(to);
  };
}

export const useParams = useNextParams;

export function Outlet({ children = null }) {
  return children;
}
