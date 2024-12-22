import { eventModel } from "@/modals/event-modals";
import { userModel } from "@/modals/user-modals";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import mongoose from "mongoose";

export const getAllEvents = async (query) => {
  let allEvents = [];
  if (query) {
    const regex = new RegExp(query, "i");
    allEvents = await eventModel.find({ name: { $regex: regex } }).lean();
  } else {
    allEvents = await eventModel.find().lean();
  }
  return replaceMongoIdInArray(allEvents);
};

export const getAllEventById = async (eventId) => {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
};

export const createUser = async (user) => {
  return await userModel.create(user);
};

export const findUserByCredentials = async (credentials) => {
  const user = await userModel.findOne(credentials).lean();

  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
};

export const updateInterest = async (eventId, authId) => {
  const event = await eventModel.findById(eventId);
  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    );
    if (foundUsers) {
      event.interested_ids.pull(new mongoose.Types.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.Types.ObjectId(authId));
    }
  }
  event.save();
};

export const updateGoing = async (eventId, authId) => {
  const event = await eventModel.findById(eventId);
  event.going_ids.push(new mongoose.Types.ObjectId(authId));
  event.save();
};
