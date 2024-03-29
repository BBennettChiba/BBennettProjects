import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "~/styles/globals.css";
import { useState } from "react";
import Drawer from "~/components/Drawer";
import Footer from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { SignInContextProvider } from "~/context/SignInContext";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SessionProvider session={session}>
      <SignInContextProvider>
        <div className="drawer h-screen overflow-x-hidden">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isChecked}
            readOnly
          />
          <div className="drawer-content flex flex-col">
            <Navbar setIsChecked={setIsChecked} />
            <Component {...pageProps} />
            <Footer />
          </div>
          <Drawer setIsChecked={setIsChecked} />
        </div>
      </SignInContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
