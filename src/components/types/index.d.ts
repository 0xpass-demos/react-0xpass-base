export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MenuConfig = {
  mainNav: MainNavItem[];
};

export type UserState = {
  hasFilledDetails: boolean;
  isWaitlisted: boolean;
  isOnboarded: boolean;
  isVip: boolean;
};
