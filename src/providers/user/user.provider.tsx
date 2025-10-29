import { makePersisted } from "@solid-primitives/storage";
import type { ParentProps } from "solid-js";
import { createSignal } from "solid-js";
import { UserResponse } from "~/client";
import { INITIAL_USER, UserContext } from "./user.context";

interface UserProviderProps extends ParentProps {
  initialUser?: UserResponse;
}

/**
 * Wrap your app with <UserProvider> to provide a global user id signal.
 * Optionally pass initialId or it will try to read from localStorage.
 */
export function UserProvider(props: UserProviderProps) {
  const [user, setUser] = makePersisted(
    createSignal(props.initialUser ?? INITIAL_USER)
  );

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
