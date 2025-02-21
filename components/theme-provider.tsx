"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // const [isMounted, setIsMounted] = React.useState(false);

  // if (isMounted) {
  //   return <>{children}</>;
  // }
  // React.useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
