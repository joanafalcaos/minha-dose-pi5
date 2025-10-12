import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Aguarda segments serem carregados
    if (segments.length === 0) return;

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
  }, [user, segments]);

  return <Slot />;
}
