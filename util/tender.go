package util

import (
	"cscd-bds/store/ent"
	"fmt"
	"time"
)

func IsSHTender(areaCode string) bool {
	return areaCode != "GA" && areaCode != "HW"
}

func NewTenderCode(tenderLength int, areaCode string) string {
	date := time.Now()

	var n int
	if tenderLength > 0 {
		n = tenderLength + 2
	} else {
		n = 1
	}
	return fmt.Sprintf("%s%s%03d", areaCode, date.Format("20060102"), n)
}

func ToProfileInput(tp *ent.TenderProfile) ent.CreateTenderProfileInput {
	return ent.CreateTenderProfileInput{
		Status:                               &tp.Status,
		ApprovalStatus:                       &tp.ApprovalStatus,
		ApprovalMsgID:                        tp.ApprovalMsgID,
		EstimatedAmount:                      tp.EstimatedAmount,
		TenderDate:                           tp.TenderDate,
		Classify:                             tp.Classify,
		DiscoveryDate:                        tp.DiscoveryDate,
		Address:                              tp.Address,
		FullAddress:                          tp.FullAddress,
		Contractor:                           tp.Contractor,
		LevelInvolved:                        tp.LevelInvolved,
		SizeAndValueRating:                   tp.SizeAndValueRating,
		SizeAndValueRatingOverview:           tp.SizeAndValueRatingOverview,
		CreditAndPaymentRating:               tp.CreditAndPaymentRating,
		CreditAndPaymentRatingOverview:       tp.CreditAndPaymentRatingOverview,
		TimeLimitRating:                      tp.TimeLimitRating,
		TimeLimitRatingOverview:              tp.TimeLimitRatingOverview,
		CustomerRelationshipRating:           tp.CustomerRelationshipRating,
		CustomerRelationshipRatingOverview:   tp.CustomerRelationshipRatingOverview,
		CompetitivePartnershipRating:         tp.CompetitivePartnershipRating,
		CompetitivePartnershipRatingOverview: tp.CompetitivePartnershipRatingOverview,
		PrepareToBid:                         &tp.PrepareToBid,
		ProjectCode:                          tp.ProjectCode,
		ProjectType:                          tp.ProjectType,
		ProjectDefinition:                    tp.ProjectDefinition,
		EstimatedProjectStartDate:            tp.EstimatedProjectStartDate,
		EstimatedProjectEndDate:              tp.EstimatedProjectEndDate,
		Attachments:                          tp.Attachments,
		GeoCoordinate:                        tp.GeoCoordinate,
		Remark:                               tp.Remark,
		Images:                               tp.Images,
		TenderSituations:                     tp.TenderSituations,
		OwnerSituations:                      tp.OwnerSituations,
		BiddingInstructions:                  tp.BiddingInstructions,
		CompetitorSituations:                 tp.CompetitorSituations,
		CostEngineer:                         tp.CostEngineer,
		TenderForm:                           tp.TenderForm,
		ContractForm:                         tp.ContractForm,
		ManagementCompany:                    tp.ManagementCompany,
		TenderingAgency:                      tp.TenderingAgency,
		BiddingDate:                          tp.BiddingDate,
		FacadeConsultant:                     tp.FacadeConsultant,
		DesignUnit:                           tp.DesignUnit,
		ConsultingFirm:                       tp.ConsultingFirm,
		KeyProject:                           &tp.KeyProject,
		CurrentProgress:                      tp.CurrentProgress,
		CustomerID:                           tp.CustomerID,
		FinderID:                             tp.FinderID,
		ProvinceID:                           tp.ProvinceID,
		CityID:                               tp.CityID,
		DistrictID:                           tp.DistrictID,
	}
}
