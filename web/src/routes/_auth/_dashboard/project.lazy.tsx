import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
// import PH from "~/assets/svg/header1.svg";
import b1 from "~/assets/svg/box1.svg";
import b2 from "~/assets/svg/box2.svg";
import b3 from "~/assets/svg/box3.svg";
import b4 from "~/assets/svg/box4.svg";
import b5 from "~/assets/svg/box5.svg";
import top from "~/assets/svg/top.png";
import ct from "~/assets/contact_header.png";
import instantMessage from "~/assets/instant_message.png";
import headerLeft1 from "~/assets/header_left_1.png";
import headerLeft2 from "~/assets/header_left_2.png";
import headerRight1 from "~/assets/header_right_1.png";
import headerRight2 from "~/assets/header_right_2.png";

export const Route = createLazyFileRoute("/_auth/_dashboard/project")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-project-dashboard min-h-screen bg-cover bg-center bg-no-repeat">
      {/* <ProjectHeader /> */}
      {/* <header className="relative flex h-20 items-center justify-center"> */}
      <img src={top} className="w-full" />
      {/* </header> */}
      <div className="grid-areas-project-small xl:grid-areas-project-large grid gap-x-8 gap-y-8 px-4 xl:h-[calc(100vh-90px)] xl:gap-x-28 xl:px-10">
        <section className="grid-in-left left-side space-y-6">
          <div className="overflow-hidden">
            <img src={headerLeft1} />
            {/* <div className="grid h-[calc(100%-36px)] grid-cols-[1fr_1fr_2fr] gap-x-4 bg-gradient-to-tr from-[#0a3256] to-transparent p-4">
              <div className="bg-[#021734]"></div>
              <div className="bg-[#021734]"></div>
              <div className="bg-[#021734]"></div>
            </div> */}
          </div>

          <div>
            <img src={headerLeft2} />
          </div>
        </section>

        <section className="grid-in-center center-side py-3">
          <img src={instantMessage} />
          <div className="grid grid-cols-5 gap-x-2 pt-2 md:gap-x-4 xl:gap-x-6">
            <div className="relative flex justify-center @container">
              <img src={b1} className="absolute inset-0" />
              <div className="relative pt-[110%] font-bold text-white @[5rem]:text-xl">
                {Intl.NumberFormat("en-US").format(49688)}
              </div>
            </div>
            <img src={b2} />
            <img src={b3} />
            <img src={b4} />
            <img src={b5} />
          </div>
        </section>

        <section className="grid-in-right right-side space-y-6">
          <div>
            <img src={headerRight1} />
          </div>

          <div>
            <img src={headerRight2} />
          </div>
        </section>
      </div>
    </div>
  );
}
