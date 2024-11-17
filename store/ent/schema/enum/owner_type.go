package enum

import "database/sql/driver"

type OwnerType int

const (
	OwnerTypeUnknown OwnerType = iota
	Government
	CSOE
	HighTech
	Other
)

func (p OwnerType) String() string {
	switch p {
	case Government:
		return "政府平台"
	case CSOE:
		return "央企国企"
	case HighTech:
		return "高科技企业"
	case Other:
		return "其他企业"
	default:
		return "UNKNOWN"
	}
}

// Values provides list valid values for Enum.
func (OwnerType) Values() []string {
	return []string{OwnerTypeUnknown.String(), Government.String(), CSOE.String(), HighTech.String(), Other.String()}
}

// Value provides the DB a string from int.
func (p OwnerType) Value() (driver.Value, error) {
	return p.String(), nil
}

// Scan tells our code how to read the enum into our type.
func (p *OwnerType) Scan(val any) error {
	var s string
	switch v := val.(type) {
	case nil:
		return nil
	case string:
		s = v
	case []uint8:
		s = string(v)
	}
	switch s {
	case "政府平台":
		*p = Government
	case "央企国企":
		*p = CSOE
	case "高科技企业":
		*p = HighTech
	case "其他企业":
		*p = Other
	default:
		*p = OwnerTypeUnknown
	}
	return nil
}
