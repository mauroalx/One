import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectRoute({ children }: { children: React.ReactNode }) {
  const { user, token, login, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      logout(); // garante redirecionamento
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/auth/confirm`, {
      headers: {
        Authorization: `Bearer ${savedToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then((data) => {
        if (!user) login(savedToken, data); // <- Preenche o AuthContext
        // Garante que os dados do usuário estão atualizados, sem reiniciar o login
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [pathname]);

  if (loading) return <div>Carregando...</div>;

  return <>{children}</>;
}
