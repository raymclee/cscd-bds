package graphql

import "cscd-bds/store/ent"

func CopyTenderProfile(source *ent.TenderProfile) ent.CreateTenderProfileInput {
	return ent.CreateTenderProfileInput{
		Status:                               &source.Status,
		ApprovalStatus:                       &source.ApprovalStatus,
		ApprovalMsgID:                        source.ApprovalMsgID,
		Name:                                 source.Name,
		EstimatedAmount:                      source.EstimatedAmount,
		TenderDate:                           source.TenderDate,
		Classify:                             source.Classify,
		DiscoveryDate:                        source.DiscoveryDate,
		Address:                              source.Address,
		FullAddress:                          source.FullAddress,
		Contractor:                           source.Contractor,
		LevelInvolved:                        source.LevelInvolved,
		SizeAndValueRating:                   source.SizeAndValueRating,
		SizeAndValueRatingOverview:           source.SizeAndValueRatingOverview,
		CreditAndPaymentRating:               source.CreditAndPaymentRating,
		CreditAndPaymentRatingOverview:       source.CreditAndPaymentRatingOverview,
		TimeLimitRating:                      source.TimeLimitRating,
		TimeLimitRatingOverview:              source.TimeLimitRatingOverview,
		CustomerRelationshipRating:           source.CustomerRelationshipRating,
		CustomerRelationshipRatingOverview:   source.CustomerRelationshipRatingOverview,
		CompetitivePartnershipRating:         source.CompetitivePartnershipRating,
		CompetitivePartnershipRatingOverview: source.CompetitivePartnershipRatingOverview,
		PrepareToBid:                         &source.PrepareToBid,
		ProjectCode:                          source.ProjectCode,
		ProjectType:                          source.ProjectType,
		ProjectDefinition:                    source.ProjectDefinition,
		EstimatedProjectStartDate:            source.EstimatedProjectStartDate,
		EstimatedProjectEndDate:              source.EstimatedProjectEndDate,
		Attachments:                          source.Attachments,
		GeoCoordinate:                        source.GeoCoordinate,
		Remark:                               source.Remark,
		Images:                               source.Images,
		TenderSituations:                     source.TenderSituations,
		OwnerSituations:                      source.OwnerSituations,
		BiddingInstructions:                  source.BiddingInstructions,
		CompetitorSituations:                 source.CompetitorSituations,
		CostEngineer:                         source.CostEngineer,
		TenderForm:                           source.TenderForm,
		ContractForm:                         source.ContractForm,
		ManagementCompany:                    source.ManagementCompany,
		TenderingAgency:                      source.TenderingAgency,
		BiddingDate:                          source.BiddingDate,
		FacadeConsultant:                     source.FacadeConsultant,
		DesignUnit:                           source.DesignUnit,
		ConsultingFirm:                       source.ConsultingFirm,
		KeyProject:                           &source.KeyProject,
		CurrentProgress:                      source.CurrentProgress,
		TenderWinCompany:                     source.TenderWinCompany,
		TenderCode:                           source.TenderCode,
		Architect:                            source.Architect,
		Developer:                            source.Developer,
		TenderClosingDate:                    source.TenderClosingDate,
		ConstructionArea:                     source.ConstructionArea,
		TenderWinDate:                        source.TenderWinDate,
		TenderWinAmount:                      source.TenderWinAmount,
		LastTenderAmount:                     source.LastTenderAmount,
		TenderID:                             source.TenderID,
		ProvinceID:                           source.ProvinceID,
		CityID:                               source.CityID,
		DistrictID:                           source.DistrictID,
		CustomerID:                           source.CustomerID,
		FinderID:                             source.FinderID,
		CreatedByID:                          source.CreatedByID,
		ApproverID:                           source.ApproverID,
	}
}

func CanBeWinOrLose(tender *ent.TenderProfile) bool {
	switch tender.Status {
	case 1, 5, 6:
		return true
	default:
		return false
	}
}
