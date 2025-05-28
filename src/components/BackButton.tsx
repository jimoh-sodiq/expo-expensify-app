import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import type { BackButtonProps } from "@/types";
import Typo from "./Typo";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { colors, radius } from "@/constants/theme";

export default function BackButton({ style, iconSize = 26 }: BackButtonProps) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} style={[styles.button, style]}>
      <CaretLeft
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
  },
});
