import { Customer, Session, Tender } from "~/graphql/graphql";

export function canEdit(
  session: Partial<Session>,
  {
    customer,
    tender,
  }: { customer?: Partial<Customer>; tender?: Partial<Tender> } = {},
) {
  if (tender || customer) {
    const areaCode = tender?.area?.code || customer?.area?.code;
    if (!areaCode) {
      return false;
    }
    switch (areaCode) {
      case "GA" || "HW":
        return session.isAdmin || session.hasEditAccess;
      default:
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
