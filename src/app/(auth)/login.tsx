import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { verticalScale } from "@/utils/styling";
import { colors, spacingX, spacingY } from "@/constants/theme";
import BackButton from "@/components/BackButton";
import CustomInput from "@/components/CustomInput";
import * as Icons from "phosphor-react-native";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const { login: loginUser } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await loginUser(email, password);
    setIsLoading(false);
    if (!res.success) {
      Alert.alert("Login", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={styles.container}>
        <BackButton />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={800}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={800}>
            Welcome Back
          </Typo>
        </View>

        {/* login form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>
            Login now to track all your expenses
          </Typo>
          <CustomInput
            placeholder="Enter you email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <CustomInput
            placeholder="Enter you password"
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
            value={password}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
        </View>

        <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
          Forgot Password?
        </Typo>

        <CustomButton loading={loading} onPress={handleSubmit}>
          <Typo color={colors.black} size={21} fontWeight={700}>
            Login
          </Typo>
        </CustomButton>

        {/* Footer */}
        <View style={styles.footer}>
          <Typo size={15}>Don't have an account?</Typo>
          <Link href="/(auth)/register" replace asChild>
            <Pressable>
              <Typo size={15} fontWeight={700} color={colors.primary}>
                Sign up
              </Typo>
            </Pressable>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: 500,
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
