
import * as React from "react";

import { MainNavItem } from "./types";
import { cn } from "./lib/utils";
import { Icons } from "./icons";
import {Link} from "@radix-ui/react-navigation-menu";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = "";

  return (
    <div className="flex gap-6 md:gap-10">
      <a href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-6 w-6 invert hover:animate-spin-slow" />

      </a>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
               item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}

    </div>
  );
}
