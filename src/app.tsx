import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { type JSX, type ParentComponent, Suspense } from "solid-js";
import { AppSidebar } from "~/components/AppSidebar";
import { BottomNavigation } from "~/components/BottomNavigation";
import { SiteHeader } from "~/components/header/SiteHeader";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { ItemsProvider } from "~/providers/items/items.provider";
import { UserProvider } from "~/providers/user/user.provider";

const App: ParentComponent = (props) => {
  const queryClient = new QueryClient();
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ItemsProvider>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as JSX.CSSProperties
            }
          >
            <AppSidebar />
            <SidebarInset class="overflow-clip">
              <SiteHeader />
              <div class="flex flex-col w-full justify-between ">
                <Suspense>{props.children}</Suspense>
                <BottomNavigation />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ItemsProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
