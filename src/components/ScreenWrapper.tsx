import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import { ScreenWrapperProps } from "@/types";
import { colors } from "@/constants/theme";
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

const height = Dimensions.get("window").height;

export default function ScreenWrapper({ style, children }: ScreenWrapperProps) {
  // let paddingTop = Platform.OS === "ios" ? height * 0.06 : 50;
  return (
    <SafeAreaView
      style={[
        {
          // paddingTop,
          flex: 1,
          backgroundColor: colors.neutral900,
        },
        style,
      ]}
    >
      <StatusBar barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
