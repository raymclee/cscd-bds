package enum

import (
	"database/sql/driver"
)

type Industry int

const (
	IndustryUnknown Industry = iota
	Internet
	Finance
	Medical
	Food
	Manufacture
	ECommerce
	Technology
	IndustryOther
	Logistics
	Estate
	IndustryGovernment
)

func (i Industry) String() string {
	switch i {
	case Internet:
		return "互联网"
	case Finance:
		return "金融"
	case Medical:
		return "医疗"
	case Food:
		return "餐饮"
	case Manufacture:
		return "制造"
	case ECommerce:
		return "电商"
	case Technology:
		return "科技"
	case IndustryOther:
		return "其他"
	case Logistics:
		return "物流"
	case Estate:
		return "地产"
	case IndustryGovernment:
		return "政府"

	default:
		return "UNKNOWN"
	}
}

// Values provides list valid values for Enum.
func (Industry) Values() []string {
	return []string{IndustryUnknown.String(), Government.String(), CSOE.String(), HighTech.String(), Other.String()}
}

// Value provides the DB a string from int.
func (p Industry) Value() (driver.Value, error) {
	return p.String(), nil
}

// Scan tells our code how to read the enum into our type.
func (p *Industry) Scan(val any) error {
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
	case "互联网":
		*p = Internet
	case "金融":
		*p = Finance
	case "医疗":
		*p = Medical
	case "餐饮":
		*p = Food
	case "制造":
		*p = Manufacture
	case "电商":
		*p = ECommerce
	case "科技":
		*p = Technology
	case "其他":
		*p = IndustryOther
	case "物流":
		*p = Logistics
	case "地产":
		*p = Estate
	case "政府":
		*p = IndustryGovernment
	default:
		*p = IndustryUnknown
	}
	return nil
}
