package main

import (
	"context"
	"cscd-bds/store"
	"log"

	"github.com/twpayne/go-geom/encoding/ewkbhex"
)

func main() {
	ctx := context.Background()

	s := store.New(false)

	ts, err := s.Tender.Query().WithProfiles().All(ctx)
	if err != nil {
		log.Fatalf("failed to query tenders: %v", err)
	}

	for _, t := range ts {
		// if len(t.Edges.Profiles) > 0 {
		// 	continue
		// }

		q := s.TenderProfile.Create().
			SetApprovalStatus(t.ApprovalStatus).
			SetStatus(t.Status).
			SetTenderID(t.ID).
			SetCreatedAt(t.CreatedAt).
			SetNillableCustomerID(t.CustomerID).
			SetNillableFinderID(t.FinderID).
			SetNillableCreatedByID(t.CreatedByID).
			SetNillableApproverID(t.ApproverID).
			SetName(t.Name).
			SetTenderDate(t.TenderDate).
			SetNillableClassify(t.Classify).
			SetDiscoveryDate(t.DiscoveryDate).
			SetNillableAddress(t.Address).
			SetNillableFullAddress(t.FullAddress).
			SetNillableContractor(t.Contractor).
			SetNillableLevelInvolved(t.LevelInvolved).
			SetNillableSizeAndValueRating(t.SizeAndValueRating).
			SetNillableCreditAndPaymentRating(t.CreditAndPaymentRating).
			SetNillableTimeLimitRating(t.TimeLimitRating).
			SetNillableCustomerRelationshipRating(t.CustomerRelationshipRating).
			SetNillableCompetitivePartnershipRating(t.CompetitivePartnershipRating).
			SetPrepareToBid(t.PrepareToBid).
			SetNillableProjectCode(t.ProjectCode).
			SetNillableProjectType(t.ProjectType).
			SetNillableProjectDefinition(t.ProjectDefinition).
			SetNillableEstimatedProjectStartDate(t.EstimatedProjectStartDate).
			SetNillableEstimatedProjectEndDate(t.EstimatedProjectEndDate).
			SetAttachments(t.Attachements).
			SetGeoBounds(t.GeoBounds).
			SetImages(t.Images).
			SetNillableTenderSituations(t.TenderSituations).
			SetNillableOwnerSituations(t.OwnerSituations).
			SetNillableBiddingInstructions(t.BiddingInstructions).
			SetNillableCompetitorSituations(t.CompetitorSituations).
			SetNillableCostEngineer(t.CostEngineer).
			SetNillableTenderForm(t.TenderForm).
			SetNillableContractForm(t.ContractForm).
			SetNillableManagementCompany(t.ManagementCompany).
			SetNillableTenderingAgency(t.TenderingAgency).
			SetNillableProvinceID(t.ProvinceID).
			SetNillableCityID(t.CityID).
			SetNillableDistrictID(t.DistrictID).
			SetNillableTenderWinCompany(t.TenderWinCompany).
			SetNillableTenderSituations(t.TenderSituations).
			SetNillableOwnerSituations(t.OwnerSituations).
			SetNillableBiddingInstructions(t.BiddingInstructions).
			SetNillableCompetitorSituations(t.CompetitorSituations).
			SetNillableCostEngineer(t.CostEngineer).
			SetNillableTenderForm(t.TenderForm).
			SetNillableContractForm(t.ContractForm).
			SetNillableManagementCompany(t.ManagementCompany).
			SetNillableTenderingAgency(t.TenderingAgency).
			SetKeyProject(t.KeyProject).
			SetNillableCurrentProgress(t.CurrentProgress)

		if t.EstimatedAmount != 0 {
			q.SetEstimatedAmount(t.EstimatedAmount)
		}
		if !t.TenderClosingDate.IsZero() {
			q.SetTenderClosingDate(t.TenderClosingDate)
		}
		if !t.TenderWinDate.IsZero() {
			q.SetTenderWinDate(t.TenderWinDate)
		}
		if t.TenderWinAmount != 0 {
			q.SetTenderWinAmount(t.TenderWinAmount)
		}
		if t.LastTenderAmount != 0 {
			q.SetLastTenderAmount(t.LastTenderAmount)
		}
		if t.TenderCode != "" {
			q.SetTenderCode(t.TenderCode)
		}
		if t.Architect != "" {
			q.SetArchitect(t.Architect)
		}
		if t.Developer != "" {
			q.SetDeveloper(t.Developer)
		}
		if t.ConstructionArea != "" {
			q.SetConstructionArea(t.ConstructionArea)
		}

		if t.Remark != "" {
			q.SetRemark(t.Remark)
		}

		if t.GeoCoordinate != nil {
			coord, err := t.GeoCoordinate.Value()
			if err != nil {
				log.Fatalf("failed to get geo coordinate: %v", err)
			}
			geoJson, err := ewkbhex.Decode(coord.(string))
			if err != nil {
				log.Fatalf("failed to decode geo coordinate: %v", err)
			}
			coords := geoJson.FlatCoords()
			q.SetGeoCoordinate(coords)
		}

		tp, err := q.Save(ctx)
		if err != nil {
			log.Fatalf("failed to save tender profile: %v", err)
		}
		if err := s.Tender.UpdateOneID(t.ID).SetActiveProfileID(tp.ID).Exec(ctx); err != nil {
			log.Fatalf("failed to update tender active profile: %v", err)
		}
	}
}
