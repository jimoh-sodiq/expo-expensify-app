import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/Typo";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/contexts/authContext";
import { updateUser } from "@/services/userService";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { UserDataType } from '@/types';

export default function profileModal() {
  const router = useRouter();
  const { user, updateUserData } = useAuth();
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    //   allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
        setUserData({...userData, image: result.assets[0].uri})
    }
  };

  const onSubmit = async () => {
    let { name, image } = userData;
    if (!name.trim()) {
      Alert.alert("User", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await updateUser(user?.uid as string, userData);
    setIsLoading(false);
    if (res.success) {
      updateUserData(user?.uid as string);
      router.back();
    } else {
      Alert.alert("User", res.msg);
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              contentFit="cover"
              transition={100}
            />

            <Pressable onPress={pickImage} style={styles.editIcon}>
              <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </Pressable>
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Name</Typo>
            <CustomInput
              placeholder="Name"
              value={userData.name}
              onChangeText={(value) =>
                setUserData({ ...userData, name: value })
              }
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <CustomButton
          loading={isLoading}
          onPress={onSubmit}
          style={{ flex: 1 }}
        >
          <Typo color={colors.black} fontWeight={700}>
            Update
          </Typo>
        </CustomButton>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    elevation: 4,
    shadowRadius: 10,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
