import { useContext } from "solid-js";
import { UserContext } from "~/providers/user/user.context";

export function useUser() {
  const user = useContext(UserContext);
  if (user === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}
