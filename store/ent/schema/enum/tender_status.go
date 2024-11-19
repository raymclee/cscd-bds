package enum

import "database/sql/driver"

type TenderStatus int

const (
	TenderStatusUnknown TenderStatus = iota
	Following
	StopFollowing
	Win
	Lose
	Valuation
	BidSubmitted
	Invalid
)

func (p TenderStatus) String() string {
	switch p {
	case Following:
		return "跟进中"
	case StopFollowing:
		return "停止跟进"
	case Win:
		return "中标"
	case Lose:
		return "失标"
	case Valuation:
		return "估价"
	case BidSubmitted:
		return "已交标"
	case Invalid:
		return "数据作废"
	default:
		return "UNKNOWN"
	}
}

// Values provides list valid values for Enum.
func (TenderStatus) Values() []string {
	return []string{TenderStatusUnknown.String(), Government.String(), CSOE.String(), HighTech.String(), Other.String()}
}

// Value provides the DB a string from int.
func (p TenderStatus) Value() (driver.Value, error) {
	return p.String(), nil
}

// Scan tells our code how to read the enum into our type.
func (p *TenderStatus) Scan(val any) error {
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
	case "跟进中":
		*p = Following
	case "停止跟进":
		*p = StopFollowing
	case "中标":
		*p = Win
	case "失标":
		*p = Lose
	case "估价":
		*p = Valuation
	case "已交标":
		*p = BidSubmitted
	case "数据作废":
		*p = Invalid
	default:
		*p = TenderStatusUnknown
	}
	return nil
}
