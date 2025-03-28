import * as Tabs from "@radix-ui/react-tabs";
import { useSearch } from "@tanstack/react-router";

import { ReactNode, useRef, useState, useTransition } from "react";

import basicInfoBg from "~/assets/svg/basic_info_bg.png";
import basicInfoRowBg from "~/assets/svg/basic_info_row_bg.png";
import projectOverviewTab from "~/assets/svg/project_overview_tab.png";
import projectOverviewTabSelected from "~/assets/svg/project_overview_tab_selected.png";
import projectOverviewTitle from "~/assets/svg/project_overview_title.png";
import projectIntroImg from "~/assets/operationv2/project-intro.png";

import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Project } from "~/lib/project";

export function ProjectIntro({
  pj,
  defaultCode,
}: {
  pj: Project;
  defaultCode: string;
}) {
  return (
    <>
      <img src={projectIntroImg} className="mx-auto mt-8 w-[65%]" />

      <div className="mt-6 flex gap-6">
        {/* <div className="flex h-[340px] flex-1 flex-col justify-center gap-4"> */}
        {/* <img src={projectOverviewLeft} /> */}
        {/* <div className="mx-auto h-full w-[85%]">
      <Rhino />
    </div>
    <img src={projectOverviewTab} className="mx-auto w-[80%]" /> */}
        <ProjectOverviewTab pj={pj} defaultCode={defaultCode} />
        {/* </div> */}
        <div className="relative flex-1">
          {/* <img src={basicInfo} className="mx-auto w-[90%]" /> */}
          <div className="mx-auto items-center overflow-hidden py-1">
            <img src={basicInfoBg} className="absolute h-[338px] w-full" />
            <div className="relative mx-auto flex h-full w-[94%] flex-1 flex-col justify-center gap-1 pt-2">
              <BasicInfoItem title="项目名称">{pj?.name || "-"}</BasicInfoItem>
              <BasicInfoItem title="中标日期">20241028</BasicInfoItem>
              <BasicInfoItem title="中标合约额">1.5亿</BasicInfoItem>
              <BasicInfoItem title="幕墙面积">20000m2</BasicInfoItem>
              <BasicInfoItem title="平均单价">10000 / m2</BasicInfoItem>
              <BasicInfoItem title="合约形式(NSC or DSC)">DSC</BasicInfoItem>
              <BasicInfoItem title="业主单位">
                中建三局华南公司广州分公司
              </BasicInfoItem>
              <BasicInfoItem title="总包单位">
                中建三局华南公司广州分公司
              </BasicInfoItem>
              <BasicInfoItem title="则师">则师</BasicInfoItem>
              <BasicInfoItem title="QS顾问">QS顾问</BasicInfoItem>

              <BasicInfoItem title="幕墙顾问">幕墙顾问</BasicInfoItem>
              <BasicInfoItem title="粮期">粮期</BasicInfoItem>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectOverviewTab({
  pj,
  defaultCode,
}: {
  pj?: any;
  defaultCode?: string;
}) {
  const tabs = ["效果图", "BIM模型", "航拍图"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [, startTransition] = useTransition();
  const code = useSearch({
    from: "/__auth/__dashboard/__scaled/operations/",
    select: (search) => search.code,
  });

  const onChange = (tab: string) => {
    startTransition(() => {
      setSelectedTab(tab);
    });
  };

  return (
    <Tabs.Root
      className="relative mx-auto flex flex-1 flex-col p-1"
      defaultValue={selectedTab}
    >
      <div className="mx-auto w-[90%] flex-1 self-stretch overflow-hidden">
        <Tabs.Content value={tabs[0]} className="relative h-full">
          {<ProjectImage key={code} code={pj ? pj.code : defaultCode} />}
        </Tabs.Content>

        <Tabs.Content value={tabs[1]} className="relative h-[280px] w-full">
          {/* <Rhino /> */}
        </Tabs.Content>

        <Tabs.Content value={tabs[2]} className="h-[280px] w-full">
          {/* <StaffDistribution
            data={pj?.projectStaffs?.edges?.map((edge: any) => edge.node)}
          /> */}
        </Tabs.Content>
      </div>

      <Tabs.List className="relative mx-auto mt-4 grid h-8 w-[85%] grid-cols-3">
        <img src={projectOverviewTab} className="absolute inset-0 h-8 w-full" />
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab}
            value={tab}
            onClick={() => {
              if (tab == "BIM模型") {
                window.open(
                  `https://api.csci.com.hk/zhtappsso/api/Login/csmart-fareast`,
                );
                return;
              }
              onChange(tab);
            }}
          >
            <div className="relative flex h-8 items-center justify-center">
              {selectedTab == tab && (
                <img
                  src={projectOverviewTabSelected}
                  className="absolute inset-0 h-8"
                />
              )}
              <div className="relative text-xs">{tab}</div>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}

function BasicInfoItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative py-1">
      <img
        src={basicInfoRowBg}
        className="absolute inset-0 mx-auto h-full w-full"
      />
      <div className="relative left-12 flex h-[15px] w-[19rem] items-center">
        <div className="w-28 text-xxs">{title}</div>
        <span className="line-clamp-1 flex-1 text-xxs text-brand-project">
          {children}
        </span>
      </div>
    </div>
  );
}

function ProjectImage({ code }: { code?: string }) {
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useOnClickOutside(ref, () => setEditing(false));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const res = await fetch(`/api/v1/projects/${code}/image`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setEditing(false);
        setError(false);
        toast.success("上传成功");
      } else {
        toast.error("上传失败");
      }
    } catch (e) {
      console.error(e);
      toast.error("上传失败");
    }
  };

  return (
    <div className="group relative mx-auto h-[280px] w-full" ref={ref}>
      {error && !editing && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          没有图片
        </div>
      )}
      {!error && !editing && code && (
        <img
          src={`/static/projects/${code}/${code}.png?t=${Date.now()}`}
          className="mx-auto h-[280px] w-auto object-contain"
          onError={() => setError(true)}
        />
      )}

      {editing ? (
        <div className="flex h-full items-center px-2">
          <form onSubmit={onSubmit} className="dark">
            <Label htmlFor="picture">更换图片</Label>
            <Input
              type="file"
              name="files"
              placeholder="上传图片"
              required
              accept="image/png,image/jpeg,image/jpg"
            />
            <Button
              type="submit"
              variant="default"
              className="bg-sky-900 hover:bg-sky-700"
              size={"sm"}
            >
              上传
            </Button>
            <Button
              className="ml-2 mt-4 text-red-500 hover:bg-red-800/20"
              onClick={() => setEditing(false)}
              type="button"
              variant="ghost"
              size={"sm"}
            >
              取消
            </Button>
          </form>
        </div>
      ) : (
        <Button
          className="absolute right-0 top-0 bg-sky-900 opacity-0 hover:bg-sky-700 group-hover:opacity-100"
          onClick={() => setEditing(true)}
          size={"icon"}
        >
          <Pencil />
        </Button>
      )}
    </div>
  );
}
