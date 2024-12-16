"use server";

import { createUser } from "@/db/queries";
import { redirect } from "next/navigation";

const registerUser = async (formData) => {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
};

export { registerUser };
