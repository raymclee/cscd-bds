import { createLazyFileRoute } from "@tanstack/react-router";
import "~/styles/tech-animations.css";
import { Cards } from "./-components/cards";
import { Navigator } from "./-components/navigator";
import { ScrollToTopButton } from "./-components/scroll-to-top-button";
import { TenderDetailFrame } from "./-components/tender-detail";
import { TenderList } from "./-components/tender-list";

export const Route = createLazyFileRoute("/__auth/__dashboard/__amap/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* Main Content */}
      <div className="py-4 md:px-6">
        <div className="relative grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4 xl:grid-cols-[minmax(480px,0.6fr)_2fr]">
          <TenderList />
          <Cards />
          <TenderDetailFrame />
        </div>
      </div>

      <ScrollToTopButton />
      {/* <TenderDetailCard /> */}

      <Navigator />
      {/* <DistrictPlots /> */}
    </>
  );
}
