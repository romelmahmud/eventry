"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
import { redirect } from "next/navigation";

const registerUser = async (formData) => {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
};

const performLogin = async (formData) => {
  const credential = {};
  credential.email = formData.get("email");
  credential.password = formData.get("password");
  const found = await findUserByCredentials(credential);
  if (found) {
    redirect("/");
  } else {
    throw new Error(`User with email ${formData.get("email")} not found`);
  }
};

export { performLogin, registerUser };
