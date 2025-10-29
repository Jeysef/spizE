import { createContext, type Signal } from "solid-js";
import type { UserResponse } from "~/client";

export const INITIAL_USER: UserResponse = {
  id: 1,
  name: "Unknown",
};

const INITIAL_SETTER = () => INITIAL_USER;

export const UserContext = createContext<Signal<UserResponse>>([
  () => INITIAL_USER,
  INITIAL_SETTER,
]);
