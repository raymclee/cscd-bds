import subTitle from "~/assets/svg/sub_title.png";

export function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-8">
      <img src={subTitle} className="absolute inset-0 h-full w-full" />
      <h2 className="absolute left-[4.5rem] top-1/2 block -translate-y-1/2 font-bold text-white">
        {children}
      </h2>
    </div>
  );
}
