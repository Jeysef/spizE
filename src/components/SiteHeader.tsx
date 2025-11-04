import { useLocation } from "@solidjs/router";
import { useLiveQuery } from "@tanstack/solid-db";
import UserIcon from "lucide-solid/icons/user";
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
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { usersCollection } from "~/db/collections";
import { useUser } from "~/providers/user/user.hooks";

export function SiteHeader() {
  const users = useLiveQuery((q) => q.from({ users: usersCollection }));

  const [_, setUser] = useUser();
  return (
    <header class="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 class="text-base font-medium">{useLocation().pathname}</h1>
        {/* <Heading variant={"h1"} class="!text-xl font-bold">
          Dashboard
        </Heading> */}
        <div class="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar class="bg-accent">
                <UserIcon class="aspect-square size-full p-2" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Accounts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <For
                each={users.data}
                fallback={
                  <DropdownMenuLabel>No users found.</DropdownMenuLabel>
                }
              >
                {(user) => (
                  <DropdownMenuItem onClick={() => setUser(user)}>
                    {user.name}
                  </DropdownMenuItem>
                )}
              </For>
              {/* <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
