import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Marca que está pronto para navegar após o primeiro render
    const timeout = setTimeout(() => setIsNavigationReady(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Aguarda navegação estar pronta e segments serem carregados
    if (!isNavigationReady || segments.length === 0) return;

    const inAdminGroup = segments[1] === "(admin)";
    const inTabsGroup = segments[1] === "(tabs)";

    // Se não está logado, redireciona para login
    if (!user) {
      router.replace("/login");
      return;
    }

    // Se usuário comum tentando acessar área admin, redireciona
    if (inAdminGroup && user.role !== "admin") {
      router.replace("/(protected)/(tabs)/home");
      return;
    }

    // Se admin tentando acessar área de usuário, redireciona
    if (inTabsGroup && user.role === "admin") {
      router.replace("/(protected)/(admin)/homeAdmin");
      return;
    }
  }, [user, segments, isNavigationReady]);

  return <Slot />;
}
