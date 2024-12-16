"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
import { redirect } from "next/navigation";

const registerUser = async (formData) => {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
};

const performLogin = async (formData) => {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);

    return found;
  } catch (error) {
    throw error;
  }
};

export { performLogin, registerUser };
