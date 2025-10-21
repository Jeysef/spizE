import { type JSX, type ParentComponent, Suspense } from "solid-js";
import { AppSidebar } from "~/components/AppSidebar";
import { BottomNavigation } from "~/components/BottomNavigation";
import { SiteHeader } from "~/components/SiteHeader";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

const App: ParentComponent = (props) => {
  return (
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
  );
};

export default App;
