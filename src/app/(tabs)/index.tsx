import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomButton from "@/components/CustomButton";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { auth } from '@/config/firebase';
import { signOut } from '@firebase/auth';
import { useAuth } from '@/contexts/authContext';

export default function HomeTab() {

  const user = useAuth()
  const handleLogout =  async () => {
    await signOut(auth)
  }
  return (
    <ScreenWrapper style={{ backgroundColor: "white" }}>
      <View>
        <CustomButton onPress={handleLogout}>
          <Typo color={colors.black}>Logout {user.user?.email}</Typo>
        </CustomButton>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
