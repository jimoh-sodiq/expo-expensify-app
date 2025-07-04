import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { HeaderProps } from "@/types";

export default function Header({
  title = "",
  leftIcon,
  style,
}: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {title && (
        <Typo
          size={22}
          fontWeight={600}
          style={{ textAlign: "center", width: leftIcon ? "82%" : "100%" }}
        >
          {title}
        </Typo>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row"
  },
  leftIcon: {
    alignSelf: "flex-start"
  },
});
