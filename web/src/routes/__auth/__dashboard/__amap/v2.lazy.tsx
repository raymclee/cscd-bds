import { createLazyFileRoute } from "@tanstack/react-router";
import "~/styles/tech-animations.css";
import { Cards } from "./-components/cards";
import { Navigator } from "./-components/navigator";
import { ScrollToTopButton } from "./-components/scroll-to-top-button";
import { TenderDetailFrame } from "./-components/tender-detail";
import { TenderList } from "./-components/tender-list";
import { DistrictPlots } from "./-components/district-plots";

export const Route = createLazyFileRoute("/__auth/__dashboard/__amap/v2")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* Main Content */}
      <div className="py-4 md:px-6">
        <div className="relative grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
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
