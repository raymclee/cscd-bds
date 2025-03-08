import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Link, useLocation } from "@tanstack/react-router";
import { useLocalStorage } from "usehooks-ts";
import { biTitleMap } from "~/lib/bi-title";

const navItems = [
  {
    title: "市场拓展地图",
    href: "/",
  },
  {
    title: "项目运营管控",
    href: "/operations",
  },
  {
    title: "BI数字远东报表",
    href: "/bi",
  },
  {
    title: "数字远东彩虹图",
    href: "/rainbow",
  },
  // {
  //   title: "业务数据监控",
  //   href: "/bi/04441373-1ba3-4f91-bb35-bffbe03cdbd7",
  // },
];

export function Switcher() {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();

  // useEffect(() => {

  //   const controller = new AbortController()

  //   document.addEventListener('')

  //   return controller.abort

  // }, [])

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <>
      <div
        className="fixed z-50 flex items-center justify-center rounded-full border border-sky-800 bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 shadow-2xl hover:cursor-move"
        // onDragStart={(e) => {
        //   setPos({ x: e.clientX, y: e.clientY });
        // }}
        // draggable
        // onDrag={(e) => {
        //   console.log(e);
        //   setPos({ x: e.clientX - 12, y: e.clientY - 12 });
        // }}
        // onDragStart={(e) => {
        //   setPos({ x: e.clientX, y: e.clientY });
        // }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        style={{
          // top: pos.y === 0 ? "74%" : `${pos.y}px`,
          // left: pos.x === 0 ? "94%" : `${pos.x}px`,
          top: "1.5%",
          left: "1%",
        }}
      >
        <MotionConfig
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <motion.button
            initial={false}
            animate={isActive ? "open" : "closed"}
            onClick={() => setIsActive((pv) => !pv)}
            className="relative h-12 w-12 cursor-pointer rounded-full bg-white/0 transition-colors hover:bg-white/20"
          >
            <motion.span
              variants={VARIANTS.top}
              className="absolute h-[3px] w-6 bg-white"
              style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
            />
            <motion.span
              variants={VARIANTS.middle}
              className="absolute h-[3px] w-6 bg-white"
              style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
            />
            <motion.span
              variants={VARIANTS.bottom}
              className="absolute h-[3px] w-4 bg-white"
              style={{
                x: "-50%",
                y: "50%",
                bottom: "35%",
                left: "calc(50% + 4px)",
              }}
            />
          </motion.button>
        </MotionConfig>
      </div>

      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            className="fixed top-0 left-0 z-30 h-full w-full bg-black/50 backdrop-blur-sm"
            variants={menuOverlaySlide}
            initial="initial"
            animate="enter"
            exit="exit"
            onClick={() => {
              setIsActive((pv) => !pv);
            }}
          >
            {/* <Curve /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 4px)",
    },
  },
};

export const menuSlide = {
  initial: { x: "calc(-100% - 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(-100% - 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const menuOverlaySlide = {
  // initial: { x: "calc(-100% - 100px)" },
  // enter: { x: "0", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
  // exit: {
  //   x: "calc(-100% - 100px)",
  //   transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  // },
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
};

export const slide = {
  initial: { x: -80 },
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: -80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

export const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

function Nav() {
  const { pathname } = useLocation();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed top-0 left-0 z-40 h-screen bg-[rgb(41,41,41)] text-white"
    >
      <div className="flex h-full flex-col justify-between p-[100px]">
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className="mt-[80px] flex flex-col gap-3 text-2xl"
        >
          <div className="mb-[40px] border-b-[1px_solid_rgb(153,153,153)] text-sm text-[rgb(153,153,153)]">
            <p>导航</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <AnimatedLink
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></AnimatedLink>
            );
          })}
        </div>
        {/* <Footer /> */}
      </div>
      <Curve />
    </motion.div>
  );
}

function AnimatedLink({
  data,
  isActive,
  setSelectedIndicator,
}: {
  data: { title: string; href: string; index: number };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}) {
  const { title, href, index } = data;

  return (
    <motion.div
      className="relative flex items-center space-y-2"
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="absolute bottom-3 left-[-30px] h-[10px] w-[10px] rounded-full bg-white"
      ></motion.div>
      <Link href={href}>{title}</Link>
    </motion.div>
  );
}

function Curve() {
  // const initialPath = `M100 0 L0 0 L0 ${window.innerHeight} L100 ${window.innerHeight} Q300 ${window.innerHeight / 2} 100 0`;
  // const targetPath = `M100 0 L0 0 L0 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

  const initialPath = `M100 0 L0 0 L0 ${window.innerHeight} L100 ${window.innerHeight} Q300 ${window.innerHeight / 2} 100 0`;
  const targetPath = `M100 0 L0 0 L0 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className="absolute top-0 left-[-99px] h-full w-[100px] fill-[rgb(41,41,41)] stroke-none">
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );

  // const curve = {
  //   initial: {
  //     d: initialPath,
  //   },
  //   enter: {
  //     d: targetPath,
  //     transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  //   },
  //   exit: {
  //     d: initialPath,
  //     transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  //   },
  // };

  // return (
  //   <svg className="absolute right-[-99px] top-0 h-full w-[100px] fill-[rgb(41,41,41)] stroke-none">
  //     <motion.path
  //       variants={curve}
  //       initial="initial"
  //       animate="enter"
  //       exit="exit"
  //     ></motion.path>
  //   </svg>
  // );
}

// const menu = {
//   open: {
//     width: "480px",
//     height: "650px",
//     top: "-25px",
//     right: "-25px",
//     transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
//   },
//   closed: {
//     width: "100px",
//     height: "40px",
//     top: "0px",
//     right: "0px",
//     transition: {
//       duration: 0.75,
//       delay: 0.35,
//       type: "tween",
//       ease: [0.76, 0, 0.24, 1],
//     },
//   },
// };

// export function Switcher1() {
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <>
//       <div className="fixed z-50 right-5 top-2">
//         <motion.div
//           className="relative h-[650px] w-[480px] rounded-lg bg-gradient-to-br from-sky-800 to-sky-900/50 to-80% drop-shadow-2xl backdrop-blur-sm"
//           variants={menu}
//           animate={isActive ? "open" : "closed"}
//           initial="closed"
//         >
//           <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
//         </motion.div>
//         <Button
//           isActive={isActive}
//           toggleMenu={() => {
//             setIsActive((a) => !a);
//           }}
//         />
//       </div>

//       <motion.div
//         onClick={() => {
//           setIsActive((a) => !a);
//         }}
//         className="fixed top-0 right-0 z-40 w-full h-full bg-black/50 backdrop-blur-sm"
//         variants={{
//           open: {
//             height: "100%",
//             width: "100%",
//             transition: {
//               duration: 0.5,
//               type: "tween",
//               ease: [0.76, 0, 0.24, 1],
//             },
//             opacity: 1,
//           },
//           closed: {
//             height: "0%",
//             width: "0%",
//             transition: {
//               duration: 0.5,
//               delay: 0.35,
//               type: "tween",
//               ease: [0.76, 0, 0.24, 1],
//             },
//             opacity: 0,
//           },
//         }}
//         animate={isActive ? "open" : "closed"}
//         initial="closed"
//       ></motion.div>
//     </>
//   );
// }

// <div className={styles.button}>
// <motion.div
//     className={styles.slider}
//     animate={{top: isActive ? "-100%" : "0%"}}
//     transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1]}}
// >
//     <div
//         className={styles.el}
//         onClick={() => {toggleMenu()}}
//     >
//         <PerspectiveText label="Menu"/>
//     </div>
//     <div
//         className={styles.el}
//         onClick={() => {toggleMenu()}}
//     >
//         <PerspectiveText label="Close" />
//     </div>
// </motion.div>
// </div>

// function Button({
//   isActive,
//   toggleMenu,
// }: {
//   isActive: boolean;
//   toggleMenu: () => void;
// }) {
//   return (
//     <div className="absolute right-0 top-0 h-[40px] w-[100px] cursor-pointer overflow-hidden rounded-lg">
//       <motion.div
//         className="relative w-full h-full"
//         animate={{ top: isActive ? "-100%" : "0%" }}
//         transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
//       >
//         <div
//           className="h-full w-full bg-sky-800/50 [&:nth-child(2)>p]:text-[#c9fd74] [&:nth-child(2)]:bg-black [&>div>p:nth-child(2)]:-translate-y-full hover:[&>div>p]:rotate-90 [&>p]:m-0"
//           onClick={() => {
//             toggleMenu();
//           }}
//         >
//           <div
//             className="flex flex-col items-center justify-center w-full h-full"
//             style={{
//               transformStyle: "preserve-3d",
//               transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
//             }}
//           >
//             <p className="pointer-events-none uppercase opacity-0 [&:nth-child(2)]:absolute [&:nth-child(2)]:origin-[bottom_center] [&:nth-child(2)]:translate-y-[9px] [&:nth-child(2)]:-rotate-90">
//               菜单
//             </p>
//             <p className="uppercase pointer-events-none">菜单</p>
//           </div>
//         </div>
//         <div
//           className="h-full w-full bg-[#c9fd74] [&:nth-child(2)>p]:text-[#c9fd74] [&:nth-child(2)]:bg-black [&>p]:m-0"
//           onClick={() => {
//             toggleMenu();
//           }}
//         >
//           <div
//             className="flex flex-col items-center justify-center w-full h-full"
//             style={{
//               transformStyle: "preserve-3d",
//               transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
//             }}
//           >
//             <p className="pointer-events-none uppercase opacity-0 [&:nth-child(2)]:absolute [&:nth-child(2)]:origin-[bottom_center] [&:nth-child(2)]:translate-y-[9px] [&:nth-child(2)]:-rotate-90">
//               关闭
//             </p>
//             <p className="uppercase pointer-events-none">关闭</p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// function PerspectiveText({ label }: { label: string }) {
//   return (
//     <div
//       className="flex flex-col items-center justify-center w-full h-full"
//       style={{
//         transformStyle: "preserve-3d",
//         transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
//       }}
//     >
//       <p className="pointer-events-none uppercase opacity-0 [&:nth-child(2)]:absolute [&:nth-child(2)]:origin-[bottom_center] [&:nth-child(2)]:translate-y-[9px] [&:nth-child(2)]:-rotate-90">
//         {label}
//       </p>
//       <p className="uppercase pointer-events-none">{label}</p>
//     </div>
//   );
// }

// export const links = [
//   {
//     title: "市场拓展地图",
//     href: "/",
//   },
//   {
//     title: "项目运营管控",
//     href: "/operations",
//   },
//   // {
//   //   title: "Expertise",
//   //   href: "/",
//   // },
//   // {
//   //   title: "Careers",
//   //   href: "/",
//   // },
//   // {
//   //   title: "Contact",
//   //   href: "/",
//   // },
// ];

// export const footerLinks = [
//   {
//     title: "Facebook",
//     href: "/",
//   },
//   {
//     title: "LinkedIn",
//     href: "/",
//   },
//   {
//     title: "Instagram",
//     href: "/",
//   },
//   {
//     title: "Twitter",
//     href: "/",
//   },
// ];

// export const perspective = {
//   initial: {
//     opacity: 0,
//     rotateX: 90,
//     translateY: 80,
//     translateX: -20,
//   },
//   enter: (i) => ({
//     opacity: 1,
//     rotateX: 0,
//     translateY: 0,
//     translateX: 0,
//     transition: {
//       duration: 0.65,
//       delay: 0.5 + i * 0.1,
//       ease: [0.215, 0.61, 0.355, 1],
//       opacity: { duration: 0.35 },
//     },
//   }),
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1] },
//   },
// };

// export const slideIn = {
//   initial: {
//     opacity: 0,
//     y: 20,
//   },
//   enter: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       delay: 0.75 + i * 0.1,
//       ease: [0.215, 0.61, 0.355, 1],
//     },
//   }),
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
//   },
// };

// function Nav1() {
//   return (
//     <div className="flex h-full flex-col justify-between px-[40px] pb-[50px] pt-[100px]">
//       <div className="flex flex-col gap-[10px]">
//         {links.map((link, i) => {
//           const { title, href } = link;
//           return (
//             <div
//               key={`b_${i}`}
//               style={{ perspective: "120px", perspectiveOrigin: "bottom" }}
//             >
//               <motion.div
//                 custom={i}
//                 variants={perspective}
//                 initial="initial"
//                 animate="enter"
//                 exit="exit"
//               >
//                 <Link to={href}>{title}</Link>
//               </motion.div>
//             </div>
//           );
//         })}
//       </div>
//       {/* <motion.div className="flex flex-wrap">
//         {footerLinks.map((link, i) => {
//           const { title, href } = link;
//           return (
//             <motion.a
//               className="mt-[5px] w-[50%]"
//               variants={slideIn}
//               custom={i}
//               initial="initial"
//               animate="enter"
//               exit="exit"
//               key={`f_${i}`}
//             >
//               {title}
//             </motion.a>
//           );
//         })}
//       </motion.div> */}
//     </div>
//   );
// }
