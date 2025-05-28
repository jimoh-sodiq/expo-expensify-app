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

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(email, password, name);
    setIsLoading(false);
    // handle error
    if (!res.success) {
      Alert.alert("Sign up", res.msg);
    }
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={styles.container}>
        <BackButton />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={800}>
            Let's,
          </Typo>
          <Typo size={30} fontWeight={800}>
            Get Started
          </Typo>
        </View>

        {/* login form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLight}>
            Create an account to track all your expenses
          </Typo>
          <CustomInput
            placeholder="Enter you name"
            onChangeText={(value) => setName(value)}
            value={name}
            icon={
              <Icons.User
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
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

        <CustomButton loading={loading} onPress={handleSubmit}>
          <Typo color={colors.black} size={21} fontWeight={700}>
            Register
          </Typo>
        </CustomButton>

        {/* Footer */}
        <View style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Link href="/(auth)/login" replace asChild>
            <Pressable>
              <Typo size={15} fontWeight={700} color={colors.primary}>
                Login
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
