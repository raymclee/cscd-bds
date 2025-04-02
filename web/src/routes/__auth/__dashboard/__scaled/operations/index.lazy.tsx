import { createLazyFileRoute } from "@tanstack/react-router";

import { useEffect } from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { ProjectSelect } from "~/components/dashboard/project-select";

import top from "~/assets/svg/top.png";

import {
  operationsIndexPageQuery,
  operationsIndexPageQuery$data,
} from "__generated__/operationsIndexPageQuery.graphql";
import { Toaster } from "~/components/ui/sonner";
import { Amounts } from "./-components/amounts";
import { ContractCost } from "./-components/contract-cost";
import { Quality } from "./-components/quality";
import { Safety } from "./-components/safety";

import realtimeWarning from "~/assets/operationv2/real-time-warning.png";
import { Progress } from "./-components/progress";
import { ProjectIntro } from "./-components/project-intro";

export const Route = createLazyFileRoute(
  "/__auth/__dashboard/__scaled/operations/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<operationsIndexPageQuery>(
    graphql`
      query operationsIndexPageQuery($userId: ID!) {
        node(id: $userId) {
          ... on User {
            projects(
              where: { isFinishedNEQ: true }
              orderBy: [{ field: CODE }]
            ) {
              edges {
                node {
                  id
                  name
                  code
                  manager
                  owner
                  jzs
                  mcn
                  consultant
                  areas
                  fsDate
                  opDate
                  startDate
                  endDate
                  mntyr
                  conType
                  cje
                  yye
                  xjl
                  xmglfYs
                  xmglfLj
                  xmsjf
                  ownerApplyCount
                  ownerApplyAmount
                  ownerApproveCount
                  ownerApproveAmount
                  contractorApplyCount
                  contractorApplyAmount
                  contractorApproveCount
                  contractorApproveAmount
                  installProgress
                  effectiveContractAmount
                  vaApplyAmount
                  vaApproveAmount
                  accumulatedStatutoryDeductions
                  accumulatedNonStatutoryDeductions
                  accumulatedNonStatutoryDeductionsPeriod
                  totalContractAmount
                  aluminumPlateBudgetPercentage
                  aluminumBudgetPercentage
                  glassBudgetPercentage
                  ironBudgetPercentage
                  milestonePlanYear
                  milestonePlanMonth
                  milestoneDoneYear
                  milestoneDoneMonth
                  pmArea
                  pmYearTarget
                  pmMonthTarget
                  pmYearActual
                  pmMonthActual
                  pmTotal
                  pmYesterday
                  unitInventoryTotal
                  unitComponentTotal
                  unitComponentProduction
                  unitComponentInstallation
                  materialLoss
                  designRatedWeight
                  processingWeight
                  itemStockWeight
                  palletsInStock
                  partsInStock
                  qualityScore
                  qualityRanking
                  bulkMaterialsTotalOrderQuantity
                  bulkMaterialsCompletedQuantity
                  bulkMaterialsUncompletedQuantity
                  planTotalCount
                  planOverdueCount
                  planOverdueMonthCount
                  diagramBdTotalCount
                  diagramBdFinishCount
                  diagramConstructionTotalCount
                  diagramConstructionFinishCount
                  diagramProcessingFinishCount
                  diagramProcessingTotalCount
                  diagramCApprovalRatioNumerator
                  diagramCApprovalRatioDenominator
                  projectStaffs(
                    first: 3
                    orderBy: { field: CREATED_AT, direction: DESC }
                  ) {
                    edges {
                      node {
                        installation
                        management
                        design
                        createdAt
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  );

  return (
    <>
      <Operation data={data} />
      <div className="dark">
        <Toaster position="top-right" />
      </div>
    </>
  );
}

function Operation({ data }: { data: operationsIndexPageQuery$data }) {
  const navigate = Route.useNavigate();

  const defaultCode =
    Route.useSearch().code ?? data.node?.projects?.edges?.at(0)?.node?.code;

  const defaultProjectIdx = 0;
  const pj =
    data.node?.projects?.edges?.find((item) => item?.node?.code === defaultCode)
      ?.node ?? data.node?.projects?.edges?.at(defaultProjectIdx)?.node;

  const prevProject = pj
    ? data.node?.projects?.edges?.at(
        data.node?.projects?.edges?.findIndex(
          (item) => item?.node?.code === pj?.code,
        ) - 1,
      )?.node
    : data.node?.projects?.edges?.at(
        defaultProjectIdx > 0 ? defaultProjectIdx - 1 : defaultProjectIdx,
      )?.node;

  const nextProject = pj
    ? data.node?.projects?.edges?.at(
        data.node?.projects?.edges?.findIndex(
          (item) => item?.node?.code === pj?.code,
        ) + 1,
      )?.node
    : data.node?.projects?.edges?.at(
        defaultProjectIdx < data.node?.projects?.edges?.length - 1
          ? defaultProjectIdx + 1
          : defaultProjectIdx,
      )?.node;

  useEffect(() => {
    const handleLeftKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate({
          to: "/operations",
          search: { code: prevProject?.code },
          replace: true,
        });
      }
    };

    document.addEventListener("keydown", handleLeftKeyDown);

    return () => {
      document.removeEventListener("keydown", handleLeftKeyDown);
    };
  }, [prevProject]);

  useEffect(() => {
    const handleRightKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        navigate({
          to: "/operations",
          search: { code: nextProject?.code },
          replace: true,
        });
      }
    };

    document.addEventListener("keydown", handleRightKeyDown);

    return () => {
      document.removeEventListener("keydown", handleRightKeyDown);
    };
  }, [nextProject]);

  return (
    <>
      <div className="absolute left-[14rem] top-[0.4rem]">
        <ProjectSelect data={data} defaultCode={defaultCode} />
      </div>

      <img src={top} className="w-full" />

      <div className="grid grid-cols-[1fr_1.8fr_1fr] gap-x-20 px-6">
        <section className="space-y-3">
          <ContractCost project={pj} />
          <Safety />
          <Quality />
        </section>

        <section className="relative py-2">
          <img src={realtimeWarning} className="mb-6 mt-4" />

          <Amounts pj={pj} />

          <ProjectIntro pj={pj} defaultCode={defaultCode || ""} />
        </section>

        <section className="space-y-3">
          <Progress pj={pj} />
        </section>
      </div>
    </>
  );
}
