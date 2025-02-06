"use client";

import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useUserStore } from "@/stores/globalStore";

interface WithAuthProps {
  children: ReactNode;
}

const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithAuthProps> => {
  const AuthenticatedComponent: React.FC<P & WithAuthProps> = (props) => {
    const pathname=usePathname();
    const { isAuthenticated, initializeAuthListener } = useUserStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Track listener initialization
    const router = useRouter();

    useEffect(() => {
      // Initialize the Firebase authentication listener
      initializeAuthListener();
      setIsCheckingAuth(false); // Mark as checked after initializing
    }, [initializeAuthListener]);

    useEffect(() => {
      if (!isCheckingAuth && !isAuthenticated) {
        router.push("/signin");
      }
    }, [isCheckingAuth, isAuthenticated, router]);

    // Show a loader or nothing while checking authentication
    if (isCheckingAuth || !isAuthenticated) return <div>Loading...</div>;

    return <Component {...(props as P)} />;
 
  };

  return AuthenticatedComponent;
};

export default withAuth;
