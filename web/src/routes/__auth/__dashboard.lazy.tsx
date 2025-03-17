import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { Switcher } from "~/components/switcher";
import { CopilotPopup } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { CustomInput } from "~/components/customer-input";
export const Route = createLazyFileRoute("/__auth/__dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  const { level } = Route.useSearch();

  return (
    <LazyMotion features={domAnimation}>
      {(session.isSuperAdmin || session.isCeo) && <Switcher />}
      {/* <div className="relative max-h-screen min-h-screen overflow-hidden max-w-screen bg-slate-900"> */}
      {/* <CopilotKit
        runtimeUrl="/api/copilotkit"
        showDevConsole={false}
        credentials="include"
        forwardedParameters={{ temperature: 0 }}
        properties={{
          userLevel: level,
        }}
      > */}
      <Outlet />
      {/* <CopilotPopup
          showResponseButton={false}
          clickOutsideToClose={false}
          hitEscapeToClose={false}
          instructions="你的名字是墙博士，你是一个专业的助手，请帮助用户解决问题。"
          labels={{
            title: "墙博士",
            placeholder: "请输入...",
            initial: "你好，我是墙博士，有什么可以帮你的吗？",
            error: "❌ 发生错误，请稍后再试",
            stopGenerating: "停止生成",
            regenerateResponse: "重新生成",
          }}
          Input={CustomInput}
          // makeSystemMessage={(contextString, additionalInstructions) => {
          //   return (
          //     `
          //     请作为一个高效、称职、认真和勤奋的专业助手。

          //     帮助用户实现他们的目标，并以尽可能高效的方式做到这一点，避免不必要的修饰，但也不牺牲专业性。
          //     始终保持礼貌和尊重，言简意赅。

          //     他們提供了一些工具，請確保使用這些工具前，先讓用戶提供所需資料。在沒有收到所有資料前，不要使用工具。

          //     請盡您所能地幫助他們。當前日期：${new Date().toLocaleDateString()}

          //     用户已经为您提供了以下上下文：
          //     \`\`\`
          //     ${contextString}
          //     \`\`\`

          //     ` +
          //     (additionalInstructions ? `\n\n${additionalInstructions}` : "")
          //   );
          // }}
          makeSystemMessage={(contextString, additionalInstructions) => {
            return (
              `
              请作为一个高效、称职、认真和勤奋的专业助手。

              帮助用户实现他们的目标，并以尽可能高效的方式做到这一点，避免不必要的修饰，但也不牺牲专业性。
              始终保持礼貌和尊重，言简意赅。

              他們提供了不同系統的工具，所有工具都屬於不同的系統，請在調用工具前，先確保用戶已說明系統名稱。
              如需要使用工具，請在回复時注明來源於哪個系統。

              系統名稱：
              - ISC/SAP系統
              - DAP/BI系統
              - IPD/PLM系統
              - OA系統
              - 市場拓展地圖

              請盡您所能地幫助他們。當前日期：${new Date().toLocaleDateString()}

              用户已经为您提供了以下上下文：
              \`\`\`
              ${contextString}
              \`\`\`

              ` +
              (additionalInstructions ? `\n\n${additionalInstructions}` : "")
            );
          }}
        /> */}
      {/* </CopilotKit> */}
    </LazyMotion>
  );
}
