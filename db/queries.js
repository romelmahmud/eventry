import { eventModel } from "@/modals/event-modals";
import { userModel } from "@/modals/user-modals";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export const getAllEvents = async () => {
  const allEvents = await eventModel.find().lean();
  return replaceMongoIdInArray(allEvents);
};

export const getAllEventById = async (eventId) => {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
};

export const createUser = async (user) => {
  return await userModel.create(user);
};
