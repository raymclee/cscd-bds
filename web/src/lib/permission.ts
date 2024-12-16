import { tenderDetailFragment$data } from "__generated__/tenderDetailFragment.graphql";
import { tenderListItemFragment$data } from "__generated__/tenderListItemFragment.graphql";
import { Customer, Session, Tender } from "~/graphql/graphql";

export function canEdit(
  session: Partial<Session>,
  {
    customer,
    tender,
  }: {
    customer?: Partial<Customer>;
    tender?:
      | Partial<Tender>
      | tenderListItemFragment$data
      | tenderDetailFragment$data;
  } = {},
) {
  if (tender || customer) {
    if (tender?.status === 3 || tender?.status === 4) {
      return false;
    }
    const areaCode = tender?.area?.code || customer?.area?.code;
    if (!areaCode) {
      return false;
    }
    switch (areaCode) {
      case "GA" || "HW":
        return session.isAdmin || session.hasEditAccess;
      default:
        if (session.isAdmin || session.isSuperAdmin) {
          return true;
        }
        if (session.userId == customer?.sales?.id) {
          return true;
        }
        if (session.userId == tender?.createdBy?.id) {
          return true;
        }
        if (
          session?.userId &&
          tender?.followingSales?.map((s) => s.id).includes(session.userId)
        ) {
          return true;
        }
        return false;
    }
  }

  return session.isSuperAdmin || session.isAdmin || session.hasEditAccess;
}
