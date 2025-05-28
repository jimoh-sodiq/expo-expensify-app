import { StyleSheet, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/authContext";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false, animation: "none" }} />;
}

const styles = StyleSheet.create({});
