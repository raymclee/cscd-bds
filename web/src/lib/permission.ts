import { Session } from "~/graphql/graphql";

export function canEdit(session: Session) {
  return session.isAdmin || session.hasEditAccess;
}
