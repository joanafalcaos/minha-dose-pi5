import { Redirect, Slot, useSegments } from "expo-router";
import { useUserStore } from "../store/useUserStore";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);
  const segments = useSegments();

  const inAdminGroup = segments[1] === "(admin)";
  const inTabsGroup = segments[1] === "(tabs)";

  console.log("ProtectedLayout - segments:", segments);
  console.log("ProtectedLayout - user:", user);
  console.log("ProtectedLayout - inAdminGroup:", inAdminGroup, "inTabsGroup:", inTabsGroup);

  // Se não está logado, redireciona para login
  if (!user) {
    console.log("No user - redirecting to login");
    return <Redirect href="/login" />;
  }

  // Se usuário comum tentando acessar área admin, redireciona
  if (inAdminGroup && user.role !== "admin") {
    console.log("Regular user trying to access admin - redirecting to tabs/home");
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  // Se admin tentando acessar área de usuário, redireciona
  if (inTabsGroup && user.role === "admin") {
    console.log("Admin user trying to access tabs - redirecting to admin/homeAdmin");
    return <Redirect href="/(protected)/(admin)/homeAdmin" />;
  }

  console.log("Rendering Slot");
  return <Slot />;
}
