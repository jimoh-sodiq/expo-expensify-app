import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export async function updateUser(
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> {
  try {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    return {
      success: true,
      msg: "User updated",
    };
  } catch (error: any) {
    console.log("Error updating the user");
    return {
      success: false,
      msg: error.message,
    };
  }
}
