import SignInForm from "@/components/auth/SignInForm";
import GridShape from "@/components/common/GridShape";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "One. | Autenticação",
  description: "One. | Página de autenticação",
};

export default function SignIn() {
  return (
    <div className="relative flex w-full h-screen px-4 py-6 overflow-hidden bg-white z-1 dark:bg-gray-900 sm:p-0">
      <SignInForm />
      <div className="relative items-center justify-center flex-1 hidden p-8 z-1 bg-brand-950 dark:bg-white/5 lg:flex">
        {/* <!-- ===== Common Grid Shape Start ===== --> */}
        <GridShape />
        <div className="flex flex-col items-center max-w-xs">
          <Link href="/" className="block mb-4">
            <Image
              width={328}
              height={132}
              src="/images/logo/one-white.png"
              alt="Logo"
            />
          </Link>
          <p className="text-center text-gray-400 dark:text-white/60">
          A melhor e gratuita alternativa, para pequenos/médios provedores
          </p>
        </div>

      </div>
      
    </div>
  );
}
