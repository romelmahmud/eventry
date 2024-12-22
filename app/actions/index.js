"use server";

import EmailTemplate from "@/components/payment/EmailTeplate";
import {
  createUser,
  findUserByCredentials,
  getAllEventById,
  updateGoing,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

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

const addInterestedEvent = async (eventId, authId) => {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
  return {
    success: true,
  };
};

const sendEmail = async (eventId, user) => {
  try {
    const event = await getAllEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    const sent = await resend.emails.send({
      from: "noreply@resend",
      to: user?.email,
      subject: "Successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
};

const addGoingEvent = async (eventId, user) => {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
  // return {
  //   success: true,
  // };
  redirect("/");
};

export { addGoingEvent, addInterestedEvent, performLogin, registerUser };
