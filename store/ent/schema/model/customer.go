package model

type Customer struct {
	Name                  *string `json:"name,omitempty"`
	OwnerType             *int    `json:"owner_type,omitempty"`
	Industry              *int    `json:"industry,omitempty"`
	Size                  *int    `json:"size,omitempty"`
	ContactPerson         *string `json:"contact_person,omitempty"`
	ContactPersonPosition *string `json:"contact_person_position,omitempty"`
	ContactPersonPhone    *string `json:"contact_person_phone,omitempty"`
	ContactPersonEmail    *string `json:"contact_person_email,omitempty"`
	AreaID                *string `json:"area_id,omitempty"`
	SalesID               *string `json:"sales_id,omitempty"`
}
