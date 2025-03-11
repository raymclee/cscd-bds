/**
 * @generated SignedSource<<d88015cd3d250dff67adae456fdc0e26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type VisitRecordOrderField = "CREATED_AT" | "DATE" | "%future added value";
export type VisitRecordOrder = {
  direction?: OrderDirection;
  field: VisitRecordOrderField;
};
export type VisitRecordWhereInput = {
  and?: ReadonlyArray<VisitRecordWhereInput> | null | undefined;
  commContent?: string | null | undefined;
  commContentContains?: string | null | undefined;
  commContentContainsFold?: string | null | undefined;
  commContentEqualFold?: string | null | undefined;
  commContentGT?: string | null | undefined;
  commContentGTE?: string | null | undefined;
  commContentHasPrefix?: string | null | undefined;
  commContentHasSuffix?: string | null | undefined;
  commContentIn?: ReadonlyArray<string> | null | undefined;
  commContentLT?: string | null | undefined;
  commContentLTE?: string | null | undefined;
  commContentNEQ?: string | null | undefined;
  commContentNotIn?: ReadonlyArray<string> | null | undefined;
  commPeople?: string | null | undefined;
  commPeopleContains?: string | null | undefined;
  commPeopleContainsFold?: string | null | undefined;
  commPeopleEqualFold?: string | null | undefined;
  commPeopleGT?: string | null | undefined;
  commPeopleGTE?: string | null | undefined;
  commPeopleHasPrefix?: string | null | undefined;
  commPeopleHasSuffix?: string | null | undefined;
  commPeopleIn?: ReadonlyArray<string> | null | undefined;
  commPeopleLT?: string | null | undefined;
  commPeopleLTE?: string | null | undefined;
  commPeopleNEQ?: string | null | undefined;
  commPeopleNotIn?: ReadonlyArray<string> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  customerID?: string | null | undefined;
  customerIDContains?: string | null | undefined;
  customerIDContainsFold?: string | null | undefined;
  customerIDEqualFold?: string | null | undefined;
  customerIDGT?: string | null | undefined;
  customerIDGTE?: string | null | undefined;
  customerIDHasPrefix?: string | null | undefined;
  customerIDHasSuffix?: string | null | undefined;
  customerIDIn?: ReadonlyArray<string> | null | undefined;
  customerIDLT?: string | null | undefined;
  customerIDLTE?: string | null | undefined;
  customerIDNEQ?: string | null | undefined;
  customerIDNotIn?: ReadonlyArray<string> | null | undefined;
  date?: any | null | undefined;
  dateGT?: any | null | undefined;
  dateGTE?: any | null | undefined;
  dateIn?: ReadonlyArray<any> | null | undefined;
  dateLT?: any | null | undefined;
  dateLTE?: any | null | undefined;
  dateNEQ?: any | null | undefined;
  dateNotIn?: ReadonlyArray<any> | null | undefined;
  hasCustomer?: boolean | null | undefined;
  hasCustomerWith?: ReadonlyArray<CustomerWhereInput> | null | undefined;
  hasFollowUpBys?: boolean | null | undefined;
  hasFollowUpBysWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasTender?: boolean | null | undefined;
  hasTenderWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  nextStep?: string | null | undefined;
  nextStepContains?: string | null | undefined;
  nextStepContainsFold?: string | null | undefined;
  nextStepEqualFold?: string | null | undefined;
  nextStepGT?: string | null | undefined;
  nextStepGTE?: string | null | undefined;
  nextStepHasPrefix?: string | null | undefined;
  nextStepHasSuffix?: string | null | undefined;
  nextStepIn?: ReadonlyArray<string> | null | undefined;
  nextStepIsNil?: boolean | null | undefined;
  nextStepLT?: string | null | undefined;
  nextStepLTE?: string | null | undefined;
  nextStepNEQ?: string | null | undefined;
  nextStepNotIn?: ReadonlyArray<string> | null | undefined;
  nextStepNotNil?: boolean | null | undefined;
  not?: VisitRecordWhereInput | null | undefined;
  or?: ReadonlyArray<VisitRecordWhereInput> | null | undefined;
  tenderID?: string | null | undefined;
  tenderIDContains?: string | null | undefined;
  tenderIDContainsFold?: string | null | undefined;
  tenderIDEqualFold?: string | null | undefined;
  tenderIDGT?: string | null | undefined;
  tenderIDGTE?: string | null | undefined;
  tenderIDHasPrefix?: string | null | undefined;
  tenderIDHasSuffix?: string | null | undefined;
  tenderIDIn?: ReadonlyArray<string> | null | undefined;
  tenderIDIsNil?: boolean | null | undefined;
  tenderIDLT?: string | null | undefined;
  tenderIDLTE?: string | null | undefined;
  tenderIDNEQ?: string | null | undefined;
  tenderIDNotIn?: ReadonlyArray<string> | null | undefined;
  tenderIDNotNil?: boolean | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
  visitType?: number | null | undefined;
  visitTypeGT?: number | null | undefined;
  visitTypeGTE?: number | null | undefined;
  visitTypeIn?: ReadonlyArray<number> | null | undefined;
  visitTypeLT?: number | null | undefined;
  visitTypeLTE?: number | null | undefined;
  visitTypeNEQ?: number | null | undefined;
  visitTypeNotIn?: ReadonlyArray<number> | null | undefined;
};
export type CustomerWhereInput = {
  and?: ReadonlyArray<CustomerWhereInput> | null | undefined;
  areaID?: string | null | undefined;
  areaIDContains?: string | null | undefined;
  areaIDContainsFold?: string | null | undefined;
  areaIDEqualFold?: string | null | undefined;
  areaIDGT?: string | null | undefined;
  areaIDGTE?: string | null | undefined;
  areaIDHasPrefix?: string | null | undefined;
  areaIDHasSuffix?: string | null | undefined;
  areaIDIn?: ReadonlyArray<string> | null | undefined;
  areaIDLT?: string | null | undefined;
  areaIDLTE?: string | null | undefined;
  areaIDNEQ?: string | null | undefined;
  areaIDNotIn?: ReadonlyArray<string> | null | undefined;
  contactPerson?: string | null | undefined;
  contactPersonContains?: string | null | undefined;
  contactPersonContainsFold?: string | null | undefined;
  contactPersonEmail?: string | null | undefined;
  contactPersonEmailContains?: string | null | undefined;
  contactPersonEmailContainsFold?: string | null | undefined;
  contactPersonEmailEqualFold?: string | null | undefined;
  contactPersonEmailGT?: string | null | undefined;
  contactPersonEmailGTE?: string | null | undefined;
  contactPersonEmailHasPrefix?: string | null | undefined;
  contactPersonEmailHasSuffix?: string | null | undefined;
  contactPersonEmailIn?: ReadonlyArray<string> | null | undefined;
  contactPersonEmailIsNil?: boolean | null | undefined;
  contactPersonEmailLT?: string | null | undefined;
  contactPersonEmailLTE?: string | null | undefined;
  contactPersonEmailNEQ?: string | null | undefined;
  contactPersonEmailNotIn?: ReadonlyArray<string> | null | undefined;
  contactPersonEmailNotNil?: boolean | null | undefined;
  contactPersonEqualFold?: string | null | undefined;
  contactPersonGT?: string | null | undefined;
  contactPersonGTE?: string | null | undefined;
  contactPersonHasPrefix?: string | null | undefined;
  contactPersonHasSuffix?: string | null | undefined;
  contactPersonIn?: ReadonlyArray<string> | null | undefined;
  contactPersonIsNil?: boolean | null | undefined;
  contactPersonLT?: string | null | undefined;
  contactPersonLTE?: string | null | undefined;
  contactPersonNEQ?: string | null | undefined;
  contactPersonNotIn?: ReadonlyArray<string> | null | undefined;
  contactPersonNotNil?: boolean | null | undefined;
  contactPersonPhone?: string | null | undefined;
  contactPersonPhoneContains?: string | null | undefined;
  contactPersonPhoneContainsFold?: string | null | undefined;
  contactPersonPhoneEqualFold?: string | null | undefined;
  contactPersonPhoneGT?: string | null | undefined;
  contactPersonPhoneGTE?: string | null | undefined;
  contactPersonPhoneHasPrefix?: string | null | undefined;
  contactPersonPhoneHasSuffix?: string | null | undefined;
  contactPersonPhoneIn?: ReadonlyArray<string> | null | undefined;
  contactPersonPhoneIsNil?: boolean | null | undefined;
  contactPersonPhoneLT?: string | null | undefined;
  contactPersonPhoneLTE?: string | null | undefined;
  contactPersonPhoneNEQ?: string | null | undefined;
  contactPersonPhoneNotIn?: ReadonlyArray<string> | null | undefined;
  contactPersonPhoneNotNil?: boolean | null | undefined;
  contactPersonPosition?: string | null | undefined;
  contactPersonPositionContains?: string | null | undefined;
  contactPersonPositionContainsFold?: string | null | undefined;
  contactPersonPositionEqualFold?: string | null | undefined;
  contactPersonPositionGT?: string | null | undefined;
  contactPersonPositionGTE?: string | null | undefined;
  contactPersonPositionHasPrefix?: string | null | undefined;
  contactPersonPositionHasSuffix?: string | null | undefined;
  contactPersonPositionIn?: ReadonlyArray<string> | null | undefined;
  contactPersonPositionIsNil?: boolean | null | undefined;
  contactPersonPositionLT?: string | null | undefined;
  contactPersonPositionLTE?: string | null | undefined;
  contactPersonPositionNEQ?: string | null | undefined;
  contactPersonPositionNotIn?: ReadonlyArray<string> | null | undefined;
  contactPersonPositionNotNil?: boolean | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  createdByID?: string | null | undefined;
  createdByIDContains?: string | null | undefined;
  createdByIDContainsFold?: string | null | undefined;
  createdByIDEqualFold?: string | null | undefined;
  createdByIDGT?: string | null | undefined;
  createdByIDGTE?: string | null | undefined;
  createdByIDHasPrefix?: string | null | undefined;
  createdByIDHasSuffix?: string | null | undefined;
  createdByIDIn?: ReadonlyArray<string> | null | undefined;
  createdByIDIsNil?: boolean | null | undefined;
  createdByIDLT?: string | null | undefined;
  createdByIDLTE?: string | null | undefined;
  createdByIDNEQ?: string | null | undefined;
  createdByIDNotIn?: ReadonlyArray<string> | null | undefined;
  createdByIDNotNil?: boolean | null | undefined;
  hasArea?: boolean | null | undefined;
  hasAreaWith?: ReadonlyArray<AreaWhereInput> | null | undefined;
  hasCreatedBy?: boolean | null | undefined;
  hasCreatedByWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasSales?: boolean | null | undefined;
  hasSalesWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasTenders?: boolean | null | undefined;
  hasTendersWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  hasVisitRecords?: boolean | null | undefined;
  hasVisitRecordsWith?: ReadonlyArray<VisitRecordWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  industry?: number | null | undefined;
  industryGT?: number | null | undefined;
  industryGTE?: number | null | undefined;
  industryIn?: ReadonlyArray<number> | null | undefined;
  industryIsNil?: boolean | null | undefined;
  industryLT?: number | null | undefined;
  industryLTE?: number | null | undefined;
  industryNEQ?: number | null | undefined;
  industryNotIn?: ReadonlyArray<number> | null | undefined;
  industryNotNil?: boolean | null | undefined;
  isApproved?: boolean | null | undefined;
  isApprovedNEQ?: boolean | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: CustomerWhereInput | null | undefined;
  or?: ReadonlyArray<CustomerWhereInput> | null | undefined;
  ownerType?: number | null | undefined;
  ownerTypeGT?: number | null | undefined;
  ownerTypeGTE?: number | null | undefined;
  ownerTypeIn?: ReadonlyArray<number> | null | undefined;
  ownerTypeIsNil?: boolean | null | undefined;
  ownerTypeLT?: number | null | undefined;
  ownerTypeLTE?: number | null | undefined;
  ownerTypeNEQ?: number | null | undefined;
  ownerTypeNotIn?: ReadonlyArray<number> | null | undefined;
  ownerTypeNotNil?: boolean | null | undefined;
  salesID?: string | null | undefined;
  salesIDContains?: string | null | undefined;
  salesIDContainsFold?: string | null | undefined;
  salesIDEqualFold?: string | null | undefined;
  salesIDGT?: string | null | undefined;
  salesIDGTE?: string | null | undefined;
  salesIDHasPrefix?: string | null | undefined;
  salesIDHasSuffix?: string | null | undefined;
  salesIDIn?: ReadonlyArray<string> | null | undefined;
  salesIDIsNil?: boolean | null | undefined;
  salesIDLT?: string | null | undefined;
  salesIDLTE?: string | null | undefined;
  salesIDNEQ?: string | null | undefined;
  salesIDNotIn?: ReadonlyArray<string> | null | undefined;
  salesIDNotNil?: boolean | null | undefined;
  size?: number | null | undefined;
  sizeGT?: number | null | undefined;
  sizeGTE?: number | null | undefined;
  sizeIn?: ReadonlyArray<number> | null | undefined;
  sizeIsNil?: boolean | null | undefined;
  sizeLT?: number | null | undefined;
  sizeLTE?: number | null | undefined;
  sizeNEQ?: number | null | undefined;
  sizeNotIn?: ReadonlyArray<number> | null | undefined;
  sizeNotNil?: boolean | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type AreaWhereInput = {
  and?: ReadonlyArray<AreaWhereInput> | null | undefined;
  code?: string | null | undefined;
  codeContains?: string | null | undefined;
  codeContainsFold?: string | null | undefined;
  codeEqualFold?: string | null | undefined;
  codeGT?: string | null | undefined;
  codeGTE?: string | null | undefined;
  codeHasPrefix?: string | null | undefined;
  codeHasSuffix?: string | null | undefined;
  codeIn?: ReadonlyArray<string> | null | undefined;
  codeLT?: string | null | undefined;
  codeLTE?: string | null | undefined;
  codeNEQ?: string | null | undefined;
  codeNotIn?: ReadonlyArray<string> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  hasCustomers?: boolean | null | undefined;
  hasCustomersWith?: ReadonlyArray<CustomerWhereInput> | null | undefined;
  hasProvinces?: boolean | null | undefined;
  hasProvincesWith?: ReadonlyArray<ProvinceWhereInput> | null | undefined;
  hasTenders?: boolean | null | undefined;
  hasTendersWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  hasUsers?: boolean | null | undefined;
  hasUsersWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  leaderChatID?: string | null | undefined;
  leaderChatIDContains?: string | null | undefined;
  leaderChatIDContainsFold?: string | null | undefined;
  leaderChatIDEqualFold?: string | null | undefined;
  leaderChatIDGT?: string | null | undefined;
  leaderChatIDGTE?: string | null | undefined;
  leaderChatIDHasPrefix?: string | null | undefined;
  leaderChatIDHasSuffix?: string | null | undefined;
  leaderChatIDIn?: ReadonlyArray<string> | null | undefined;
  leaderChatIDIsNil?: boolean | null | undefined;
  leaderChatIDLT?: string | null | undefined;
  leaderChatIDLTE?: string | null | undefined;
  leaderChatIDNEQ?: string | null | undefined;
  leaderChatIDNotIn?: ReadonlyArray<string> | null | undefined;
  leaderChatIDNotNil?: boolean | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: AreaWhereInput | null | undefined;
  or?: ReadonlyArray<AreaWhereInput> | null | undefined;
  salesChatID?: string | null | undefined;
  salesChatIDContains?: string | null | undefined;
  salesChatIDContainsFold?: string | null | undefined;
  salesChatIDEqualFold?: string | null | undefined;
  salesChatIDGT?: string | null | undefined;
  salesChatIDGTE?: string | null | undefined;
  salesChatIDHasPrefix?: string | null | undefined;
  salesChatIDHasSuffix?: string | null | undefined;
  salesChatIDIn?: ReadonlyArray<string> | null | undefined;
  salesChatIDIsNil?: boolean | null | undefined;
  salesChatIDLT?: string | null | undefined;
  salesChatIDLTE?: string | null | undefined;
  salesChatIDNEQ?: string | null | undefined;
  salesChatIDNotIn?: ReadonlyArray<string> | null | undefined;
  salesChatIDNotNil?: boolean | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type ProvinceWhereInput = {
  adcode?: number | null | undefined;
  adcodeGT?: number | null | undefined;
  adcodeGTE?: number | null | undefined;
  adcodeIn?: ReadonlyArray<number> | null | undefined;
  adcodeLT?: number | null | undefined;
  adcodeLTE?: number | null | undefined;
  adcodeNEQ?: number | null | undefined;
  adcodeNotIn?: ReadonlyArray<number> | null | undefined;
  and?: ReadonlyArray<ProvinceWhereInput> | null | undefined;
  areaID?: string | null | undefined;
  areaIDContains?: string | null | undefined;
  areaIDContainsFold?: string | null | undefined;
  areaIDEqualFold?: string | null | undefined;
  areaIDGT?: string | null | undefined;
  areaIDGTE?: string | null | undefined;
  areaIDHasPrefix?: string | null | undefined;
  areaIDHasSuffix?: string | null | undefined;
  areaIDIn?: ReadonlyArray<string> | null | undefined;
  areaIDIsNil?: boolean | null | undefined;
  areaIDLT?: string | null | undefined;
  areaIDLTE?: string | null | undefined;
  areaIDNEQ?: string | null | undefined;
  areaIDNotIn?: ReadonlyArray<string> | null | undefined;
  areaIDNotNil?: boolean | null | undefined;
  countryID?: string | null | undefined;
  countryIDContains?: string | null | undefined;
  countryIDContainsFold?: string | null | undefined;
  countryIDEqualFold?: string | null | undefined;
  countryIDGT?: string | null | undefined;
  countryIDGTE?: string | null | undefined;
  countryIDHasPrefix?: string | null | undefined;
  countryIDHasSuffix?: string | null | undefined;
  countryIDIn?: ReadonlyArray<string> | null | undefined;
  countryIDLT?: string | null | undefined;
  countryIDLTE?: string | null | undefined;
  countryIDNEQ?: string | null | undefined;
  countryIDNotIn?: ReadonlyArray<string> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  hasArea?: boolean | null | undefined;
  hasAreaWith?: ReadonlyArray<AreaWhereInput> | null | undefined;
  hasCities?: boolean | null | undefined;
  hasCitiesWith?: ReadonlyArray<CityWhereInput> | null | undefined;
  hasCountry?: boolean | null | undefined;
  hasCountryWith?: ReadonlyArray<CountryWhereInput> | null | undefined;
  hasDistricts?: boolean | null | undefined;
  hasDistrictsWith?: ReadonlyArray<DistrictWhereInput> | null | undefined;
  hasTenders?: boolean | null | undefined;
  hasTendersWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: ProvinceWhereInput | null | undefined;
  or?: ReadonlyArray<ProvinceWhereInput> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type CityWhereInput = {
  adcode?: number | null | undefined;
  adcodeGT?: number | null | undefined;
  adcodeGTE?: number | null | undefined;
  adcodeIn?: ReadonlyArray<number> | null | undefined;
  adcodeLT?: number | null | undefined;
  adcodeLTE?: number | null | undefined;
  adcodeNEQ?: number | null | undefined;
  adcodeNotIn?: ReadonlyArray<number> | null | undefined;
  and?: ReadonlyArray<CityWhereInput> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  hasDistricts?: boolean | null | undefined;
  hasDistrictsWith?: ReadonlyArray<DistrictWhereInput> | null | undefined;
  hasProvince?: boolean | null | undefined;
  hasProvinceWith?: ReadonlyArray<ProvinceWhereInput> | null | undefined;
  hasTenders?: boolean | null | undefined;
  hasTendersWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: CityWhereInput | null | undefined;
  or?: ReadonlyArray<CityWhereInput> | null | undefined;
  provCode?: number | null | undefined;
  provCodeGT?: number | null | undefined;
  provCodeGTE?: number | null | undefined;
  provCodeIn?: ReadonlyArray<number> | null | undefined;
  provCodeLT?: number | null | undefined;
  provCodeLTE?: number | null | undefined;
  provCodeNEQ?: number | null | undefined;
  provCodeNotIn?: ReadonlyArray<number> | null | undefined;
  provinceID?: string | null | undefined;
  provinceIDContains?: string | null | undefined;
  provinceIDContainsFold?: string | null | undefined;
  provinceIDEqualFold?: string | null | undefined;
  provinceIDGT?: string | null | undefined;
  provinceIDGTE?: string | null | undefined;
  provinceIDHasPrefix?: string | null | undefined;
  provinceIDHasSuffix?: string | null | undefined;
  provinceIDIn?: ReadonlyArray<string> | null | undefined;
  provinceIDLT?: string | null | undefined;
  provinceIDLTE?: string | null | undefined;
  provinceIDNEQ?: string | null | undefined;
  provinceIDNotIn?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type DistrictWhereInput = {
  adcode?: number | null | undefined;
  adcodeGT?: number | null | undefined;
  adcodeGTE?: number | null | undefined;
  adcodeIn?: ReadonlyArray<number> | null | undefined;
  adcodeLT?: number | null | undefined;
  adcodeLTE?: number | null | undefined;
  adcodeNEQ?: number | null | undefined;
  adcodeNotIn?: ReadonlyArray<number> | null | undefined;
  and?: ReadonlyArray<DistrictWhereInput> | null | undefined;
  cityCode?: number | null | undefined;
  cityCodeGT?: number | null | undefined;
  cityCodeGTE?: number | null | undefined;
  cityCodeIn?: ReadonlyArray<number> | null | undefined;
  cityCodeLT?: number | null | undefined;
  cityCodeLTE?: number | null | undefined;
  cityCodeNEQ?: number | null | undefined;
  cityCodeNotIn?: ReadonlyArray<number> | null | undefined;
  cityID?: string | null | undefined;
  cityIDContains?: string | null | undefined;
  cityIDContainsFold?: string | null | undefined;
  cityIDEqualFold?: string | null | undefined;
  cityIDGT?: string | null | undefined;
  cityIDGTE?: string | null | undefined;
  cityIDHasPrefix?: string | null | undefined;
  cityIDHasSuffix?: string | null | undefined;
  cityIDIn?: ReadonlyArray<string> | null | undefined;
  cityIDIsNil?: boolean | null | undefined;
  cityIDLT?: string | null | undefined;
  cityIDLTE?: string | null | undefined;
  cityIDNEQ?: string | null | undefined;
  cityIDNotIn?: ReadonlyArray<string> | null | undefined;
  cityIDNotNil?: boolean | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  hasCity?: boolean | null | undefined;
  hasCityWith?: ReadonlyArray<CityWhereInput> | null | undefined;
  hasPlots?: boolean | null | undefined;
  hasPlotsWith?: ReadonlyArray<PlotWhereInput> | null | undefined;
  hasProvince?: boolean | null | undefined;
  hasProvinceWith?: ReadonlyArray<ProvinceWhereInput> | null | undefined;
  hasTenders?: boolean | null | undefined;
  hasTendersWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: DistrictWhereInput | null | undefined;
  or?: ReadonlyArray<DistrictWhereInput> | null | undefined;
  provCode?: number | null | undefined;
  provCodeGT?: number | null | undefined;
  provCodeGTE?: number | null | undefined;
  provCodeIn?: ReadonlyArray<number> | null | undefined;
  provCodeLT?: number | null | undefined;
  provCodeLTE?: number | null | undefined;
  provCodeNEQ?: number | null | undefined;
  provCodeNotIn?: ReadonlyArray<number> | null | undefined;
  provinceID?: string | null | undefined;
  provinceIDContains?: string | null | undefined;
  provinceIDContainsFold?: string | null | undefined;
  provinceIDEqualFold?: string | null | undefined;
  provinceIDGT?: string | null | undefined;
  provinceIDGTE?: string | null | undefined;
  provinceIDHasPrefix?: string | null | undefined;
  provinceIDHasSuffix?: string | null | undefined;
  provinceIDIn?: ReadonlyArray<string> | null | undefined;
  provinceIDLT?: string | null | undefined;
  provinceIDLTE?: string | null | undefined;
  provinceIDNEQ?: string | null | undefined;
  provinceIDNotIn?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type PlotWhereInput = {
  and?: ReadonlyArray<PlotWhereInput> | null | undefined;
  colorHex?: string | null | undefined;
  colorHexContains?: string | null | undefined;
  colorHexContainsFold?: string | null | undefined;
  colorHexEqualFold?: string | null | undefined;
  colorHexGT?: string | null | undefined;
  colorHexGTE?: string | null | undefined;
  colorHexHasPrefix?: string | null | undefined;
  colorHexHasSuffix?: string | null | undefined;
  colorHexIn?: ReadonlyArray<string> | null | undefined;
  colorHexLT?: string | null | undefined;
  colorHexLTE?: string | null | undefined;
  colorHexNEQ?: string | null | undefined;
  colorHexNotIn?: ReadonlyArray<string> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  districtID?: string | null | undefined;
  districtIDContains?: string | null | undefined;
  districtIDContainsFold?: string | null | undefined;
  districtIDEqualFold?: string | null | undefined;
  districtIDGT?: string | null | undefined;
  districtIDGTE?: string | null | undefined;
  districtIDHasPrefix?: string | null | undefined;
  districtIDHasSuffix?: string | null | undefined;
  districtIDIn?: ReadonlyArray<string> | null | undefined;
  districtIDLT?: string | null | undefined;
  districtIDLTE?: string | null | undefined;
  districtIDNEQ?: string | null | undefined;
  districtIDNotIn?: ReadonlyArray<string> | null | undefined;
  hasDistrict?: boolean | null | undefined;
  hasDistrictWith?: ReadonlyArray<DistrictWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: PlotWhereInput | null | undefined;
  or?: ReadonlyArray<PlotWhereInput> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type TenderWhereInput = {
  address?: string | null | undefined;
  addressContains?: string | null | undefined;
  addressContainsFold?: string | null | undefined;
  addressEqualFold?: string | null | undefined;
  addressGT?: string | null | undefined;
  addressGTE?: string | null | undefined;
  addressHasPrefix?: string | null | undefined;
  addressHasSuffix?: string | null | undefined;
  addressIn?: ReadonlyArray<string> | null | undefined;
  addressIsNil?: boolean | null | undefined;
  addressLT?: string | null | undefined;
  addressLTE?: string | null | undefined;
  addressNEQ?: string | null | undefined;
  addressNotIn?: ReadonlyArray<string> | null | undefined;
  addressNotNil?: boolean | null | undefined;
  and?: ReadonlyArray<TenderWhereInput> | null | undefined;
  architect?: string | null | undefined;
  architectContains?: string | null | undefined;
  architectContainsFold?: string | null | undefined;
  architectEqualFold?: string | null | undefined;
  architectGT?: string | null | undefined;
  architectGTE?: string | null | undefined;
  architectHasPrefix?: string | null | undefined;
  architectHasSuffix?: string | null | undefined;
  architectIn?: ReadonlyArray<string> | null | undefined;
  architectIsNil?: boolean | null | undefined;
  architectLT?: string | null | undefined;
  architectLTE?: string | null | undefined;
  architectNEQ?: string | null | undefined;
  architectNotIn?: ReadonlyArray<string> | null | undefined;
  architectNotNil?: boolean | null | undefined;
  areaID?: string | null | undefined;
  areaIDContains?: string | null | undefined;
  areaIDContainsFold?: string | null | undefined;
  areaIDEqualFold?: string | null | undefined;
  areaIDGT?: string | null | undefined;
  areaIDGTE?: string | null | undefined;
  areaIDHasPrefix?: string | null | undefined;
  areaIDHasSuffix?: string | null | undefined;
  areaIDIn?: ReadonlyArray<string> | null | undefined;
  areaIDLT?: string | null | undefined;
  areaIDLTE?: string | null | undefined;
  areaIDNEQ?: string | null | undefined;
  areaIDNotIn?: ReadonlyArray<string> | null | undefined;
  biddingDate?: any | null | undefined;
  biddingDateGT?: any | null | undefined;
  biddingDateGTE?: any | null | undefined;
  biddingDateIn?: ReadonlyArray<any> | null | undefined;
  biddingDateIsNil?: boolean | null | undefined;
  biddingDateLT?: any | null | undefined;
  biddingDateLTE?: any | null | undefined;
  biddingDateNEQ?: any | null | undefined;
  biddingDateNotIn?: ReadonlyArray<any> | null | undefined;
  biddingDateNotNil?: boolean | null | undefined;
  biddingInstructions?: string | null | undefined;
  biddingInstructionsContains?: string | null | undefined;
  biddingInstructionsContainsFold?: string | null | undefined;
  biddingInstructionsEqualFold?: string | null | undefined;
  biddingInstructionsGT?: string | null | undefined;
  biddingInstructionsGTE?: string | null | undefined;
  biddingInstructionsHasPrefix?: string | null | undefined;
  biddingInstructionsHasSuffix?: string | null | undefined;
  biddingInstructionsIn?: ReadonlyArray<string> | null | undefined;
  biddingInstructionsIsNil?: boolean | null | undefined;
  biddingInstructionsLT?: string | null | undefined;
  biddingInstructionsLTE?: string | null | undefined;
  biddingInstructionsNEQ?: string | null | undefined;
  biddingInstructionsNotIn?: ReadonlyArray<string> | null | undefined;
  biddingInstructionsNotNil?: boolean | null | undefined;
  cityID?: string | null | undefined;
  cityIDContains?: string | null | undefined;
  cityIDContainsFold?: string | null | undefined;
  cityIDEqualFold?: string | null | undefined;
  cityIDGT?: string | null | undefined;
  cityIDGTE?: string | null | undefined;
  cityIDHasPrefix?: string | null | undefined;
  cityIDHasSuffix?: string | null | undefined;
  cityIDIn?: ReadonlyArray<string> | null | undefined;
  cityIDIsNil?: boolean | null | undefined;
  cityIDLT?: string | null | undefined;
  cityIDLTE?: string | null | undefined;
  cityIDNEQ?: string | null | undefined;
  cityIDNotIn?: ReadonlyArray<string> | null | undefined;
  cityIDNotNil?: boolean | null | undefined;
  classify?: number | null | undefined;
  classifyGT?: number | null | undefined;
  classifyGTE?: number | null | undefined;
  classifyIn?: ReadonlyArray<number> | null | undefined;
  classifyIsNil?: boolean | null | undefined;
  classifyLT?: number | null | undefined;
  classifyLTE?: number | null | undefined;
  classifyNEQ?: number | null | undefined;
  classifyNotIn?: ReadonlyArray<number> | null | undefined;
  classifyNotNil?: boolean | null | undefined;
  code?: string | null | undefined;
  codeContains?: string | null | undefined;
  codeContainsFold?: string | null | undefined;
  codeEqualFold?: string | null | undefined;
  codeGT?: string | null | undefined;
  codeGTE?: string | null | undefined;
  codeHasPrefix?: string | null | undefined;
  codeHasSuffix?: string | null | undefined;
  codeIn?: ReadonlyArray<string> | null | undefined;
  codeLT?: string | null | undefined;
  codeLTE?: string | null | undefined;
  codeNEQ?: string | null | undefined;
  codeNotIn?: ReadonlyArray<string> | null | undefined;
  competitivePartnershipRating?: number | null | undefined;
  competitivePartnershipRatingGT?: number | null | undefined;
  competitivePartnershipRatingGTE?: number | null | undefined;
  competitivePartnershipRatingIn?: ReadonlyArray<number> | null | undefined;
  competitivePartnershipRatingIsNil?: boolean | null | undefined;
  competitivePartnershipRatingLT?: number | null | undefined;
  competitivePartnershipRatingLTE?: number | null | undefined;
  competitivePartnershipRatingNEQ?: number | null | undefined;
  competitivePartnershipRatingNotIn?: ReadonlyArray<number> | null | undefined;
  competitivePartnershipRatingNotNil?: boolean | null | undefined;
  competitivePartnershipRatingOverview?: string | null | undefined;
  competitivePartnershipRatingOverviewContains?: string | null | undefined;
  competitivePartnershipRatingOverviewContainsFold?: string | null | undefined;
  competitivePartnershipRatingOverviewEqualFold?: string | null | undefined;
  competitivePartnershipRatingOverviewGT?: string | null | undefined;
  competitivePartnershipRatingOverviewGTE?: string | null | undefined;
  competitivePartnershipRatingOverviewHasPrefix?: string | null | undefined;
  competitivePartnershipRatingOverviewHasSuffix?: string | null | undefined;
  competitivePartnershipRatingOverviewIn?: ReadonlyArray<string> | null | undefined;
  competitivePartnershipRatingOverviewIsNil?: boolean | null | undefined;
  competitivePartnershipRatingOverviewLT?: string | null | undefined;
  competitivePartnershipRatingOverviewLTE?: string | null | undefined;
  competitivePartnershipRatingOverviewNEQ?: string | null | undefined;
  competitivePartnershipRatingOverviewNotIn?: ReadonlyArray<string> | null | undefined;
  competitivePartnershipRatingOverviewNotNil?: boolean | null | undefined;
  competitorID?: string | null | undefined;
  competitorIDContains?: string | null | undefined;
  competitorIDContainsFold?: string | null | undefined;
  competitorIDEqualFold?: string | null | undefined;
  competitorIDGT?: string | null | undefined;
  competitorIDGTE?: string | null | undefined;
  competitorIDHasPrefix?: string | null | undefined;
  competitorIDHasSuffix?: string | null | undefined;
  competitorIDIn?: ReadonlyArray<string> | null | undefined;
  competitorIDIsNil?: boolean | null | undefined;
  competitorIDLT?: string | null | undefined;
  competitorIDLTE?: string | null | undefined;
  competitorIDNEQ?: string | null | undefined;
  competitorIDNotIn?: ReadonlyArray<string> | null | undefined;
  competitorIDNotNil?: boolean | null | undefined;
  competitorSituations?: string | null | undefined;
  competitorSituationsContains?: string | null | undefined;
  competitorSituationsContainsFold?: string | null | undefined;
  competitorSituationsEqualFold?: string | null | undefined;
  competitorSituationsGT?: string | null | undefined;
  competitorSituationsGTE?: string | null | undefined;
  competitorSituationsHasPrefix?: string | null | undefined;
  competitorSituationsHasSuffix?: string | null | undefined;
  competitorSituationsIn?: ReadonlyArray<string> | null | undefined;
  competitorSituationsIsNil?: boolean | null | undefined;
  competitorSituationsLT?: string | null | undefined;
  competitorSituationsLTE?: string | null | undefined;
  competitorSituationsNEQ?: string | null | undefined;
  competitorSituationsNotIn?: ReadonlyArray<string> | null | undefined;
  competitorSituationsNotNil?: boolean | null | undefined;
  constructionArea?: string | null | undefined;
  constructionAreaContains?: string | null | undefined;
  constructionAreaContainsFold?: string | null | undefined;
  constructionAreaEqualFold?: string | null | undefined;
  constructionAreaGT?: string | null | undefined;
  constructionAreaGTE?: string | null | undefined;
  constructionAreaHasPrefix?: string | null | undefined;
  constructionAreaHasSuffix?: string | null | undefined;
  constructionAreaIn?: ReadonlyArray<string> | null | undefined;
  constructionAreaIsNil?: boolean | null | undefined;
  constructionAreaLT?: string | null | undefined;
  constructionAreaLTE?: string | null | undefined;
  constructionAreaNEQ?: string | null | undefined;
  constructionAreaNotIn?: ReadonlyArray<string> | null | undefined;
  constructionAreaNotNil?: boolean | null | undefined;
  consultingFirm?: string | null | undefined;
  consultingFirmContains?: string | null | undefined;
  consultingFirmContainsFold?: string | null | undefined;
  consultingFirmEqualFold?: string | null | undefined;
  consultingFirmGT?: string | null | undefined;
  consultingFirmGTE?: string | null | undefined;
  consultingFirmHasPrefix?: string | null | undefined;
  consultingFirmHasSuffix?: string | null | undefined;
  consultingFirmIn?: ReadonlyArray<string> | null | undefined;
  consultingFirmIsNil?: boolean | null | undefined;
  consultingFirmLT?: string | null | undefined;
  consultingFirmLTE?: string | null | undefined;
  consultingFirmNEQ?: string | null | undefined;
  consultingFirmNotIn?: ReadonlyArray<string> | null | undefined;
  consultingFirmNotNil?: boolean | null | undefined;
  contractForm?: string | null | undefined;
  contractFormContains?: string | null | undefined;
  contractFormContainsFold?: string | null | undefined;
  contractFormEqualFold?: string | null | undefined;
  contractFormGT?: string | null | undefined;
  contractFormGTE?: string | null | undefined;
  contractFormHasPrefix?: string | null | undefined;
  contractFormHasSuffix?: string | null | undefined;
  contractFormIn?: ReadonlyArray<string> | null | undefined;
  contractFormIsNil?: boolean | null | undefined;
  contractFormLT?: string | null | undefined;
  contractFormLTE?: string | null | undefined;
  contractFormNEQ?: string | null | undefined;
  contractFormNotIn?: ReadonlyArray<string> | null | undefined;
  contractFormNotNil?: boolean | null | undefined;
  contractor?: string | null | undefined;
  contractorContains?: string | null | undefined;
  contractorContainsFold?: string | null | undefined;
  contractorEqualFold?: string | null | undefined;
  contractorGT?: string | null | undefined;
  contractorGTE?: string | null | undefined;
  contractorHasPrefix?: string | null | undefined;
  contractorHasSuffix?: string | null | undefined;
  contractorIn?: ReadonlyArray<string> | null | undefined;
  contractorIsNil?: boolean | null | undefined;
  contractorLT?: string | null | undefined;
  contractorLTE?: string | null | undefined;
  contractorNEQ?: string | null | undefined;
  contractorNotIn?: ReadonlyArray<string> | null | undefined;
  contractorNotNil?: boolean | null | undefined;
  costEngineer?: string | null | undefined;
  costEngineerContains?: string | null | undefined;
  costEngineerContainsFold?: string | null | undefined;
  costEngineerEqualFold?: string | null | undefined;
  costEngineerGT?: string | null | undefined;
  costEngineerGTE?: string | null | undefined;
  costEngineerHasPrefix?: string | null | undefined;
  costEngineerHasSuffix?: string | null | undefined;
  costEngineerIn?: ReadonlyArray<string> | null | undefined;
  costEngineerIsNil?: boolean | null | undefined;
  costEngineerLT?: string | null | undefined;
  costEngineerLTE?: string | null | undefined;
  costEngineerNEQ?: string | null | undefined;
  costEngineerNotIn?: ReadonlyArray<string> | null | undefined;
  costEngineerNotNil?: boolean | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  createdByID?: string | null | undefined;
  createdByIDContains?: string | null | undefined;
  createdByIDContainsFold?: string | null | undefined;
  createdByIDEqualFold?: string | null | undefined;
  createdByIDGT?: string | null | undefined;
  createdByIDGTE?: string | null | undefined;
  createdByIDHasPrefix?: string | null | undefined;
  createdByIDHasSuffix?: string | null | undefined;
  createdByIDIn?: ReadonlyArray<string> | null | undefined;
  createdByIDIsNil?: boolean | null | undefined;
  createdByIDLT?: string | null | undefined;
  createdByIDLTE?: string | null | undefined;
  createdByIDNEQ?: string | null | undefined;
  createdByIDNotIn?: ReadonlyArray<string> | null | undefined;
  createdByIDNotNil?: boolean | null | undefined;
  creditAndPaymentRating?: number | null | undefined;
  creditAndPaymentRatingGT?: number | null | undefined;
  creditAndPaymentRatingGTE?: number | null | undefined;
  creditAndPaymentRatingIn?: ReadonlyArray<number> | null | undefined;
  creditAndPaymentRatingIsNil?: boolean | null | undefined;
  creditAndPaymentRatingLT?: number | null | undefined;
  creditAndPaymentRatingLTE?: number | null | undefined;
  creditAndPaymentRatingNEQ?: number | null | undefined;
  creditAndPaymentRatingNotIn?: ReadonlyArray<number> | null | undefined;
  creditAndPaymentRatingNotNil?: boolean | null | undefined;
  creditAndPaymentRatingOverview?: string | null | undefined;
  creditAndPaymentRatingOverviewContains?: string | null | undefined;
  creditAndPaymentRatingOverviewContainsFold?: string | null | undefined;
  creditAndPaymentRatingOverviewEqualFold?: string | null | undefined;
  creditAndPaymentRatingOverviewGT?: string | null | undefined;
  creditAndPaymentRatingOverviewGTE?: string | null | undefined;
  creditAndPaymentRatingOverviewHasPrefix?: string | null | undefined;
  creditAndPaymentRatingOverviewHasSuffix?: string | null | undefined;
  creditAndPaymentRatingOverviewIn?: ReadonlyArray<string> | null | undefined;
  creditAndPaymentRatingOverviewIsNil?: boolean | null | undefined;
  creditAndPaymentRatingOverviewLT?: string | null | undefined;
  creditAndPaymentRatingOverviewLTE?: string | null | undefined;
  creditAndPaymentRatingOverviewNEQ?: string | null | undefined;
  creditAndPaymentRatingOverviewNotIn?: ReadonlyArray<string> | null | undefined;
  creditAndPaymentRatingOverviewNotNil?: boolean | null | undefined;
  currentProgress?: string | null | undefined;
  currentProgressContains?: string | null | undefined;
  currentProgressContainsFold?: string | null | undefined;
  currentProgressEqualFold?: string | null | undefined;
  currentProgressGT?: string | null | undefined;
  currentProgressGTE?: string | null | undefined;
  currentProgressHasPrefix?: string | null | undefined;
  currentProgressHasSuffix?: string | null | undefined;
  currentProgressIn?: ReadonlyArray<string> | null | undefined;
  currentProgressIsNil?: boolean | null | undefined;
  currentProgressLT?: string | null | undefined;
  currentProgressLTE?: string | null | undefined;
  currentProgressNEQ?: string | null | undefined;
  currentProgressNotIn?: ReadonlyArray<string> | null | undefined;
  currentProgressNotNil?: boolean | null | undefined;
  customerID?: string | null | undefined;
  customerIDContains?: string | null | undefined;
  customerIDContainsFold?: string | null | undefined;
  customerIDEqualFold?: string | null | undefined;
  customerIDGT?: string | null | undefined;
  customerIDGTE?: string | null | undefined;
  customerIDHasPrefix?: string | null | undefined;
  customerIDHasSuffix?: string | null | undefined;
  customerIDIn?: ReadonlyArray<string> | null | undefined;
  customerIDIsNil?: boolean | null | undefined;
  customerIDLT?: string | null | undefined;
  customerIDLTE?: string | null | undefined;
  customerIDNEQ?: string | null | undefined;
  customerIDNotIn?: ReadonlyArray<string> | null | undefined;
  customerIDNotNil?: boolean | null | undefined;
  customerRelationshipRating?: number | null | undefined;
  customerRelationshipRatingGT?: number | null | undefined;
  customerRelationshipRatingGTE?: number | null | undefined;
  customerRelationshipRatingIn?: ReadonlyArray<number> | null | undefined;
  customerRelationshipRatingIsNil?: boolean | null | undefined;
  customerRelationshipRatingLT?: number | null | undefined;
  customerRelationshipRatingLTE?: number | null | undefined;
  customerRelationshipRatingNEQ?: number | null | undefined;
  customerRelationshipRatingNotIn?: ReadonlyArray<number> | null | undefined;
  customerRelationshipRatingNotNil?: boolean | null | undefined;
  customerRelationshipRatingOverview?: string | null | undefined;
  customerRelationshipRatingOverviewContains?: string | null | undefined;
  customerRelationshipRatingOverviewContainsFold?: string | null | undefined;
  customerRelationshipRatingOverviewEqualFold?: string | null | undefined;
  customerRelationshipRatingOverviewGT?: string | null | undefined;
  customerRelationshipRatingOverviewGTE?: string | null | undefined;
  customerRelationshipRatingOverviewHasPrefix?: string | null | undefined;
  customerRelationshipRatingOverviewHasSuffix?: string | null | undefined;
  customerRelationshipRatingOverviewIn?: ReadonlyArray<string> | null | undefined;
  customerRelationshipRatingOverviewIsNil?: boolean | null | undefined;
  customerRelationshipRatingOverviewLT?: string | null | undefined;
  customerRelationshipRatingOverviewLTE?: string | null | undefined;
  customerRelationshipRatingOverviewNEQ?: string | null | undefined;
  customerRelationshipRatingOverviewNotIn?: ReadonlyArray<string> | null | undefined;
  customerRelationshipRatingOverviewNotNil?: boolean | null | undefined;
  designUnit?: string | null | undefined;
  designUnitContains?: string | null | undefined;
  designUnitContainsFold?: string | null | undefined;
  designUnitEqualFold?: string | null | undefined;
  designUnitGT?: string | null | undefined;
  designUnitGTE?: string | null | undefined;
  designUnitHasPrefix?: string | null | undefined;
  designUnitHasSuffix?: string | null | undefined;
  designUnitIn?: ReadonlyArray<string> | null | undefined;
  designUnitIsNil?: boolean | null | undefined;
  designUnitLT?: string | null | undefined;
  designUnitLTE?: string | null | undefined;
  designUnitNEQ?: string | null | undefined;
  designUnitNotIn?: ReadonlyArray<string> | null | undefined;
  designUnitNotNil?: boolean | null | undefined;
  developer?: string | null | undefined;
  developerContains?: string | null | undefined;
  developerContainsFold?: string | null | undefined;
  developerEqualFold?: string | null | undefined;
  developerGT?: string | null | undefined;
  developerGTE?: string | null | undefined;
  developerHasPrefix?: string | null | undefined;
  developerHasSuffix?: string | null | undefined;
  developerIn?: ReadonlyArray<string> | null | undefined;
  developerIsNil?: boolean | null | undefined;
  developerLT?: string | null | undefined;
  developerLTE?: string | null | undefined;
  developerNEQ?: string | null | undefined;
  developerNotIn?: ReadonlyArray<string> | null | undefined;
  developerNotNil?: boolean | null | undefined;
  discoveryDate?: any | null | undefined;
  discoveryDateGT?: any | null | undefined;
  discoveryDateGTE?: any | null | undefined;
  discoveryDateIn?: ReadonlyArray<any> | null | undefined;
  discoveryDateLT?: any | null | undefined;
  discoveryDateLTE?: any | null | undefined;
  discoveryDateNEQ?: any | null | undefined;
  discoveryDateNotIn?: ReadonlyArray<any> | null | undefined;
  districtID?: string | null | undefined;
  districtIDContains?: string | null | undefined;
  districtIDContainsFold?: string | null | undefined;
  districtIDEqualFold?: string | null | undefined;
  districtIDGT?: string | null | undefined;
  districtIDGTE?: string | null | undefined;
  districtIDHasPrefix?: string | null | undefined;
  districtIDHasSuffix?: string | null | undefined;
  districtIDIn?: ReadonlyArray<string> | null | undefined;
  districtIDIsNil?: boolean | null | undefined;
  districtIDLT?: string | null | undefined;
  districtIDLTE?: string | null | undefined;
  districtIDNEQ?: string | null | undefined;
  districtIDNotIn?: ReadonlyArray<string> | null | undefined;
  districtIDNotNil?: boolean | null | undefined;
  estimatedAmount?: number | null | undefined;
  estimatedAmountGT?: number | null | undefined;
  estimatedAmountGTE?: number | null | undefined;
  estimatedAmountIn?: ReadonlyArray<number> | null | undefined;
  estimatedAmountIsNil?: boolean | null | undefined;
  estimatedAmountLT?: number | null | undefined;
  estimatedAmountLTE?: number | null | undefined;
  estimatedAmountNEQ?: number | null | undefined;
  estimatedAmountNotIn?: ReadonlyArray<number> | null | undefined;
  estimatedAmountNotNil?: boolean | null | undefined;
  estimatedProjectEndDate?: any | null | undefined;
  estimatedProjectEndDateGT?: any | null | undefined;
  estimatedProjectEndDateGTE?: any | null | undefined;
  estimatedProjectEndDateIn?: ReadonlyArray<any> | null | undefined;
  estimatedProjectEndDateIsNil?: boolean | null | undefined;
  estimatedProjectEndDateLT?: any | null | undefined;
  estimatedProjectEndDateLTE?: any | null | undefined;
  estimatedProjectEndDateNEQ?: any | null | undefined;
  estimatedProjectEndDateNotIn?: ReadonlyArray<any> | null | undefined;
  estimatedProjectEndDateNotNil?: boolean | null | undefined;
  estimatedProjectStartDate?: any | null | undefined;
  estimatedProjectStartDateGT?: any | null | undefined;
  estimatedProjectStartDateGTE?: any | null | undefined;
  estimatedProjectStartDateIn?: ReadonlyArray<any> | null | undefined;
  estimatedProjectStartDateIsNil?: boolean | null | undefined;
  estimatedProjectStartDateLT?: any | null | undefined;
  estimatedProjectStartDateLTE?: any | null | undefined;
  estimatedProjectStartDateNEQ?: any | null | undefined;
  estimatedProjectStartDateNotIn?: ReadonlyArray<any> | null | undefined;
  estimatedProjectStartDateNotNil?: boolean | null | undefined;
  facadeConsultant?: string | null | undefined;
  facadeConsultantContains?: string | null | undefined;
  facadeConsultantContainsFold?: string | null | undefined;
  facadeConsultantEqualFold?: string | null | undefined;
  facadeConsultantGT?: string | null | undefined;
  facadeConsultantGTE?: string | null | undefined;
  facadeConsultantHasPrefix?: string | null | undefined;
  facadeConsultantHasSuffix?: string | null | undefined;
  facadeConsultantIn?: ReadonlyArray<string> | null | undefined;
  facadeConsultantIsNil?: boolean | null | undefined;
  facadeConsultantLT?: string | null | undefined;
  facadeConsultantLTE?: string | null | undefined;
  facadeConsultantNEQ?: string | null | undefined;
  facadeConsultantNotIn?: ReadonlyArray<string> | null | undefined;
  facadeConsultantNotNil?: boolean | null | undefined;
  finderID?: string | null | undefined;
  finderIDContains?: string | null | undefined;
  finderIDContainsFold?: string | null | undefined;
  finderIDEqualFold?: string | null | undefined;
  finderIDGT?: string | null | undefined;
  finderIDGTE?: string | null | undefined;
  finderIDHasPrefix?: string | null | undefined;
  finderIDHasSuffix?: string | null | undefined;
  finderIDIn?: ReadonlyArray<string> | null | undefined;
  finderIDIsNil?: boolean | null | undefined;
  finderIDLT?: string | null | undefined;
  finderIDLTE?: string | null | undefined;
  finderIDNEQ?: string | null | undefined;
  finderIDNotIn?: ReadonlyArray<string> | null | undefined;
  finderIDNotNil?: boolean | null | undefined;
  fullAddress?: string | null | undefined;
  fullAddressContains?: string | null | undefined;
  fullAddressContainsFold?: string | null | undefined;
  fullAddressEqualFold?: string | null | undefined;
  fullAddressGT?: string | null | undefined;
  fullAddressGTE?: string | null | undefined;
  fullAddressHasPrefix?: string | null | undefined;
  fullAddressHasSuffix?: string | null | undefined;
  fullAddressIn?: ReadonlyArray<string> | null | undefined;
  fullAddressIsNil?: boolean | null | undefined;
  fullAddressLT?: string | null | undefined;
  fullAddressLTE?: string | null | undefined;
  fullAddressNEQ?: string | null | undefined;
  fullAddressNotIn?: ReadonlyArray<string> | null | undefined;
  fullAddressNotNil?: boolean | null | undefined;
  hasArea?: boolean | null | undefined;
  hasAreaWith?: ReadonlyArray<AreaWhereInput> | null | undefined;
  hasCity?: boolean | null | undefined;
  hasCityWith?: ReadonlyArray<CityWhereInput> | null | undefined;
  hasCompetitor?: boolean | null | undefined;
  hasCompetitorWith?: ReadonlyArray<CompetitorWhereInput> | null | undefined;
  hasCreatedBy?: boolean | null | undefined;
  hasCreatedByWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasCustomer?: boolean | null | undefined;
  hasCustomerWith?: ReadonlyArray<CustomerWhereInput> | null | undefined;
  hasDistrict?: boolean | null | undefined;
  hasDistrictWith?: ReadonlyArray<DistrictWhereInput> | null | undefined;
  hasFinder?: boolean | null | undefined;
  hasFinderWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasFollowingSales?: boolean | null | undefined;
  hasFollowingSalesWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasProvince?: boolean | null | undefined;
  hasProvinceWith?: ReadonlyArray<ProvinceWhereInput> | null | undefined;
  hasVisitRecords?: boolean | null | undefined;
  hasVisitRecordsWith?: ReadonlyArray<VisitRecordWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  isApproved?: boolean | null | undefined;
  isApprovedNEQ?: boolean | null | undefined;
  keyProject?: boolean | null | undefined;
  keyProjectNEQ?: boolean | null | undefined;
  lastTenderAmount?: number | null | undefined;
  lastTenderAmountGT?: number | null | undefined;
  lastTenderAmountGTE?: number | null | undefined;
  lastTenderAmountIn?: ReadonlyArray<number> | null | undefined;
  lastTenderAmountIsNil?: boolean | null | undefined;
  lastTenderAmountLT?: number | null | undefined;
  lastTenderAmountLTE?: number | null | undefined;
  lastTenderAmountNEQ?: number | null | undefined;
  lastTenderAmountNotIn?: ReadonlyArray<number> | null | undefined;
  lastTenderAmountNotNil?: boolean | null | undefined;
  levelInvolved?: number | null | undefined;
  levelInvolvedGT?: number | null | undefined;
  levelInvolvedGTE?: number | null | undefined;
  levelInvolvedIn?: ReadonlyArray<number> | null | undefined;
  levelInvolvedIsNil?: boolean | null | undefined;
  levelInvolvedLT?: number | null | undefined;
  levelInvolvedLTE?: number | null | undefined;
  levelInvolvedNEQ?: number | null | undefined;
  levelInvolvedNotIn?: ReadonlyArray<number> | null | undefined;
  levelInvolvedNotNil?: boolean | null | undefined;
  managementCompany?: string | null | undefined;
  managementCompanyContains?: string | null | undefined;
  managementCompanyContainsFold?: string | null | undefined;
  managementCompanyEqualFold?: string | null | undefined;
  managementCompanyGT?: string | null | undefined;
  managementCompanyGTE?: string | null | undefined;
  managementCompanyHasPrefix?: string | null | undefined;
  managementCompanyHasSuffix?: string | null | undefined;
  managementCompanyIn?: ReadonlyArray<string> | null | undefined;
  managementCompanyIsNil?: boolean | null | undefined;
  managementCompanyLT?: string | null | undefined;
  managementCompanyLTE?: string | null | undefined;
  managementCompanyNEQ?: string | null | undefined;
  managementCompanyNotIn?: ReadonlyArray<string> | null | undefined;
  managementCompanyNotNil?: boolean | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: TenderWhereInput | null | undefined;
  or?: ReadonlyArray<TenderWhereInput> | null | undefined;
  ownerSituations?: string | null | undefined;
  ownerSituationsContains?: string | null | undefined;
  ownerSituationsContainsFold?: string | null | undefined;
  ownerSituationsEqualFold?: string | null | undefined;
  ownerSituationsGT?: string | null | undefined;
  ownerSituationsGTE?: string | null | undefined;
  ownerSituationsHasPrefix?: string | null | undefined;
  ownerSituationsHasSuffix?: string | null | undefined;
  ownerSituationsIn?: ReadonlyArray<string> | null | undefined;
  ownerSituationsIsNil?: boolean | null | undefined;
  ownerSituationsLT?: string | null | undefined;
  ownerSituationsLTE?: string | null | undefined;
  ownerSituationsNEQ?: string | null | undefined;
  ownerSituationsNotIn?: ReadonlyArray<string> | null | undefined;
  ownerSituationsNotNil?: boolean | null | undefined;
  prepareToBid?: boolean | null | undefined;
  prepareToBidNEQ?: boolean | null | undefined;
  projectCode?: string | null | undefined;
  projectCodeContains?: string | null | undefined;
  projectCodeContainsFold?: string | null | undefined;
  projectCodeEqualFold?: string | null | undefined;
  projectCodeGT?: string | null | undefined;
  projectCodeGTE?: string | null | undefined;
  projectCodeHasPrefix?: string | null | undefined;
  projectCodeHasSuffix?: string | null | undefined;
  projectCodeIn?: ReadonlyArray<string> | null | undefined;
  projectCodeIsNil?: boolean | null | undefined;
  projectCodeLT?: string | null | undefined;
  projectCodeLTE?: string | null | undefined;
  projectCodeNEQ?: string | null | undefined;
  projectCodeNotIn?: ReadonlyArray<string> | null | undefined;
  projectCodeNotNil?: boolean | null | undefined;
  projectDefinition?: string | null | undefined;
  projectDefinitionContains?: string | null | undefined;
  projectDefinitionContainsFold?: string | null | undefined;
  projectDefinitionEqualFold?: string | null | undefined;
  projectDefinitionGT?: string | null | undefined;
  projectDefinitionGTE?: string | null | undefined;
  projectDefinitionHasPrefix?: string | null | undefined;
  projectDefinitionHasSuffix?: string | null | undefined;
  projectDefinitionIn?: ReadonlyArray<string> | null | undefined;
  projectDefinitionIsNil?: boolean | null | undefined;
  projectDefinitionLT?: string | null | undefined;
  projectDefinitionLTE?: string | null | undefined;
  projectDefinitionNEQ?: string | null | undefined;
  projectDefinitionNotIn?: ReadonlyArray<string> | null | undefined;
  projectDefinitionNotNil?: boolean | null | undefined;
  projectType?: string | null | undefined;
  projectTypeContains?: string | null | undefined;
  projectTypeContainsFold?: string | null | undefined;
  projectTypeEqualFold?: string | null | undefined;
  projectTypeGT?: string | null | undefined;
  projectTypeGTE?: string | null | undefined;
  projectTypeHasPrefix?: string | null | undefined;
  projectTypeHasSuffix?: string | null | undefined;
  projectTypeIn?: ReadonlyArray<string> | null | undefined;
  projectTypeIsNil?: boolean | null | undefined;
  projectTypeLT?: string | null | undefined;
  projectTypeLTE?: string | null | undefined;
  projectTypeNEQ?: string | null | undefined;
  projectTypeNotIn?: ReadonlyArray<string> | null | undefined;
  projectTypeNotNil?: boolean | null | undefined;
  provinceID?: string | null | undefined;
  provinceIDContains?: string | null | undefined;
  provinceIDContainsFold?: string | null | undefined;
  provinceIDEqualFold?: string | null | undefined;
  provinceIDGT?: string | null | undefined;
  provinceIDGTE?: string | null | undefined;
  provinceIDHasPrefix?: string | null | undefined;
  provinceIDHasSuffix?: string | null | undefined;
  provinceIDIn?: ReadonlyArray<string> | null | undefined;
  provinceIDIsNil?: boolean | null | undefined;
  provinceIDLT?: string | null | undefined;
  provinceIDLTE?: string | null | undefined;
  provinceIDNEQ?: string | null | undefined;
  provinceIDNotIn?: ReadonlyArray<string> | null | undefined;
  provinceIDNotNil?: boolean | null | undefined;
  remark?: string | null | undefined;
  remarkContains?: string | null | undefined;
  remarkContainsFold?: string | null | undefined;
  remarkEqualFold?: string | null | undefined;
  remarkGT?: string | null | undefined;
  remarkGTE?: string | null | undefined;
  remarkHasPrefix?: string | null | undefined;
  remarkHasSuffix?: string | null | undefined;
  remarkIn?: ReadonlyArray<string> | null | undefined;
  remarkIsNil?: boolean | null | undefined;
  remarkLT?: string | null | undefined;
  remarkLTE?: string | null | undefined;
  remarkNEQ?: string | null | undefined;
  remarkNotIn?: ReadonlyArray<string> | null | undefined;
  remarkNotNil?: boolean | null | undefined;
  sizeAndValueRating?: number | null | undefined;
  sizeAndValueRatingGT?: number | null | undefined;
  sizeAndValueRatingGTE?: number | null | undefined;
  sizeAndValueRatingIn?: ReadonlyArray<number> | null | undefined;
  sizeAndValueRatingIsNil?: boolean | null | undefined;
  sizeAndValueRatingLT?: number | null | undefined;
  sizeAndValueRatingLTE?: number | null | undefined;
  sizeAndValueRatingNEQ?: number | null | undefined;
  sizeAndValueRatingNotIn?: ReadonlyArray<number> | null | undefined;
  sizeAndValueRatingNotNil?: boolean | null | undefined;
  sizeAndValueRatingOverview?: string | null | undefined;
  sizeAndValueRatingOverviewContains?: string | null | undefined;
  sizeAndValueRatingOverviewContainsFold?: string | null | undefined;
  sizeAndValueRatingOverviewEqualFold?: string | null | undefined;
  sizeAndValueRatingOverviewGT?: string | null | undefined;
  sizeAndValueRatingOverviewGTE?: string | null | undefined;
  sizeAndValueRatingOverviewHasPrefix?: string | null | undefined;
  sizeAndValueRatingOverviewHasSuffix?: string | null | undefined;
  sizeAndValueRatingOverviewIn?: ReadonlyArray<string> | null | undefined;
  sizeAndValueRatingOverviewIsNil?: boolean | null | undefined;
  sizeAndValueRatingOverviewLT?: string | null | undefined;
  sizeAndValueRatingOverviewLTE?: string | null | undefined;
  sizeAndValueRatingOverviewNEQ?: string | null | undefined;
  sizeAndValueRatingOverviewNotIn?: ReadonlyArray<string> | null | undefined;
  sizeAndValueRatingOverviewNotNil?: boolean | null | undefined;
  status?: number | null | undefined;
  statusGT?: number | null | undefined;
  statusGTE?: number | null | undefined;
  statusIn?: ReadonlyArray<number> | null | undefined;
  statusLT?: number | null | undefined;
  statusLTE?: number | null | undefined;
  statusNEQ?: number | null | undefined;
  statusNotIn?: ReadonlyArray<number> | null | undefined;
  tenderClosingDate?: any | null | undefined;
  tenderClosingDateGT?: any | null | undefined;
  tenderClosingDateGTE?: any | null | undefined;
  tenderClosingDateIn?: ReadonlyArray<any> | null | undefined;
  tenderClosingDateIsNil?: boolean | null | undefined;
  tenderClosingDateLT?: any | null | undefined;
  tenderClosingDateLTE?: any | null | undefined;
  tenderClosingDateNEQ?: any | null | undefined;
  tenderClosingDateNotIn?: ReadonlyArray<any> | null | undefined;
  tenderClosingDateNotNil?: boolean | null | undefined;
  tenderCode?: string | null | undefined;
  tenderCodeContains?: string | null | undefined;
  tenderCodeContainsFold?: string | null | undefined;
  tenderCodeEqualFold?: string | null | undefined;
  tenderCodeGT?: string | null | undefined;
  tenderCodeGTE?: string | null | undefined;
  tenderCodeHasPrefix?: string | null | undefined;
  tenderCodeHasSuffix?: string | null | undefined;
  tenderCodeIn?: ReadonlyArray<string> | null | undefined;
  tenderCodeIsNil?: boolean | null | undefined;
  tenderCodeLT?: string | null | undefined;
  tenderCodeLTE?: string | null | undefined;
  tenderCodeNEQ?: string | null | undefined;
  tenderCodeNotIn?: ReadonlyArray<string> | null | undefined;
  tenderCodeNotNil?: boolean | null | undefined;
  tenderDate?: any | null | undefined;
  tenderDateGT?: any | null | undefined;
  tenderDateGTE?: any | null | undefined;
  tenderDateIn?: ReadonlyArray<any> | null | undefined;
  tenderDateIsNil?: boolean | null | undefined;
  tenderDateLT?: any | null | undefined;
  tenderDateLTE?: any | null | undefined;
  tenderDateNEQ?: any | null | undefined;
  tenderDateNotIn?: ReadonlyArray<any> | null | undefined;
  tenderDateNotNil?: boolean | null | undefined;
  tenderForm?: string | null | undefined;
  tenderFormContains?: string | null | undefined;
  tenderFormContainsFold?: string | null | undefined;
  tenderFormEqualFold?: string | null | undefined;
  tenderFormGT?: string | null | undefined;
  tenderFormGTE?: string | null | undefined;
  tenderFormHasPrefix?: string | null | undefined;
  tenderFormHasSuffix?: string | null | undefined;
  tenderFormIn?: ReadonlyArray<string> | null | undefined;
  tenderFormIsNil?: boolean | null | undefined;
  tenderFormLT?: string | null | undefined;
  tenderFormLTE?: string | null | undefined;
  tenderFormNEQ?: string | null | undefined;
  tenderFormNotIn?: ReadonlyArray<string> | null | undefined;
  tenderFormNotNil?: boolean | null | undefined;
  tenderSituations?: string | null | undefined;
  tenderSituationsContains?: string | null | undefined;
  tenderSituationsContainsFold?: string | null | undefined;
  tenderSituationsEqualFold?: string | null | undefined;
  tenderSituationsGT?: string | null | undefined;
  tenderSituationsGTE?: string | null | undefined;
  tenderSituationsHasPrefix?: string | null | undefined;
  tenderSituationsHasSuffix?: string | null | undefined;
  tenderSituationsIn?: ReadonlyArray<string> | null | undefined;
  tenderSituationsIsNil?: boolean | null | undefined;
  tenderSituationsLT?: string | null | undefined;
  tenderSituationsLTE?: string | null | undefined;
  tenderSituationsNEQ?: string | null | undefined;
  tenderSituationsNotIn?: ReadonlyArray<string> | null | undefined;
  tenderSituationsNotNil?: boolean | null | undefined;
  tenderWinAmount?: number | null | undefined;
  tenderWinAmountGT?: number | null | undefined;
  tenderWinAmountGTE?: number | null | undefined;
  tenderWinAmountIn?: ReadonlyArray<number> | null | undefined;
  tenderWinAmountIsNil?: boolean | null | undefined;
  tenderWinAmountLT?: number | null | undefined;
  tenderWinAmountLTE?: number | null | undefined;
  tenderWinAmountNEQ?: number | null | undefined;
  tenderWinAmountNotIn?: ReadonlyArray<number> | null | undefined;
  tenderWinAmountNotNil?: boolean | null | undefined;
  tenderWinCompany?: string | null | undefined;
  tenderWinCompanyContains?: string | null | undefined;
  tenderWinCompanyContainsFold?: string | null | undefined;
  tenderWinCompanyEqualFold?: string | null | undefined;
  tenderWinCompanyGT?: string | null | undefined;
  tenderWinCompanyGTE?: string | null | undefined;
  tenderWinCompanyHasPrefix?: string | null | undefined;
  tenderWinCompanyHasSuffix?: string | null | undefined;
  tenderWinCompanyIn?: ReadonlyArray<string> | null | undefined;
  tenderWinCompanyIsNil?: boolean | null | undefined;
  tenderWinCompanyLT?: string | null | undefined;
  tenderWinCompanyLTE?: string | null | undefined;
  tenderWinCompanyNEQ?: string | null | undefined;
  tenderWinCompanyNotIn?: ReadonlyArray<string> | null | undefined;
  tenderWinCompanyNotNil?: boolean | null | undefined;
  tenderWinDate?: any | null | undefined;
  tenderWinDateGT?: any | null | undefined;
  tenderWinDateGTE?: any | null | undefined;
  tenderWinDateIn?: ReadonlyArray<any> | null | undefined;
  tenderWinDateIsNil?: boolean | null | undefined;
  tenderWinDateLT?: any | null | undefined;
  tenderWinDateLTE?: any | null | undefined;
  tenderWinDateNEQ?: any | null | undefined;
  tenderWinDateNotIn?: ReadonlyArray<any> | null | undefined;
  tenderWinDateNotNil?: boolean | null | undefined;
  tenderingAgency?: string | null | undefined;
  tenderingAgencyContains?: string | null | undefined;
  tenderingAgencyContainsFold?: string | null | undefined;
  tenderingAgencyEqualFold?: string | null | undefined;
  tenderingAgencyGT?: string | null | undefined;
  tenderingAgencyGTE?: string | null | undefined;
  tenderingAgencyHasPrefix?: string | null | undefined;
  tenderingAgencyHasSuffix?: string | null | undefined;
  tenderingAgencyIn?: ReadonlyArray<string> | null | undefined;
  tenderingAgencyIsNil?: boolean | null | undefined;
  tenderingAgencyLT?: string | null | undefined;
  tenderingAgencyLTE?: string | null | undefined;
  tenderingAgencyNEQ?: string | null | undefined;
  tenderingAgencyNotIn?: ReadonlyArray<string> | null | undefined;
  tenderingAgencyNotNil?: boolean | null | undefined;
  timeLimitRating?: number | null | undefined;
  timeLimitRatingGT?: number | null | undefined;
  timeLimitRatingGTE?: number | null | undefined;
  timeLimitRatingIn?: ReadonlyArray<number> | null | undefined;
  timeLimitRatingIsNil?: boolean | null | undefined;
  timeLimitRatingLT?: number | null | undefined;
  timeLimitRatingLTE?: number | null | undefined;
  timeLimitRatingNEQ?: number | null | undefined;
  timeLimitRatingNotIn?: ReadonlyArray<number> | null | undefined;
  timeLimitRatingNotNil?: boolean | null | undefined;
  timeLimitRatingOverview?: string | null | undefined;
  timeLimitRatingOverviewContains?: string | null | undefined;
  timeLimitRatingOverviewContainsFold?: string | null | undefined;
  timeLimitRatingOverviewEqualFold?: string | null | undefined;
  timeLimitRatingOverviewGT?: string | null | undefined;
  timeLimitRatingOverviewGTE?: string | null | undefined;
  timeLimitRatingOverviewHasPrefix?: string | null | undefined;
  timeLimitRatingOverviewHasSuffix?: string | null | undefined;
  timeLimitRatingOverviewIn?: ReadonlyArray<string> | null | undefined;
  timeLimitRatingOverviewIsNil?: boolean | null | undefined;
  timeLimitRatingOverviewLT?: string | null | undefined;
  timeLimitRatingOverviewLTE?: string | null | undefined;
  timeLimitRatingOverviewNEQ?: string | null | undefined;
  timeLimitRatingOverviewNotIn?: ReadonlyArray<string> | null | undefined;
  timeLimitRatingOverviewNotNil?: boolean | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type CompetitorWhereInput = {
  and?: ReadonlyArray<CompetitorWhereInput> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  hasWonTenders?: boolean | null | undefined;
  hasWonTendersWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: CompetitorWhereInput | null | undefined;
  or?: ReadonlyArray<CompetitorWhereInput> | null | undefined;
  shortName?: string | null | undefined;
  shortNameContains?: string | null | undefined;
  shortNameContainsFold?: string | null | undefined;
  shortNameEqualFold?: string | null | undefined;
  shortNameGT?: string | null | undefined;
  shortNameGTE?: string | null | undefined;
  shortNameHasPrefix?: string | null | undefined;
  shortNameHasSuffix?: string | null | undefined;
  shortNameIn?: ReadonlyArray<string> | null | undefined;
  shortNameLT?: string | null | undefined;
  shortNameLTE?: string | null | undefined;
  shortNameNEQ?: string | null | undefined;
  shortNameNotIn?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type UserWhereInput = {
  and?: ReadonlyArray<UserWhereInput> | null | undefined;
  avatarURL?: string | null | undefined;
  avatarURLContains?: string | null | undefined;
  avatarURLContainsFold?: string | null | undefined;
  avatarURLEqualFold?: string | null | undefined;
  avatarURLGT?: string | null | undefined;
  avatarURLGTE?: string | null | undefined;
  avatarURLHasPrefix?: string | null | undefined;
  avatarURLHasSuffix?: string | null | undefined;
  avatarURLIn?: ReadonlyArray<string> | null | undefined;
  avatarURLIsNil?: boolean | null | undefined;
  avatarURLLT?: string | null | undefined;
  avatarURLLTE?: string | null | undefined;
  avatarURLNEQ?: string | null | undefined;
  avatarURLNotIn?: ReadonlyArray<string> | null | undefined;
  avatarURLNotNil?: boolean | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  disabled?: boolean | null | undefined;
  disabledNEQ?: boolean | null | undefined;
  email?: string | null | undefined;
  emailContains?: string | null | undefined;
  emailContainsFold?: string | null | undefined;
  emailEqualFold?: string | null | undefined;
  emailGT?: string | null | undefined;
  emailGTE?: string | null | undefined;
  emailHasPrefix?: string | null | undefined;
  emailHasSuffix?: string | null | undefined;
  emailIn?: ReadonlyArray<string> | null | undefined;
  emailIsNil?: boolean | null | undefined;
  emailLT?: string | null | undefined;
  emailLTE?: string | null | undefined;
  emailNEQ?: string | null | undefined;
  emailNotIn?: ReadonlyArray<string> | null | undefined;
  emailNotNil?: boolean | null | undefined;
  hasAreas?: boolean | null | undefined;
  hasAreasWith?: ReadonlyArray<AreaWhereInput> | null | undefined;
  hasCustomers?: boolean | null | undefined;
  hasCustomersWith?: ReadonlyArray<CustomerWhereInput> | null | undefined;
  hasEditAccess?: boolean | null | undefined;
  hasEditAccessNEQ?: boolean | null | undefined;
  hasLeader?: boolean | null | undefined;
  hasLeaderWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasMapAccess?: boolean | null | undefined;
  hasMapAccessNEQ?: boolean | null | undefined;
  hasProjects?: boolean | null | undefined;
  hasProjectsWith?: ReadonlyArray<ProjectWhereInput> | null | undefined;
  hasTeamMembers?: boolean | null | undefined;
  hasTeamMembersWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasTenders?: boolean | null | undefined;
  hasTendersWith?: ReadonlyArray<TenderWhereInput> | null | undefined;
  hasVisitRecords?: boolean | null | undefined;
  hasVisitRecordsWith?: ReadonlyArray<VisitRecordWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  isAdmin?: boolean | null | undefined;
  isAdminNEQ?: boolean | null | undefined;
  isCeo?: boolean | null | undefined;
  isCeoNEQ?: boolean | null | undefined;
  isSuperAdmin?: boolean | null | undefined;
  isSuperAdminNEQ?: boolean | null | undefined;
  leaderID?: string | null | undefined;
  leaderIDContains?: string | null | undefined;
  leaderIDContainsFold?: string | null | undefined;
  leaderIDEqualFold?: string | null | undefined;
  leaderIDGT?: string | null | undefined;
  leaderIDGTE?: string | null | undefined;
  leaderIDHasPrefix?: string | null | undefined;
  leaderIDHasSuffix?: string | null | undefined;
  leaderIDIn?: ReadonlyArray<string> | null | undefined;
  leaderIDIsNil?: boolean | null | undefined;
  leaderIDLT?: string | null | undefined;
  leaderIDLTE?: string | null | undefined;
  leaderIDNEQ?: string | null | undefined;
  leaderIDNotIn?: ReadonlyArray<string> | null | undefined;
  leaderIDNotNil?: boolean | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameIsNil?: boolean | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  nameNotNil?: boolean | null | undefined;
  not?: UserWhereInput | null | undefined;
  openID?: string | null | undefined;
  openIDContains?: string | null | undefined;
  openIDContainsFold?: string | null | undefined;
  openIDEqualFold?: string | null | undefined;
  openIDGT?: string | null | undefined;
  openIDGTE?: string | null | undefined;
  openIDHasPrefix?: string | null | undefined;
  openIDHasSuffix?: string | null | undefined;
  openIDIn?: ReadonlyArray<string> | null | undefined;
  openIDLT?: string | null | undefined;
  openIDLTE?: string | null | undefined;
  openIDNEQ?: string | null | undefined;
  openIDNotIn?: ReadonlyArray<string> | null | undefined;
  or?: ReadonlyArray<UserWhereInput> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
  username?: string | null | undefined;
  usernameContains?: string | null | undefined;
  usernameContainsFold?: string | null | undefined;
  usernameEqualFold?: string | null | undefined;
  usernameGT?: string | null | undefined;
  usernameGTE?: string | null | undefined;
  usernameHasPrefix?: string | null | undefined;
  usernameHasSuffix?: string | null | undefined;
  usernameIn?: ReadonlyArray<string> | null | undefined;
  usernameIsNil?: boolean | null | undefined;
  usernameLT?: string | null | undefined;
  usernameLTE?: string | null | undefined;
  usernameNEQ?: string | null | undefined;
  usernameNotIn?: ReadonlyArray<string> | null | undefined;
  usernameNotNil?: boolean | null | undefined;
};
export type ProjectWhereInput = {
  accumulatedNonStatutoryDeductions?: number | null | undefined;
  accumulatedNonStatutoryDeductionsGT?: number | null | undefined;
  accumulatedNonStatutoryDeductionsGTE?: number | null | undefined;
  accumulatedNonStatutoryDeductionsIn?: ReadonlyArray<number> | null | undefined;
  accumulatedNonStatutoryDeductionsIsNil?: boolean | null | undefined;
  accumulatedNonStatutoryDeductionsLT?: number | null | undefined;
  accumulatedNonStatutoryDeductionsLTE?: number | null | undefined;
  accumulatedNonStatutoryDeductionsNEQ?: number | null | undefined;
  accumulatedNonStatutoryDeductionsNotIn?: ReadonlyArray<number> | null | undefined;
  accumulatedNonStatutoryDeductionsNotNil?: boolean | null | undefined;
  accumulatedNonStatutoryDeductionsPeriod?: number | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodGT?: number | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodGTE?: number | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodIn?: ReadonlyArray<number> | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodIsNil?: boolean | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodLT?: number | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodLTE?: number | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodNEQ?: number | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodNotIn?: ReadonlyArray<number> | null | undefined;
  accumulatedNonStatutoryDeductionsPeriodNotNil?: boolean | null | undefined;
  accumulatedStatutoryDeductions?: number | null | undefined;
  accumulatedStatutoryDeductionsGT?: number | null | undefined;
  accumulatedStatutoryDeductionsGTE?: number | null | undefined;
  accumulatedStatutoryDeductionsIn?: ReadonlyArray<number> | null | undefined;
  accumulatedStatutoryDeductionsIsNil?: boolean | null | undefined;
  accumulatedStatutoryDeductionsLT?: number | null | undefined;
  accumulatedStatutoryDeductionsLTE?: number | null | undefined;
  accumulatedStatutoryDeductionsNEQ?: number | null | undefined;
  accumulatedStatutoryDeductionsNotIn?: ReadonlyArray<number> | null | undefined;
  accumulatedStatutoryDeductionsNotNil?: boolean | null | undefined;
  accumulatedStatutoryDeductionsPeriod?: number | null | undefined;
  accumulatedStatutoryDeductionsPeriodGT?: number | null | undefined;
  accumulatedStatutoryDeductionsPeriodGTE?: number | null | undefined;
  accumulatedStatutoryDeductionsPeriodIn?: ReadonlyArray<number> | null | undefined;
  accumulatedStatutoryDeductionsPeriodIsNil?: boolean | null | undefined;
  accumulatedStatutoryDeductionsPeriodLT?: number | null | undefined;
  accumulatedStatutoryDeductionsPeriodLTE?: number | null | undefined;
  accumulatedStatutoryDeductionsPeriodNEQ?: number | null | undefined;
  accumulatedStatutoryDeductionsPeriodNotIn?: ReadonlyArray<number> | null | undefined;
  accumulatedStatutoryDeductionsPeriodNotNil?: boolean | null | undefined;
  aluminumBudgetPercentage?: number | null | undefined;
  aluminumBudgetPercentageGT?: number | null | undefined;
  aluminumBudgetPercentageGTE?: number | null | undefined;
  aluminumBudgetPercentageIn?: ReadonlyArray<number> | null | undefined;
  aluminumBudgetPercentageIsNil?: boolean | null | undefined;
  aluminumBudgetPercentageLT?: number | null | undefined;
  aluminumBudgetPercentageLTE?: number | null | undefined;
  aluminumBudgetPercentageNEQ?: number | null | undefined;
  aluminumBudgetPercentageNotIn?: ReadonlyArray<number> | null | undefined;
  aluminumBudgetPercentageNotNil?: boolean | null | undefined;
  aluminumPlateBudgetPercentage?: number | null | undefined;
  aluminumPlateBudgetPercentageGT?: number | null | undefined;
  aluminumPlateBudgetPercentageGTE?: number | null | undefined;
  aluminumPlateBudgetPercentageIn?: ReadonlyArray<number> | null | undefined;
  aluminumPlateBudgetPercentageIsNil?: boolean | null | undefined;
  aluminumPlateBudgetPercentageLT?: number | null | undefined;
  aluminumPlateBudgetPercentageLTE?: number | null | undefined;
  aluminumPlateBudgetPercentageNEQ?: number | null | undefined;
  aluminumPlateBudgetPercentageNotIn?: ReadonlyArray<number> | null | undefined;
  aluminumPlateBudgetPercentageNotNil?: boolean | null | undefined;
  and?: ReadonlyArray<ProjectWhereInput> | null | undefined;
  areas?: string | null | undefined;
  areasContains?: string | null | undefined;
  areasContainsFold?: string | null | undefined;
  areasEqualFold?: string | null | undefined;
  areasGT?: string | null | undefined;
  areasGTE?: string | null | undefined;
  areasHasPrefix?: string | null | undefined;
  areasHasSuffix?: string | null | undefined;
  areasIn?: ReadonlyArray<string> | null | undefined;
  areasIsNil?: boolean | null | undefined;
  areasLT?: string | null | undefined;
  areasLTE?: string | null | undefined;
  areasNEQ?: string | null | undefined;
  areasNotIn?: ReadonlyArray<string> | null | undefined;
  areasNotNil?: boolean | null | undefined;
  bulkMaterialsCompletedQuantity?: number | null | undefined;
  bulkMaterialsCompletedQuantityGT?: number | null | undefined;
  bulkMaterialsCompletedQuantityGTE?: number | null | undefined;
  bulkMaterialsCompletedQuantityIn?: ReadonlyArray<number> | null | undefined;
  bulkMaterialsCompletedQuantityIsNil?: boolean | null | undefined;
  bulkMaterialsCompletedQuantityLT?: number | null | undefined;
  bulkMaterialsCompletedQuantityLTE?: number | null | undefined;
  bulkMaterialsCompletedQuantityNEQ?: number | null | undefined;
  bulkMaterialsCompletedQuantityNotIn?: ReadonlyArray<number> | null | undefined;
  bulkMaterialsCompletedQuantityNotNil?: boolean | null | undefined;
  bulkMaterialsTotalOrderQuantity?: number | null | undefined;
  bulkMaterialsTotalOrderQuantityGT?: number | null | undefined;
  bulkMaterialsTotalOrderQuantityGTE?: number | null | undefined;
  bulkMaterialsTotalOrderQuantityIn?: ReadonlyArray<number> | null | undefined;
  bulkMaterialsTotalOrderQuantityIsNil?: boolean | null | undefined;
  bulkMaterialsTotalOrderQuantityLT?: number | null | undefined;
  bulkMaterialsTotalOrderQuantityLTE?: number | null | undefined;
  bulkMaterialsTotalOrderQuantityNEQ?: number | null | undefined;
  bulkMaterialsTotalOrderQuantityNotIn?: ReadonlyArray<number> | null | undefined;
  bulkMaterialsTotalOrderQuantityNotNil?: boolean | null | undefined;
  bulkMaterialsUncompletedQuantity?: number | null | undefined;
  bulkMaterialsUncompletedQuantityGT?: number | null | undefined;
  bulkMaterialsUncompletedQuantityGTE?: number | null | undefined;
  bulkMaterialsUncompletedQuantityIn?: ReadonlyArray<number> | null | undefined;
  bulkMaterialsUncompletedQuantityIsNil?: boolean | null | undefined;
  bulkMaterialsUncompletedQuantityLT?: number | null | undefined;
  bulkMaterialsUncompletedQuantityLTE?: number | null | undefined;
  bulkMaterialsUncompletedQuantityNEQ?: number | null | undefined;
  bulkMaterialsUncompletedQuantityNotIn?: ReadonlyArray<number> | null | undefined;
  bulkMaterialsUncompletedQuantityNotNil?: boolean | null | undefined;
  cje?: number | null | undefined;
  cjeGT?: number | null | undefined;
  cjeGTE?: number | null | undefined;
  cjeIn?: ReadonlyArray<number> | null | undefined;
  cjeIsNil?: boolean | null | undefined;
  cjeLT?: number | null | undefined;
  cjeLTE?: number | null | undefined;
  cjeNEQ?: number | null | undefined;
  cjeNotIn?: ReadonlyArray<number> | null | undefined;
  cjeNotNil?: boolean | null | undefined;
  code?: string | null | undefined;
  codeContains?: string | null | undefined;
  codeContainsFold?: string | null | undefined;
  codeEqualFold?: string | null | undefined;
  codeGT?: string | null | undefined;
  codeGTE?: string | null | undefined;
  codeHasPrefix?: string | null | undefined;
  codeHasSuffix?: string | null | undefined;
  codeIn?: ReadonlyArray<string> | null | undefined;
  codeLT?: string | null | undefined;
  codeLTE?: string | null | undefined;
  codeNEQ?: string | null | undefined;
  codeNotIn?: ReadonlyArray<string> | null | undefined;
  conType?: string | null | undefined;
  conTypeContains?: string | null | undefined;
  conTypeContainsFold?: string | null | undefined;
  conTypeEqualFold?: string | null | undefined;
  conTypeGT?: string | null | undefined;
  conTypeGTE?: string | null | undefined;
  conTypeHasPrefix?: string | null | undefined;
  conTypeHasSuffix?: string | null | undefined;
  conTypeIn?: ReadonlyArray<string> | null | undefined;
  conTypeIsNil?: boolean | null | undefined;
  conTypeLT?: string | null | undefined;
  conTypeLTE?: string | null | undefined;
  conTypeNEQ?: string | null | undefined;
  conTypeNotIn?: ReadonlyArray<string> | null | undefined;
  conTypeNotNil?: boolean | null | undefined;
  consultant?: string | null | undefined;
  consultantContains?: string | null | undefined;
  consultantContainsFold?: string | null | undefined;
  consultantEqualFold?: string | null | undefined;
  consultantGT?: string | null | undefined;
  consultantGTE?: string | null | undefined;
  consultantHasPrefix?: string | null | undefined;
  consultantHasSuffix?: string | null | undefined;
  consultantIn?: ReadonlyArray<string> | null | undefined;
  consultantIsNil?: boolean | null | undefined;
  consultantLT?: string | null | undefined;
  consultantLTE?: string | null | undefined;
  consultantNEQ?: string | null | undefined;
  consultantNotIn?: ReadonlyArray<string> | null | undefined;
  consultantNotNil?: boolean | null | undefined;
  contractorApplyAmount?: number | null | undefined;
  contractorApplyAmountGT?: number | null | undefined;
  contractorApplyAmountGTE?: number | null | undefined;
  contractorApplyAmountIn?: ReadonlyArray<number> | null | undefined;
  contractorApplyAmountIsNil?: boolean | null | undefined;
  contractorApplyAmountLT?: number | null | undefined;
  contractorApplyAmountLTE?: number | null | undefined;
  contractorApplyAmountNEQ?: number | null | undefined;
  contractorApplyAmountNotIn?: ReadonlyArray<number> | null | undefined;
  contractorApplyAmountNotNil?: boolean | null | undefined;
  contractorApplyCount?: number | null | undefined;
  contractorApplyCountGT?: number | null | undefined;
  contractorApplyCountGTE?: number | null | undefined;
  contractorApplyCountIn?: ReadonlyArray<number> | null | undefined;
  contractorApplyCountIsNil?: boolean | null | undefined;
  contractorApplyCountLT?: number | null | undefined;
  contractorApplyCountLTE?: number | null | undefined;
  contractorApplyCountNEQ?: number | null | undefined;
  contractorApplyCountNotIn?: ReadonlyArray<number> | null | undefined;
  contractorApplyCountNotNil?: boolean | null | undefined;
  contractorApproveAmount?: number | null | undefined;
  contractorApproveAmountGT?: number | null | undefined;
  contractorApproveAmountGTE?: number | null | undefined;
  contractorApproveAmountIn?: ReadonlyArray<number> | null | undefined;
  contractorApproveAmountIsNil?: boolean | null | undefined;
  contractorApproveAmountLT?: number | null | undefined;
  contractorApproveAmountLTE?: number | null | undefined;
  contractorApproveAmountNEQ?: number | null | undefined;
  contractorApproveAmountNotIn?: ReadonlyArray<number> | null | undefined;
  contractorApproveAmountNotNil?: boolean | null | undefined;
  contractorApproveCount?: number | null | undefined;
  contractorApproveCountGT?: number | null | undefined;
  contractorApproveCountGTE?: number | null | undefined;
  contractorApproveCountIn?: ReadonlyArray<number> | null | undefined;
  contractorApproveCountIsNil?: boolean | null | undefined;
  contractorApproveCountLT?: number | null | undefined;
  contractorApproveCountLTE?: number | null | undefined;
  contractorApproveCountNEQ?: number | null | undefined;
  contractorApproveCountNotIn?: ReadonlyArray<number> | null | undefined;
  contractorApproveCountNotNil?: boolean | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  designRatedWeight?: number | null | undefined;
  designRatedWeightGT?: number | null | undefined;
  designRatedWeightGTE?: number | null | undefined;
  designRatedWeightIn?: ReadonlyArray<number> | null | undefined;
  designRatedWeightIsNil?: boolean | null | undefined;
  designRatedWeightLT?: number | null | undefined;
  designRatedWeightLTE?: number | null | undefined;
  designRatedWeightNEQ?: number | null | undefined;
  designRatedWeightNotIn?: ReadonlyArray<number> | null | undefined;
  designRatedWeightNotNil?: boolean | null | undefined;
  diagramBdFinishCount?: number | null | undefined;
  diagramBdFinishCountGT?: number | null | undefined;
  diagramBdFinishCountGTE?: number | null | undefined;
  diagramBdFinishCountIn?: ReadonlyArray<number> | null | undefined;
  diagramBdFinishCountIsNil?: boolean | null | undefined;
  diagramBdFinishCountLT?: number | null | undefined;
  diagramBdFinishCountLTE?: number | null | undefined;
  diagramBdFinishCountNEQ?: number | null | undefined;
  diagramBdFinishCountNotIn?: ReadonlyArray<number> | null | undefined;
  diagramBdFinishCountNotNil?: boolean | null | undefined;
  diagramBdTotalCount?: number | null | undefined;
  diagramBdTotalCountGT?: number | null | undefined;
  diagramBdTotalCountGTE?: number | null | undefined;
  diagramBdTotalCountIn?: ReadonlyArray<number> | null | undefined;
  diagramBdTotalCountIsNil?: boolean | null | undefined;
  diagramBdTotalCountLT?: number | null | undefined;
  diagramBdTotalCountLTE?: number | null | undefined;
  diagramBdTotalCountNEQ?: number | null | undefined;
  diagramBdTotalCountNotIn?: ReadonlyArray<number> | null | undefined;
  diagramBdTotalCountNotNil?: boolean | null | undefined;
  diagramCApprovalRatioDenominator?: number | null | undefined;
  diagramCApprovalRatioDenominatorGT?: number | null | undefined;
  diagramCApprovalRatioDenominatorGTE?: number | null | undefined;
  diagramCApprovalRatioDenominatorIn?: ReadonlyArray<number> | null | undefined;
  diagramCApprovalRatioDenominatorIsNil?: boolean | null | undefined;
  diagramCApprovalRatioDenominatorLT?: number | null | undefined;
  diagramCApprovalRatioDenominatorLTE?: number | null | undefined;
  diagramCApprovalRatioDenominatorNEQ?: number | null | undefined;
  diagramCApprovalRatioDenominatorNotIn?: ReadonlyArray<number> | null | undefined;
  diagramCApprovalRatioDenominatorNotNil?: boolean | null | undefined;
  diagramCApprovalRatioNumerator?: number | null | undefined;
  diagramCApprovalRatioNumeratorGT?: number | null | undefined;
  diagramCApprovalRatioNumeratorGTE?: number | null | undefined;
  diagramCApprovalRatioNumeratorIn?: ReadonlyArray<number> | null | undefined;
  diagramCApprovalRatioNumeratorIsNil?: boolean | null | undefined;
  diagramCApprovalRatioNumeratorLT?: number | null | undefined;
  diagramCApprovalRatioNumeratorLTE?: number | null | undefined;
  diagramCApprovalRatioNumeratorNEQ?: number | null | undefined;
  diagramCApprovalRatioNumeratorNotIn?: ReadonlyArray<number> | null | undefined;
  diagramCApprovalRatioNumeratorNotNil?: boolean | null | undefined;
  diagramConstructionFinishCount?: number | null | undefined;
  diagramConstructionFinishCountGT?: number | null | undefined;
  diagramConstructionFinishCountGTE?: number | null | undefined;
  diagramConstructionFinishCountIn?: ReadonlyArray<number> | null | undefined;
  diagramConstructionFinishCountIsNil?: boolean | null | undefined;
  diagramConstructionFinishCountLT?: number | null | undefined;
  diagramConstructionFinishCountLTE?: number | null | undefined;
  diagramConstructionFinishCountNEQ?: number | null | undefined;
  diagramConstructionFinishCountNotIn?: ReadonlyArray<number> | null | undefined;
  diagramConstructionFinishCountNotNil?: boolean | null | undefined;
  diagramConstructionTotalCount?: number | null | undefined;
  diagramConstructionTotalCountGT?: number | null | undefined;
  diagramConstructionTotalCountGTE?: number | null | undefined;
  diagramConstructionTotalCountIn?: ReadonlyArray<number> | null | undefined;
  diagramConstructionTotalCountIsNil?: boolean | null | undefined;
  diagramConstructionTotalCountLT?: number | null | undefined;
  diagramConstructionTotalCountLTE?: number | null | undefined;
  diagramConstructionTotalCountNEQ?: number | null | undefined;
  diagramConstructionTotalCountNotIn?: ReadonlyArray<number> | null | undefined;
  diagramConstructionTotalCountNotNil?: boolean | null | undefined;
  diagramProcessingFinishCount?: number | null | undefined;
  diagramProcessingFinishCountGT?: number | null | undefined;
  diagramProcessingFinishCountGTE?: number | null | undefined;
  diagramProcessingFinishCountIn?: ReadonlyArray<number> | null | undefined;
  diagramProcessingFinishCountIsNil?: boolean | null | undefined;
  diagramProcessingFinishCountLT?: number | null | undefined;
  diagramProcessingFinishCountLTE?: number | null | undefined;
  diagramProcessingFinishCountNEQ?: number | null | undefined;
  diagramProcessingFinishCountNotIn?: ReadonlyArray<number> | null | undefined;
  diagramProcessingFinishCountNotNil?: boolean | null | undefined;
  diagramProcessingTotalCount?: number | null | undefined;
  diagramProcessingTotalCountGT?: number | null | undefined;
  diagramProcessingTotalCountGTE?: number | null | undefined;
  diagramProcessingTotalCountIn?: ReadonlyArray<number> | null | undefined;
  diagramProcessingTotalCountIsNil?: boolean | null | undefined;
  diagramProcessingTotalCountLT?: number | null | undefined;
  diagramProcessingTotalCountLTE?: number | null | undefined;
  diagramProcessingTotalCountNEQ?: number | null | undefined;
  diagramProcessingTotalCountNotIn?: ReadonlyArray<number> | null | undefined;
  diagramProcessingTotalCountNotNil?: boolean | null | undefined;
  effectiveContractAmount?: number | null | undefined;
  effectiveContractAmountGT?: number | null | undefined;
  effectiveContractAmountGTE?: number | null | undefined;
  effectiveContractAmountIn?: ReadonlyArray<number> | null | undefined;
  effectiveContractAmountIsNil?: boolean | null | undefined;
  effectiveContractAmountLT?: number | null | undefined;
  effectiveContractAmountLTE?: number | null | undefined;
  effectiveContractAmountNEQ?: number | null | undefined;
  effectiveContractAmountNotIn?: ReadonlyArray<number> | null | undefined;
  effectiveContractAmountNotNil?: boolean | null | undefined;
  endDate?: any | null | undefined;
  endDateGT?: any | null | undefined;
  endDateGTE?: any | null | undefined;
  endDateIn?: ReadonlyArray<any> | null | undefined;
  endDateIsNil?: boolean | null | undefined;
  endDateLT?: any | null | undefined;
  endDateLTE?: any | null | undefined;
  endDateNEQ?: any | null | undefined;
  endDateNotIn?: ReadonlyArray<any> | null | undefined;
  endDateNotNil?: boolean | null | undefined;
  fsDate?: any | null | undefined;
  fsDateGT?: any | null | undefined;
  fsDateGTE?: any | null | undefined;
  fsDateIn?: ReadonlyArray<any> | null | undefined;
  fsDateIsNil?: boolean | null | undefined;
  fsDateLT?: any | null | undefined;
  fsDateLTE?: any | null | undefined;
  fsDateNEQ?: any | null | undefined;
  fsDateNotIn?: ReadonlyArray<any> | null | undefined;
  fsDateNotNil?: boolean | null | undefined;
  glassBudgetPercentage?: number | null | undefined;
  glassBudgetPercentageGT?: number | null | undefined;
  glassBudgetPercentageGTE?: number | null | undefined;
  glassBudgetPercentageIn?: ReadonlyArray<number> | null | undefined;
  glassBudgetPercentageIsNil?: boolean | null | undefined;
  glassBudgetPercentageLT?: number | null | undefined;
  glassBudgetPercentageLTE?: number | null | undefined;
  glassBudgetPercentageNEQ?: number | null | undefined;
  glassBudgetPercentageNotIn?: ReadonlyArray<number> | null | undefined;
  glassBudgetPercentageNotNil?: boolean | null | undefined;
  hasProjectStaffs?: boolean | null | undefined;
  hasProjectStaffsWith?: ReadonlyArray<ProjectStaffWhereInput> | null | undefined;
  hasUsers?: boolean | null | undefined;
  hasUsersWith?: ReadonlyArray<UserWhereInput> | null | undefined;
  hasVos?: boolean | null | undefined;
  hasVosWith?: ReadonlyArray<ProjectVOWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  installProgress?: number | null | undefined;
  installProgressGT?: number | null | undefined;
  installProgressGTE?: number | null | undefined;
  installProgressIn?: ReadonlyArray<number> | null | undefined;
  installProgressIsNil?: boolean | null | undefined;
  installProgressLT?: number | null | undefined;
  installProgressLTE?: number | null | undefined;
  installProgressNEQ?: number | null | undefined;
  installProgressNotIn?: ReadonlyArray<number> | null | undefined;
  installProgressNotNil?: boolean | null | undefined;
  ironBudgetPercentage?: number | null | undefined;
  ironBudgetPercentageGT?: number | null | undefined;
  ironBudgetPercentageGTE?: number | null | undefined;
  ironBudgetPercentageIn?: ReadonlyArray<number> | null | undefined;
  ironBudgetPercentageIsNil?: boolean | null | undefined;
  ironBudgetPercentageLT?: number | null | undefined;
  ironBudgetPercentageLTE?: number | null | undefined;
  ironBudgetPercentageNEQ?: number | null | undefined;
  ironBudgetPercentageNotIn?: ReadonlyArray<number> | null | undefined;
  ironBudgetPercentageNotNil?: boolean | null | undefined;
  isFinished?: boolean | null | undefined;
  isFinishedNEQ?: boolean | null | undefined;
  itemStockWeight?: number | null | undefined;
  itemStockWeightGT?: number | null | undefined;
  itemStockWeightGTE?: number | null | undefined;
  itemStockWeightIn?: ReadonlyArray<number> | null | undefined;
  itemStockWeightIsNil?: boolean | null | undefined;
  itemStockWeightLT?: number | null | undefined;
  itemStockWeightLTE?: number | null | undefined;
  itemStockWeightNEQ?: number | null | undefined;
  itemStockWeightNotIn?: ReadonlyArray<number> | null | undefined;
  itemStockWeightNotNil?: boolean | null | undefined;
  jzs?: string | null | undefined;
  jzsContains?: string | null | undefined;
  jzsContainsFold?: string | null | undefined;
  jzsEqualFold?: string | null | undefined;
  jzsGT?: string | null | undefined;
  jzsGTE?: string | null | undefined;
  jzsHasPrefix?: string | null | undefined;
  jzsHasSuffix?: string | null | undefined;
  jzsIn?: ReadonlyArray<string> | null | undefined;
  jzsIsNil?: boolean | null | undefined;
  jzsLT?: string | null | undefined;
  jzsLTE?: string | null | undefined;
  jzsNEQ?: string | null | undefined;
  jzsNotIn?: ReadonlyArray<string> | null | undefined;
  jzsNotNil?: boolean | null | undefined;
  manager?: string | null | undefined;
  managerContains?: string | null | undefined;
  managerContainsFold?: string | null | undefined;
  managerEqualFold?: string | null | undefined;
  managerGT?: string | null | undefined;
  managerGTE?: string | null | undefined;
  managerHasPrefix?: string | null | undefined;
  managerHasSuffix?: string | null | undefined;
  managerIn?: ReadonlyArray<string> | null | undefined;
  managerIsNil?: boolean | null | undefined;
  managerLT?: string | null | undefined;
  managerLTE?: string | null | undefined;
  managerNEQ?: string | null | undefined;
  managerNotIn?: ReadonlyArray<string> | null | undefined;
  managerNotNil?: boolean | null | undefined;
  materialLoss?: number | null | undefined;
  materialLossGT?: number | null | undefined;
  materialLossGTE?: number | null | undefined;
  materialLossIn?: ReadonlyArray<number> | null | undefined;
  materialLossIsNil?: boolean | null | undefined;
  materialLossLT?: number | null | undefined;
  materialLossLTE?: number | null | undefined;
  materialLossNEQ?: number | null | undefined;
  materialLossNotIn?: ReadonlyArray<number> | null | undefined;
  materialLossNotNil?: boolean | null | undefined;
  mcn?: string | null | undefined;
  mcnContains?: string | null | undefined;
  mcnContainsFold?: string | null | undefined;
  mcnEqualFold?: string | null | undefined;
  mcnGT?: string | null | undefined;
  mcnGTE?: string | null | undefined;
  mcnHasPrefix?: string | null | undefined;
  mcnHasSuffix?: string | null | undefined;
  mcnIn?: ReadonlyArray<string> | null | undefined;
  mcnIsNil?: boolean | null | undefined;
  mcnLT?: string | null | undefined;
  mcnLTE?: string | null | undefined;
  mcnNEQ?: string | null | undefined;
  mcnNotIn?: ReadonlyArray<string> | null | undefined;
  mcnNotNil?: boolean | null | undefined;
  milestoneDoneMonth?: number | null | undefined;
  milestoneDoneMonthGT?: number | null | undefined;
  milestoneDoneMonthGTE?: number | null | undefined;
  milestoneDoneMonthIn?: ReadonlyArray<number> | null | undefined;
  milestoneDoneMonthIsNil?: boolean | null | undefined;
  milestoneDoneMonthLT?: number | null | undefined;
  milestoneDoneMonthLTE?: number | null | undefined;
  milestoneDoneMonthNEQ?: number | null | undefined;
  milestoneDoneMonthNotIn?: ReadonlyArray<number> | null | undefined;
  milestoneDoneMonthNotNil?: boolean | null | undefined;
  milestoneDoneYear?: number | null | undefined;
  milestoneDoneYearGT?: number | null | undefined;
  milestoneDoneYearGTE?: number | null | undefined;
  milestoneDoneYearIn?: ReadonlyArray<number> | null | undefined;
  milestoneDoneYearIsNil?: boolean | null | undefined;
  milestoneDoneYearLT?: number | null | undefined;
  milestoneDoneYearLTE?: number | null | undefined;
  milestoneDoneYearNEQ?: number | null | undefined;
  milestoneDoneYearNotIn?: ReadonlyArray<number> | null | undefined;
  milestoneDoneYearNotNil?: boolean | null | undefined;
  milestonePlanMonth?: number | null | undefined;
  milestonePlanMonthGT?: number | null | undefined;
  milestonePlanMonthGTE?: number | null | undefined;
  milestonePlanMonthIn?: ReadonlyArray<number> | null | undefined;
  milestonePlanMonthIsNil?: boolean | null | undefined;
  milestonePlanMonthLT?: number | null | undefined;
  milestonePlanMonthLTE?: number | null | undefined;
  milestonePlanMonthNEQ?: number | null | undefined;
  milestonePlanMonthNotIn?: ReadonlyArray<number> | null | undefined;
  milestonePlanMonthNotNil?: boolean | null | undefined;
  milestonePlanYear?: number | null | undefined;
  milestonePlanYearGT?: number | null | undefined;
  milestonePlanYearGTE?: number | null | undefined;
  milestonePlanYearIn?: ReadonlyArray<number> | null | undefined;
  milestonePlanYearIsNil?: boolean | null | undefined;
  milestonePlanYearLT?: number | null | undefined;
  milestonePlanYearLTE?: number | null | undefined;
  milestonePlanYearNEQ?: number | null | undefined;
  milestonePlanYearNotIn?: ReadonlyArray<number> | null | undefined;
  milestonePlanYearNotNil?: boolean | null | undefined;
  mntyr?: string | null | undefined;
  mntyrContains?: string | null | undefined;
  mntyrContainsFold?: string | null | undefined;
  mntyrEqualFold?: string | null | undefined;
  mntyrGT?: string | null | undefined;
  mntyrGTE?: string | null | undefined;
  mntyrHasPrefix?: string | null | undefined;
  mntyrHasSuffix?: string | null | undefined;
  mntyrIn?: ReadonlyArray<string> | null | undefined;
  mntyrIsNil?: boolean | null | undefined;
  mntyrLT?: string | null | undefined;
  mntyrLTE?: string | null | undefined;
  mntyrNEQ?: string | null | undefined;
  mntyrNotIn?: ReadonlyArray<string> | null | undefined;
  mntyrNotNil?: boolean | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameIsNil?: boolean | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  nameNotNil?: boolean | null | undefined;
  not?: ProjectWhereInput | null | undefined;
  opDate?: any | null | undefined;
  opDateGT?: any | null | undefined;
  opDateGTE?: any | null | undefined;
  opDateIn?: ReadonlyArray<any> | null | undefined;
  opDateIsNil?: boolean | null | undefined;
  opDateLT?: any | null | undefined;
  opDateLTE?: any | null | undefined;
  opDateNEQ?: any | null | undefined;
  opDateNotIn?: ReadonlyArray<any> | null | undefined;
  opDateNotNil?: boolean | null | undefined;
  or?: ReadonlyArray<ProjectWhereInput> | null | undefined;
  owner?: string | null | undefined;
  ownerApplyAmount?: number | null | undefined;
  ownerApplyAmountGT?: number | null | undefined;
  ownerApplyAmountGTE?: number | null | undefined;
  ownerApplyAmountIn?: ReadonlyArray<number> | null | undefined;
  ownerApplyAmountIsNil?: boolean | null | undefined;
  ownerApplyAmountLT?: number | null | undefined;
  ownerApplyAmountLTE?: number | null | undefined;
  ownerApplyAmountNEQ?: number | null | undefined;
  ownerApplyAmountNotIn?: ReadonlyArray<number> | null | undefined;
  ownerApplyAmountNotNil?: boolean | null | undefined;
  ownerApplyCount?: number | null | undefined;
  ownerApplyCountGT?: number | null | undefined;
  ownerApplyCountGTE?: number | null | undefined;
  ownerApplyCountIn?: ReadonlyArray<number> | null | undefined;
  ownerApplyCountIsNil?: boolean | null | undefined;
  ownerApplyCountLT?: number | null | undefined;
  ownerApplyCountLTE?: number | null | undefined;
  ownerApplyCountNEQ?: number | null | undefined;
  ownerApplyCountNotIn?: ReadonlyArray<number> | null | undefined;
  ownerApplyCountNotNil?: boolean | null | undefined;
  ownerApproveAmount?: number | null | undefined;
  ownerApproveAmountGT?: number | null | undefined;
  ownerApproveAmountGTE?: number | null | undefined;
  ownerApproveAmountIn?: ReadonlyArray<number> | null | undefined;
  ownerApproveAmountIsNil?: boolean | null | undefined;
  ownerApproveAmountLT?: number | null | undefined;
  ownerApproveAmountLTE?: number | null | undefined;
  ownerApproveAmountNEQ?: number | null | undefined;
  ownerApproveAmountNotIn?: ReadonlyArray<number> | null | undefined;
  ownerApproveAmountNotNil?: boolean | null | undefined;
  ownerApproveCount?: number | null | undefined;
  ownerApproveCountGT?: number | null | undefined;
  ownerApproveCountGTE?: number | null | undefined;
  ownerApproveCountIn?: ReadonlyArray<number> | null | undefined;
  ownerApproveCountIsNil?: boolean | null | undefined;
  ownerApproveCountLT?: number | null | undefined;
  ownerApproveCountLTE?: number | null | undefined;
  ownerApproveCountNEQ?: number | null | undefined;
  ownerApproveCountNotIn?: ReadonlyArray<number> | null | undefined;
  ownerApproveCountNotNil?: boolean | null | undefined;
  ownerContains?: string | null | undefined;
  ownerContainsFold?: string | null | undefined;
  ownerEqualFold?: string | null | undefined;
  ownerGT?: string | null | undefined;
  ownerGTE?: string | null | undefined;
  ownerHasPrefix?: string | null | undefined;
  ownerHasSuffix?: string | null | undefined;
  ownerIn?: ReadonlyArray<string> | null | undefined;
  ownerIsNil?: boolean | null | undefined;
  ownerLT?: string | null | undefined;
  ownerLTE?: string | null | undefined;
  ownerNEQ?: string | null | undefined;
  ownerNotIn?: ReadonlyArray<string> | null | undefined;
  ownerNotNil?: boolean | null | undefined;
  palletsInStock?: number | null | undefined;
  palletsInStockGT?: number | null | undefined;
  palletsInStockGTE?: number | null | undefined;
  palletsInStockIn?: ReadonlyArray<number> | null | undefined;
  palletsInStockIsNil?: boolean | null | undefined;
  palletsInStockLT?: number | null | undefined;
  palletsInStockLTE?: number | null | undefined;
  palletsInStockNEQ?: number | null | undefined;
  palletsInStockNotIn?: ReadonlyArray<number> | null | undefined;
  palletsInStockNotNil?: boolean | null | undefined;
  partsInStock?: number | null | undefined;
  partsInStockGT?: number | null | undefined;
  partsInStockGTE?: number | null | undefined;
  partsInStockIn?: ReadonlyArray<number> | null | undefined;
  partsInStockIsNil?: boolean | null | undefined;
  partsInStockLT?: number | null | undefined;
  partsInStockLTE?: number | null | undefined;
  partsInStockNEQ?: number | null | undefined;
  partsInStockNotIn?: ReadonlyArray<number> | null | undefined;
  partsInStockNotNil?: boolean | null | undefined;
  planOverdueCount?: number | null | undefined;
  planOverdueCountGT?: number | null | undefined;
  planOverdueCountGTE?: number | null | undefined;
  planOverdueCountIn?: ReadonlyArray<number> | null | undefined;
  planOverdueCountIsNil?: boolean | null | undefined;
  planOverdueCountLT?: number | null | undefined;
  planOverdueCountLTE?: number | null | undefined;
  planOverdueCountNEQ?: number | null | undefined;
  planOverdueCountNotIn?: ReadonlyArray<number> | null | undefined;
  planOverdueCountNotNil?: boolean | null | undefined;
  planOverdueMonthCount?: number | null | undefined;
  planOverdueMonthCountGT?: number | null | undefined;
  planOverdueMonthCountGTE?: number | null | undefined;
  planOverdueMonthCountIn?: ReadonlyArray<number> | null | undefined;
  planOverdueMonthCountIsNil?: boolean | null | undefined;
  planOverdueMonthCountLT?: number | null | undefined;
  planOverdueMonthCountLTE?: number | null | undefined;
  planOverdueMonthCountNEQ?: number | null | undefined;
  planOverdueMonthCountNotIn?: ReadonlyArray<number> | null | undefined;
  planOverdueMonthCountNotNil?: boolean | null | undefined;
  planTotalCount?: number | null | undefined;
  planTotalCountGT?: number | null | undefined;
  planTotalCountGTE?: number | null | undefined;
  planTotalCountIn?: ReadonlyArray<number> | null | undefined;
  planTotalCountIsNil?: boolean | null | undefined;
  planTotalCountLT?: number | null | undefined;
  planTotalCountLTE?: number | null | undefined;
  planTotalCountNEQ?: number | null | undefined;
  planTotalCountNotIn?: ReadonlyArray<number> | null | undefined;
  planTotalCountNotNil?: boolean | null | undefined;
  pmArea?: number | null | undefined;
  pmAreaGT?: number | null | undefined;
  pmAreaGTE?: number | null | undefined;
  pmAreaIn?: ReadonlyArray<number> | null | undefined;
  pmAreaIsNil?: boolean | null | undefined;
  pmAreaLT?: number | null | undefined;
  pmAreaLTE?: number | null | undefined;
  pmAreaNEQ?: number | null | undefined;
  pmAreaNotIn?: ReadonlyArray<number> | null | undefined;
  pmAreaNotNil?: boolean | null | undefined;
  pmMonthActual?: number | null | undefined;
  pmMonthActualGT?: number | null | undefined;
  pmMonthActualGTE?: number | null | undefined;
  pmMonthActualIn?: ReadonlyArray<number> | null | undefined;
  pmMonthActualIsNil?: boolean | null | undefined;
  pmMonthActualLT?: number | null | undefined;
  pmMonthActualLTE?: number | null | undefined;
  pmMonthActualNEQ?: number | null | undefined;
  pmMonthActualNotIn?: ReadonlyArray<number> | null | undefined;
  pmMonthActualNotNil?: boolean | null | undefined;
  pmMonthTarget?: number | null | undefined;
  pmMonthTargetGT?: number | null | undefined;
  pmMonthTargetGTE?: number | null | undefined;
  pmMonthTargetIn?: ReadonlyArray<number> | null | undefined;
  pmMonthTargetIsNil?: boolean | null | undefined;
  pmMonthTargetLT?: number | null | undefined;
  pmMonthTargetLTE?: number | null | undefined;
  pmMonthTargetNEQ?: number | null | undefined;
  pmMonthTargetNotIn?: ReadonlyArray<number> | null | undefined;
  pmMonthTargetNotNil?: boolean | null | undefined;
  pmTotal?: number | null | undefined;
  pmTotalGT?: number | null | undefined;
  pmTotalGTE?: number | null | undefined;
  pmTotalIn?: ReadonlyArray<number> | null | undefined;
  pmTotalIsNil?: boolean | null | undefined;
  pmTotalLT?: number | null | undefined;
  pmTotalLTE?: number | null | undefined;
  pmTotalNEQ?: number | null | undefined;
  pmTotalNotIn?: ReadonlyArray<number> | null | undefined;
  pmTotalNotNil?: boolean | null | undefined;
  pmYearActual?: number | null | undefined;
  pmYearActualGT?: number | null | undefined;
  pmYearActualGTE?: number | null | undefined;
  pmYearActualIn?: ReadonlyArray<number> | null | undefined;
  pmYearActualIsNil?: boolean | null | undefined;
  pmYearActualLT?: number | null | undefined;
  pmYearActualLTE?: number | null | undefined;
  pmYearActualNEQ?: number | null | undefined;
  pmYearActualNotIn?: ReadonlyArray<number> | null | undefined;
  pmYearActualNotNil?: boolean | null | undefined;
  pmYearTarget?: number | null | undefined;
  pmYearTargetGT?: number | null | undefined;
  pmYearTargetGTE?: number | null | undefined;
  pmYearTargetIn?: ReadonlyArray<number> | null | undefined;
  pmYearTargetIsNil?: boolean | null | undefined;
  pmYearTargetLT?: number | null | undefined;
  pmYearTargetLTE?: number | null | undefined;
  pmYearTargetNEQ?: number | null | undefined;
  pmYearTargetNotIn?: ReadonlyArray<number> | null | undefined;
  pmYearTargetNotNil?: boolean | null | undefined;
  pmYesterday?: number | null | undefined;
  pmYesterdayGT?: number | null | undefined;
  pmYesterdayGTE?: number | null | undefined;
  pmYesterdayIn?: ReadonlyArray<number> | null | undefined;
  pmYesterdayIsNil?: boolean | null | undefined;
  pmYesterdayLT?: number | null | undefined;
  pmYesterdayLTE?: number | null | undefined;
  pmYesterdayNEQ?: number | null | undefined;
  pmYesterdayNotIn?: ReadonlyArray<number> | null | undefined;
  pmYesterdayNotNil?: boolean | null | undefined;
  processingWeight?: number | null | undefined;
  processingWeightGT?: number | null | undefined;
  processingWeightGTE?: number | null | undefined;
  processingWeightIn?: ReadonlyArray<number> | null | undefined;
  processingWeightIsNil?: boolean | null | undefined;
  processingWeightLT?: number | null | undefined;
  processingWeightLTE?: number | null | undefined;
  processingWeightNEQ?: number | null | undefined;
  processingWeightNotIn?: ReadonlyArray<number> | null | undefined;
  processingWeightNotNil?: boolean | null | undefined;
  qualityRanking?: number | null | undefined;
  qualityRankingGT?: number | null | undefined;
  qualityRankingGTE?: number | null | undefined;
  qualityRankingIn?: ReadonlyArray<number> | null | undefined;
  qualityRankingIsNil?: boolean | null | undefined;
  qualityRankingLT?: number | null | undefined;
  qualityRankingLTE?: number | null | undefined;
  qualityRankingNEQ?: number | null | undefined;
  qualityRankingNotIn?: ReadonlyArray<number> | null | undefined;
  qualityRankingNotNil?: boolean | null | undefined;
  qualityScore?: number | null | undefined;
  qualityScoreGT?: number | null | undefined;
  qualityScoreGTE?: number | null | undefined;
  qualityScoreIn?: ReadonlyArray<number> | null | undefined;
  qualityScoreIsNil?: boolean | null | undefined;
  qualityScoreLT?: number | null | undefined;
  qualityScoreLTE?: number | null | undefined;
  qualityScoreNEQ?: number | null | undefined;
  qualityScoreNotIn?: ReadonlyArray<number> | null | undefined;
  qualityScoreNotNil?: boolean | null | undefined;
  startDate?: any | null | undefined;
  startDateGT?: any | null | undefined;
  startDateGTE?: any | null | undefined;
  startDateIn?: ReadonlyArray<any> | null | undefined;
  startDateIsNil?: boolean | null | undefined;
  startDateLT?: any | null | undefined;
  startDateLTE?: any | null | undefined;
  startDateNEQ?: any | null | undefined;
  startDateNotIn?: ReadonlyArray<any> | null | undefined;
  startDateNotNil?: boolean | null | undefined;
  totalContractAmount?: number | null | undefined;
  totalContractAmountGT?: number | null | undefined;
  totalContractAmountGTE?: number | null | undefined;
  totalContractAmountIn?: ReadonlyArray<number> | null | undefined;
  totalContractAmountIsNil?: boolean | null | undefined;
  totalContractAmountLT?: number | null | undefined;
  totalContractAmountLTE?: number | null | undefined;
  totalContractAmountNEQ?: number | null | undefined;
  totalContractAmountNotIn?: ReadonlyArray<number> | null | undefined;
  totalContractAmountNotNil?: boolean | null | undefined;
  unitComponentInstallation?: number | null | undefined;
  unitComponentInstallationGT?: number | null | undefined;
  unitComponentInstallationGTE?: number | null | undefined;
  unitComponentInstallationIn?: ReadonlyArray<number> | null | undefined;
  unitComponentInstallationIsNil?: boolean | null | undefined;
  unitComponentInstallationLT?: number | null | undefined;
  unitComponentInstallationLTE?: number | null | undefined;
  unitComponentInstallationNEQ?: number | null | undefined;
  unitComponentInstallationNotIn?: ReadonlyArray<number> | null | undefined;
  unitComponentInstallationNotNil?: boolean | null | undefined;
  unitComponentProduction?: number | null | undefined;
  unitComponentProductionGT?: number | null | undefined;
  unitComponentProductionGTE?: number | null | undefined;
  unitComponentProductionIn?: ReadonlyArray<number> | null | undefined;
  unitComponentProductionIsNil?: boolean | null | undefined;
  unitComponentProductionLT?: number | null | undefined;
  unitComponentProductionLTE?: number | null | undefined;
  unitComponentProductionNEQ?: number | null | undefined;
  unitComponentProductionNotIn?: ReadonlyArray<number> | null | undefined;
  unitComponentProductionNotNil?: boolean | null | undefined;
  unitComponentTotal?: number | null | undefined;
  unitComponentTotalGT?: number | null | undefined;
  unitComponentTotalGTE?: number | null | undefined;
  unitComponentTotalIn?: ReadonlyArray<number> | null | undefined;
  unitComponentTotalIsNil?: boolean | null | undefined;
  unitComponentTotalLT?: number | null | undefined;
  unitComponentTotalLTE?: number | null | undefined;
  unitComponentTotalNEQ?: number | null | undefined;
  unitComponentTotalNotIn?: ReadonlyArray<number> | null | undefined;
  unitComponentTotalNotNil?: boolean | null | undefined;
  unitInventoryTotal?: number | null | undefined;
  unitInventoryTotalGT?: number | null | undefined;
  unitInventoryTotalGTE?: number | null | undefined;
  unitInventoryTotalIn?: ReadonlyArray<number> | null | undefined;
  unitInventoryTotalIsNil?: boolean | null | undefined;
  unitInventoryTotalLT?: number | null | undefined;
  unitInventoryTotalLTE?: number | null | undefined;
  unitInventoryTotalNEQ?: number | null | undefined;
  unitInventoryTotalNotIn?: ReadonlyArray<number> | null | undefined;
  unitInventoryTotalNotNil?: boolean | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
  vaApplyAmount?: number | null | undefined;
  vaApplyAmountGT?: number | null | undefined;
  vaApplyAmountGTE?: number | null | undefined;
  vaApplyAmountIn?: ReadonlyArray<number> | null | undefined;
  vaApplyAmountIsNil?: boolean | null | undefined;
  vaApplyAmountLT?: number | null | undefined;
  vaApplyAmountLTE?: number | null | undefined;
  vaApplyAmountNEQ?: number | null | undefined;
  vaApplyAmountNotIn?: ReadonlyArray<number> | null | undefined;
  vaApplyAmountNotNil?: boolean | null | undefined;
  vaApproveAmount?: number | null | undefined;
  vaApproveAmountGT?: number | null | undefined;
  vaApproveAmountGTE?: number | null | undefined;
  vaApproveAmountIn?: ReadonlyArray<number> | null | undefined;
  vaApproveAmountIsNil?: boolean | null | undefined;
  vaApproveAmountLT?: number | null | undefined;
  vaApproveAmountLTE?: number | null | undefined;
  vaApproveAmountNEQ?: number | null | undefined;
  vaApproveAmountNotIn?: ReadonlyArray<number> | null | undefined;
  vaApproveAmountNotNil?: boolean | null | undefined;
  xjl?: number | null | undefined;
  xjlGT?: number | null | undefined;
  xjlGTE?: number | null | undefined;
  xjlIn?: ReadonlyArray<number> | null | undefined;
  xjlIsNil?: boolean | null | undefined;
  xjlLT?: number | null | undefined;
  xjlLTE?: number | null | undefined;
  xjlNEQ?: number | null | undefined;
  xjlNotIn?: ReadonlyArray<number> | null | undefined;
  xjlNotNil?: boolean | null | undefined;
  xmfzr?: string | null | undefined;
  xmfzrContains?: string | null | undefined;
  xmfzrContainsFold?: string | null | undefined;
  xmfzrEqualFold?: string | null | undefined;
  xmfzrGT?: string | null | undefined;
  xmfzrGTE?: string | null | undefined;
  xmfzrHasPrefix?: string | null | undefined;
  xmfzrHasSuffix?: string | null | undefined;
  xmfzrIn?: ReadonlyArray<string> | null | undefined;
  xmfzrIsNil?: boolean | null | undefined;
  xmfzrLT?: string | null | undefined;
  xmfzrLTE?: string | null | undefined;
  xmfzrNEQ?: string | null | undefined;
  xmfzrNotIn?: ReadonlyArray<string> | null | undefined;
  xmfzrNotNil?: boolean | null | undefined;
  xmglfLj?: number | null | undefined;
  xmglfLjGT?: number | null | undefined;
  xmglfLjGTE?: number | null | undefined;
  xmglfLjIn?: ReadonlyArray<number> | null | undefined;
  xmglfLjIsNil?: boolean | null | undefined;
  xmglfLjLT?: number | null | undefined;
  xmglfLjLTE?: number | null | undefined;
  xmglfLjNEQ?: number | null | undefined;
  xmglfLjNotIn?: ReadonlyArray<number> | null | undefined;
  xmglfLjNotNil?: boolean | null | undefined;
  xmglfYs?: number | null | undefined;
  xmglfYsGT?: number | null | undefined;
  xmglfYsGTE?: number | null | undefined;
  xmglfYsIn?: ReadonlyArray<number> | null | undefined;
  xmglfYsIsNil?: boolean | null | undefined;
  xmglfYsLT?: number | null | undefined;
  xmglfYsLTE?: number | null | undefined;
  xmglfYsNEQ?: number | null | undefined;
  xmglfYsNotIn?: ReadonlyArray<number> | null | undefined;
  xmglfYsNotNil?: boolean | null | undefined;
  xmsjf?: number | null | undefined;
  xmsjfGT?: number | null | undefined;
  xmsjfGTE?: number | null | undefined;
  xmsjfIn?: ReadonlyArray<number> | null | undefined;
  xmsjfIsNil?: boolean | null | undefined;
  xmsjfLT?: number | null | undefined;
  xmsjfLTE?: number | null | undefined;
  xmsjfNEQ?: number | null | undefined;
  xmsjfNotIn?: ReadonlyArray<number> | null | undefined;
  xmsjfNotNil?: boolean | null | undefined;
  yye?: number | null | undefined;
  yyeGT?: number | null | undefined;
  yyeGTE?: number | null | undefined;
  yyeIn?: ReadonlyArray<number> | null | undefined;
  yyeIsNil?: boolean | null | undefined;
  yyeLT?: number | null | undefined;
  yyeLTE?: number | null | undefined;
  yyeNEQ?: number | null | undefined;
  yyeNotIn?: ReadonlyArray<number> | null | undefined;
  yyeNotNil?: boolean | null | undefined;
};
export type ProjectStaffWhereInput = {
  and?: ReadonlyArray<ProjectStaffWhereInput> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  cym?: string | null | undefined;
  cymContains?: string | null | undefined;
  cymContainsFold?: string | null | undefined;
  cymEqualFold?: string | null | undefined;
  cymGT?: string | null | undefined;
  cymGTE?: string | null | undefined;
  cymHasPrefix?: string | null | undefined;
  cymHasSuffix?: string | null | undefined;
  cymIn?: ReadonlyArray<string> | null | undefined;
  cymLT?: string | null | undefined;
  cymLTE?: string | null | undefined;
  cymNEQ?: string | null | undefined;
  cymNotIn?: ReadonlyArray<string> | null | undefined;
  design?: number | null | undefined;
  designGT?: number | null | undefined;
  designGTE?: number | null | undefined;
  designIn?: ReadonlyArray<number> | null | undefined;
  designIsNil?: boolean | null | undefined;
  designLT?: number | null | undefined;
  designLTE?: number | null | undefined;
  designNEQ?: number | null | undefined;
  designNotIn?: ReadonlyArray<number> | null | undefined;
  designNotNil?: boolean | null | undefined;
  hasProject?: boolean | null | undefined;
  hasProjectWith?: ReadonlyArray<ProjectWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  installation?: number | null | undefined;
  installationGT?: number | null | undefined;
  installationGTE?: number | null | undefined;
  installationIn?: ReadonlyArray<number> | null | undefined;
  installationIsNil?: boolean | null | undefined;
  installationLT?: number | null | undefined;
  installationLTE?: number | null | undefined;
  installationNEQ?: number | null | undefined;
  installationNotIn?: ReadonlyArray<number> | null | undefined;
  installationNotNil?: boolean | null | undefined;
  management?: number | null | undefined;
  managementGT?: number | null | undefined;
  managementGTE?: number | null | undefined;
  managementIn?: ReadonlyArray<number> | null | undefined;
  managementIsNil?: boolean | null | undefined;
  managementLT?: number | null | undefined;
  managementLTE?: number | null | undefined;
  managementNEQ?: number | null | undefined;
  managementNotIn?: ReadonlyArray<number> | null | undefined;
  managementNotNil?: boolean | null | undefined;
  not?: ProjectStaffWhereInput | null | undefined;
  or?: ReadonlyArray<ProjectStaffWhereInput> | null | undefined;
  projectID?: string | null | undefined;
  projectIDContains?: string | null | undefined;
  projectIDContainsFold?: string | null | undefined;
  projectIDEqualFold?: string | null | undefined;
  projectIDGT?: string | null | undefined;
  projectIDGTE?: string | null | undefined;
  projectIDHasPrefix?: string | null | undefined;
  projectIDHasSuffix?: string | null | undefined;
  projectIDIn?: ReadonlyArray<string> | null | undefined;
  projectIDLT?: string | null | undefined;
  projectIDLTE?: string | null | undefined;
  projectIDNEQ?: string | null | undefined;
  projectIDNotIn?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type ProjectVOWhereInput = {
  and?: ReadonlyArray<ProjectVOWhereInput> | null | undefined;
  applyAmount?: number | null | undefined;
  applyAmountGT?: number | null | undefined;
  applyAmountGTE?: number | null | undefined;
  applyAmountIn?: ReadonlyArray<number> | null | undefined;
  applyAmountIsNil?: boolean | null | undefined;
  applyAmountLT?: number | null | undefined;
  applyAmountLTE?: number | null | undefined;
  applyAmountNEQ?: number | null | undefined;
  applyAmountNotIn?: ReadonlyArray<number> | null | undefined;
  applyAmountNotNil?: boolean | null | undefined;
  approveAmount?: number | null | undefined;
  approveAmountGT?: number | null | undefined;
  approveAmountGTE?: number | null | undefined;
  approveAmountIn?: ReadonlyArray<number> | null | undefined;
  approveAmountIsNil?: boolean | null | undefined;
  approveAmountLT?: number | null | undefined;
  approveAmountLTE?: number | null | undefined;
  approveAmountNEQ?: number | null | undefined;
  approveAmountNotIn?: ReadonlyArray<number> | null | undefined;
  approveAmountNotNil?: boolean | null | undefined;
  azjd?: number | null | undefined;
  azjdGT?: number | null | undefined;
  azjdGTE?: number | null | undefined;
  azjdIn?: ReadonlyArray<number> | null | undefined;
  azjdIsNil?: boolean | null | undefined;
  azjdLT?: number | null | undefined;
  azjdLTE?: number | null | undefined;
  azjdNEQ?: number | null | undefined;
  azjdNotIn?: ReadonlyArray<number> | null | undefined;
  azjdNotNil?: boolean | null | undefined;
  changeType?: number | null | undefined;
  changeTypeGT?: number | null | undefined;
  changeTypeGTE?: number | null | undefined;
  changeTypeIn?: ReadonlyArray<number> | null | undefined;
  changeTypeLT?: number | null | undefined;
  changeTypeLTE?: number | null | undefined;
  changeTypeNEQ?: number | null | undefined;
  changeTypeNotIn?: ReadonlyArray<number> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  hasProject?: boolean | null | undefined;
  hasProjectWith?: ReadonlyArray<ProjectWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  isApproved?: boolean | null | undefined;
  isApprovedNEQ?: boolean | null | undefined;
  not?: ProjectVOWhereInput | null | undefined;
  or?: ReadonlyArray<ProjectVOWhereInput> | null | undefined;
  projectID?: string | null | undefined;
  projectIDContains?: string | null | undefined;
  projectIDContainsFold?: string | null | undefined;
  projectIDEqualFold?: string | null | undefined;
  projectIDGT?: string | null | undefined;
  projectIDGTE?: string | null | undefined;
  projectIDHasPrefix?: string | null | undefined;
  projectIDHasSuffix?: string | null | undefined;
  projectIDIn?: ReadonlyArray<string> | null | undefined;
  projectIDLT?: string | null | undefined;
  projectIDLTE?: string | null | undefined;
  projectIDNEQ?: string | null | undefined;
  projectIDNotIn?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
  yxhyze?: number | null | undefined;
  yxhyzeGT?: number | null | undefined;
  yxhyzeGTE?: number | null | undefined;
  yxhyzeIn?: ReadonlyArray<number> | null | undefined;
  yxhyzeIsNil?: boolean | null | undefined;
  yxhyzeLT?: number | null | undefined;
  yxhyzeLTE?: number | null | undefined;
  yxhyzeNEQ?: number | null | undefined;
  yxhyzeNotIn?: ReadonlyArray<number> | null | undefined;
  yxhyzeNotNil?: boolean | null | undefined;
};
export type CountryWhereInput = {
  adcode?: number | null | undefined;
  adcodeGT?: number | null | undefined;
  adcodeGTE?: number | null | undefined;
  adcodeIn?: ReadonlyArray<number> | null | undefined;
  adcodeLT?: number | null | undefined;
  adcodeLTE?: number | null | undefined;
  adcodeNEQ?: number | null | undefined;
  adcodeNotIn?: ReadonlyArray<number> | null | undefined;
  and?: ReadonlyArray<CountryWhereInput> | null | undefined;
  createdAt?: any | null | undefined;
  createdAtGT?: any | null | undefined;
  createdAtGTE?: any | null | undefined;
  createdAtIn?: ReadonlyArray<any> | null | undefined;
  createdAtLT?: any | null | undefined;
  createdAtLTE?: any | null | undefined;
  createdAtNEQ?: any | null | undefined;
  createdAtNotIn?: ReadonlyArray<any> | null | undefined;
  hasProvinces?: boolean | null | undefined;
  hasProvincesWith?: ReadonlyArray<ProvinceWhereInput> | null | undefined;
  id?: string | null | undefined;
  idGT?: string | null | undefined;
  idGTE?: string | null | undefined;
  idIn?: ReadonlyArray<string> | null | undefined;
  idLT?: string | null | undefined;
  idLTE?: string | null | undefined;
  idNEQ?: string | null | undefined;
  idNotIn?: ReadonlyArray<string> | null | undefined;
  name?: string | null | undefined;
  nameContains?: string | null | undefined;
  nameContainsFold?: string | null | undefined;
  nameEqualFold?: string | null | undefined;
  nameGT?: string | null | undefined;
  nameGTE?: string | null | undefined;
  nameHasPrefix?: string | null | undefined;
  nameHasSuffix?: string | null | undefined;
  nameIn?: ReadonlyArray<string> | null | undefined;
  nameLT?: string | null | undefined;
  nameLTE?: string | null | undefined;
  nameNEQ?: string | null | undefined;
  nameNotIn?: ReadonlyArray<string> | null | undefined;
  not?: CountryWhereInput | null | undefined;
  or?: ReadonlyArray<CountryWhereInput> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedAtGT?: any | null | undefined;
  updatedAtGTE?: any | null | undefined;
  updatedAtIn?: ReadonlyArray<any> | null | undefined;
  updatedAtLT?: any | null | undefined;
  updatedAtLTE?: any | null | undefined;
  updatedAtNEQ?: any | null | undefined;
  updatedAtNotIn?: ReadonlyArray<any> | null | undefined;
};
export type customersDetailPageQuery$variables = {
  first?: number | null | undefined;
  id: string;
  last?: number | null | undefined;
  orderBy: ReadonlyArray<VisitRecordOrder>;
  userId: string;
  where?: VisitRecordWhereInput | null | undefined;
};
export type customersDetailPageQuery$data = {
  readonly node: {
    readonly id?: string;
    readonly sales?: {
      readonly id: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment" | "customerTenderListFragment">;
  } | null | undefined;
  readonly user: {
    readonly tenders?: {
      readonly edges: ReadonlyArray<{
        readonly __id: string;
      } | null | undefined> | null | undefined;
    };
    readonly visitRecords?: {
      readonly edges: ReadonlyArray<{
        readonly __id: string;
      } | null | undefined> | null | undefined;
    };
    readonly " $fragmentSpreads": FragmentRefs<"customerVisitRecordListFragment">;
  } | null | undefined;
};
export type customersDetailPageQuery = {
  response: customersDetailPageQuery$data;
  variables: customersDetailPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "where"
},
v6 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v7/*: any*/)
],
v9 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v10 = {
  "kind": "Variable",
  "name": "last",
  "variableName": "last"
},
v11 = [
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v13 = {
  "fields": [
    {
      "fields": (v6/*: any*/),
      "kind": "ObjectValue",
      "name": "hasCustomerWith"
    }
  ],
  "kind": "ObjectValue",
  "name": "where"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v16 = [
  (v15/*: any*/)
],
v17 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasPreviousPage",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startCursor",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    (v18/*: any*/),
    (v19/*: any*/)
  ],
  "storageKey": null
},
v21 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v22 = {
  "kind": "Variable",
  "name": "where",
  "variableName": "where"
},
v23 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v21/*: any*/),
  (v22/*: any*/)
],
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v25 = [
  (v7/*: any*/),
  (v24/*: any*/)
],
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v27 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
],
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v29 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v13/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "customersDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "sales",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "customerDetailFragment"
              },
              {
                "args": (v11/*: any*/),
                "kind": "FragmentSpread",
                "name": "customerTenderListFragment"
              }
            ],
            "type": "Customer",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "user",
        "args": (v12/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "tenders",
                "args": [
                  (v13/*: any*/)
                ],
                "concreteType": "TenderConnection",
                "kind": "LinkedField",
                "name": "__customerTenderListFragment_tenders_connection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tender",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": (v16/*: any*/),
                        "storageKey": null
                      },
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "visitRecords",
                "args": [
                  (v21/*: any*/),
                  (v22/*: any*/)
                ],
                "concreteType": "VisitRecordConnection",
                "kind": "LinkedField",
                "name": "__customerVisitRecordListFragment_visitRecords_connection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "VisitRecordEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "VisitRecord",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": (v16/*: any*/),
                        "storageKey": null
                      },
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "args": (v23/*: any*/),
                "kind": "FragmentSpread",
                "name": "customerVisitRecordListFragment"
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "customersDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v15/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "sales",
                "plural": false,
                "selections": (v25/*: any*/),
                "storageKey": null
              },
              (v24/*: any*/),
              (v26/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "createdBy",
                "plural": false,
                "selections": [
                  (v24/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ownerType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "industry",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "size",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Area",
                "kind": "LinkedField",
                "name": "area",
                "plural": false,
                "selections": (v25/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contactPerson",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contactPersonPosition",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contactPersonPhone",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contactPersonEmail",
                "storageKey": null
              },
              {
                "alias": "lastVisitRecord",
                "args": (v27/*: any*/),
                "concreteType": "VisitRecordConnection",
                "kind": "LinkedField",
                "name": "visitRecords",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "VisitRecordEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "VisitRecord",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v28/*: any*/),
                          (v7/*: any*/),
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/),
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "visitRecords(last:1)"
              },
              {
                "alias": "lastVisitRecord",
                "args": (v27/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "customerDetailFragment_lastVisitRecord",
                "kind": "LinkedHandle",
                "name": "visitRecords"
              },
              {
                "alias": null,
                "args": (v11/*: any*/),
                "concreteType": "TenderConnection",
                "kind": "LinkedField",
                "name": "tenders",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tender",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v24/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "status",
                            "storageKey": null
                          },
                          (v26/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "estimatedAmount",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Customer",
                            "kind": "LinkedField",
                            "name": "customer",
                            "plural": false,
                            "selections": (v25/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "images",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "fullAddress",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "tenderDate",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "discoveryDate",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "tenderClosingDate",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Area",
                            "kind": "LinkedField",
                            "name": "area",
                            "plural": false,
                            "selections": [
                              (v7/*: any*/),
                              (v24/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "code",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "followingSales",
                            "plural": true,
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "createdBy",
                            "plural": false,
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          },
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v11/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "customerTenderListFragment_tenders",
                "kind": "LinkedHandle",
                "name": "tenders"
              }
            ],
            "type": "Customer",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "user",
        "args": (v12/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v15/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "tenders",
                "args": (v29/*: any*/),
                "concreteType": "TenderConnection",
                "kind": "LinkedField",
                "name": "myTenders",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tender",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v15/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "tenders",
                "args": (v29/*: any*/),
                "filters": [
                  "where"
                ],
                "handle": "connection",
                "key": "customerTenderListFragment_tenders",
                "kind": "LinkedHandle",
                "name": "myTenders"
              },
              {
                "alias": "visitRecords",
                "args": (v23/*: any*/),
                "concreteType": "VisitRecordConnection",
                "kind": "LinkedField",
                "name": "myVisitRecords",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "VisitRecordEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v14/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "VisitRecord",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v15/*: any*/),
                          (v7/*: any*/),
                          (v28/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "visitType",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "commPeople",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "commContent",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "nextStep",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "customerID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserConnection",
                            "kind": "LinkedField",
                            "name": "followupbys",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "UserEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "User",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Tender",
                            "kind": "LinkedField",
                            "name": "tender",
                            "plural": false,
                            "selections": (v25/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "visitRecords",
                "args": (v23/*: any*/),
                "filters": [
                  "orderBy",
                  "where"
                ],
                "handle": "connection",
                "key": "customerVisitRecordListFragment_visitRecords",
                "kind": "LinkedHandle",
                "name": "myVisitRecords"
              }
            ],
            "type": "User",
            "abstractKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "58920220438ed5c722cd7de264a93619",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": [
            "user",
            "tenders"
          ]
        },
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": [
            "user",
            "visitRecords"
          ]
        }
      ]
    },
    "name": "customersDetailPageQuery",
    "operationKind": "query",
    "text": "query customersDetailPageQuery(\n  $id: ID!\n  $orderBy: [VisitRecordOrder!]!\n  $first: Int\n  $last: Int\n  $userId: ID!\n  $where: VisitRecordWhereInput\n) {\n  node(id: $id) {\n    __typename\n    ... on Customer {\n      id\n      sales {\n        id\n      }\n      ...customerDetailFragment\n      ...customerTenderListFragment_2pIUTM\n    }\n    id\n  }\n  user: node(id: $userId) {\n    __typename\n    ... on User {\n      tenders: myTenders(first: $first, last: $last, where: {hasCustomerWith: {id: $id}}) {\n        edges {\n          cursor\n          node {\n            __typename\n            id\n          }\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n          hasPreviousPage\n          startCursor\n        }\n      }\n      visitRecords: myVisitRecords(first: $first, last: $last, orderBy: $orderBy, where: $where) {\n        edges {\n          cursor\n          node {\n            __typename\n            id\n          }\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n          hasPreviousPage\n          startCursor\n        }\n      }\n      ...customerVisitRecordListFragment_2IyplR\n    }\n    id\n  }\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  name\n  createdAt\n  createdBy {\n    name\n    id\n  }\n  updatedAt\n  ownerType\n  industry\n  size\n  sales {\n    id\n    name\n  }\n  area {\n    id\n    name\n  }\n  contactPerson\n  contactPersonPosition\n  contactPersonPhone\n  contactPersonEmail\n  lastVisitRecord: visitRecords(last: 1) {\n    edges {\n      node {\n        date\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment customerTenderListFragment_2pIUTM on Customer {\n  tenders(first: $first, last: $last) {\n    edges {\n      node {\n        id\n        ...tenderListItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment customerVisitRecordListFragment_2IyplR on User {\n  visitRecords: myVisitRecords(first: $first, last: $last, orderBy: $orderBy, where: $where) {\n    edges {\n      node {\n        id\n        ...visitRecordItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  name\n  status\n  createdAt\n  estimatedAmount\n  customer {\n    id\n    name\n  }\n  images\n  fullAddress\n  tenderDate\n  discoveryDate\n  tenderClosingDate\n  area {\n    id\n    name\n    code\n  }\n  followingSales {\n    id\n  }\n  createdBy {\n    id\n  }\n}\n\nfragment visitRecordItemFragment on VisitRecord {\n  id\n  date\n  visitType\n  commPeople\n  commContent\n  nextStep\n  customerID\n  followupbys {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n  tender {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "15164359aa8435b246e8f1905709bfb8";

export default node;
