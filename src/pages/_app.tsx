import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "~/styles/globals.css";
import Footer from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
