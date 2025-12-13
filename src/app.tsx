import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { type JSX, type ParentComponent, Suspense } from "solid-js";
import { AppSidebar } from "~/components/AppSidebar";
import { BottomNavigation } from "~/components/BottomNavigation";
import { SiteHeader } from "~/components/header/SiteHeader";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { ItemsProvider } from "~/providers/items/items.provider";
import { UserProvider } from "~/providers/user/user.provider";
import { Toaster } from "./components/ui/sonner";

const InnerApp: ParentComponent = (props) => {
  return (
    <>
      <SiteHeader />
      <div class="flex flex-col w-full justify-between pb-20">
        <Suspense>{props.children}</Suspense>
        <BottomNavigation />
      </div>
    </>
  );
};



const App: ParentComponent = (props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
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
              <InnerApp>{props.children}</InnerApp>
            </SidebarInset>
            <Toaster position="top-right" />
          </SidebarProvider>
        </ItemsProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
