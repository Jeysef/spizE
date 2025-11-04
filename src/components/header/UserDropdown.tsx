import { useLiveQuery } from "@tanstack/solid-db";
import { For } from "solid-js";
import { Avatar } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { usersCollection } from "~/db/collections";
import { useUser } from "~/providers/user/user.hooks";
import UserIcon from "lucide-solid/icons/user";

function UserDropdown() {
  const users = useLiveQuery((q) => q.from({ users: usersCollection }));
  const [currentUser, setCurrentUser] = useUser();

  const otherUsers = () =>
    users.data?.filter((user) => user.id !== currentUser().id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar class="bg-accent">
          <UserIcon class="aspect-square size-full p-2" />
          <span class="sr-only">Open user menu</span>
          <div class="absolute inset-0 m-1.5 rounded-full grid place-items-center bg-background/80">
            <span>{currentUser().name[0].toUpperCase()}</span>
          </div>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{currentUser().name}</DropdownMenuLabel>
        <DropdownMenuLabel>Other Accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <For
          each={otherUsers()}
          fallback={<DropdownMenuLabel>No users found.</DropdownMenuLabel>}
        >
          {(user) => (
            <DropdownMenuItem onClick={() => setCurrentUser(user)}>
              {user.name}
            </DropdownMenuItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
