import { type ParentComponent, Suspense } from "solid-js";
import { BottomNavigation } from "~/components/BottomNavigation";
import { Navigation } from "~/components/Navigation";

const App: ParentComponent = (props) => {
  return (
    <>
      <Navigation />

      <main class="flex flex-col min-h-svh">
        <Suspense>{props.children}</Suspense>
        <BottomNavigation />
      </main>
    </>
  );
};

export default App;
