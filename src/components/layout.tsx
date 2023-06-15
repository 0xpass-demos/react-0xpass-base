
import { ReactNode, useEffect, useState } from "react";

import { ConnectButton, useUser } from "0xpass";
import { MainNav } from "./main-nav";
import { MainNavItem } from "./types";

interface LayoutProps {
  items?: MainNavItem[];
  children?: ReactNode;
}

export function Layout({ items, children }: LayoutProps) {
  const { isAuthenticated } = useUser();
  const [showConnectButton, setShowConnectButton] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowConnectButton(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={items} />
          {showConnectButton && <ConnectButton />}
        </div>
      </header>
      <main className="flex container h-full">{children}</main>
    </div>
  );
}
