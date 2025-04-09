package main

import (
	"context"
	"cscd-bds/store"
	"flag"
	"log"

	"github.com/twpayne/go-geom/encoding/ewkbhex"
)

var (
	shouldMigrateTenderProfile   = flag.Bool("tender", false, "migrate tender profile")
	shouldMigrateCustomerProfile = flag.Bool("customer", false, "migrate customer profile")
)

func main() {
	flag.Parse()
	ctx := context.Background()

	s := store.New(true)

	if *shouldMigrateTenderProfile {
		// migrate tender profile
		{
			ts, err := s.Tender.Query().All(ctx)
			if err != nil {
				log.Fatalf("failed to query tenders: %v", err)
			}

			for _, t := range ts {
				// if len(t.Edges.Profiles) > 0 {
				// 	continue
				// }

				q := s.TenderProfile.Create().
					SetApprovalStatus(2).
					SetApprovalDate(t.CreatedAt).
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

				if t.EstimatedAmount != 0 {
					q.SetEstimatedAmount(t.EstimatedAmount)
				}

				if t.Remark != "" {
					q.SetRemark(t.Remark)
				}

				if t.EstimatedAmount != 0 {
					q.SetEstimatedAmount(t.EstimatedAmount)
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
	}

	if *shouldMigrateCustomerProfile {

		// migrate customer profile
		{
			cs, err := s.Customer.Query().All(ctx)
			if err != nil {
				log.Fatalf("failed to query customers: %v", err)
			}

			for _, c := range cs {

				cp, err := s.CustomerProfile.Create().
					SetName(c.Name).
					SetCustomerID(c.ID).
					SetCreatedAt(c.CreatedAt).
					SetNillableCreatedByID(c.CreatedByID).
					SetNillableApproverID(c.ApproverID).
					SetNillableOwnerType(c.OwnerType).
					SetNillableIndustry(c.Industry).
					SetNillableSize(c.Size).
					SetNillableContactPerson(c.ContactPerson).
					SetNillableContactPersonPosition(c.ContactPersonPosition).
					SetNillableContactPersonPhone(c.ContactPersonPhone).
					SetNillableContactPersonEmail(c.ContactPersonEmail).
					SetApprovalStatus(2).
					SetApprovalDate(c.CreatedAt).
					SetNillableSalesID(c.SalesID).
					Save(ctx)
				if err != nil {
					log.Fatalf("failed to save customer profile: %v", err)
				}

				if err := c.Update().SetActiveProfileID(cp.ID).Exec(ctx); err != nil {
					log.Fatalf("failed to update customer active profile: %v", err)
				}

			}
		}
	}
}
