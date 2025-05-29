import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen
          name="(modals)/profileModal"
          options={{ presentation: "containedModal" }}
        />
      </Stack>
    </AuthProvider>
  );
}
