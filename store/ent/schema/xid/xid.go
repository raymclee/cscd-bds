package xid

import (
	"database/sql/driver"
	"fmt"
	"io"
	"strconv"

	"github.com/rs/xid"
)

// type ID string
type ID struct {
	V string
}

func MustNew(prefix string) ID { return ID{fmt.Sprintf("%s-%s", prefix, xid.New())} }

// UnmarshalGQL implements the graphql.Unmarshaler interface
func (u *ID) UnmarshalGQL(v interface{}) error {
	return u.Scan(v)
}

// MarshalGQL implements the graphql.Marshaler interface
func (u ID) MarshalGQL(w io.Writer) {
	_, _ = io.WriteString(w, strconv.Quote(u.V))
}

// Scan implements the Scanner interface.
func (u *ID) Scan(src interface{}) error {
	if src == nil {
		return fmt.Errorf("xid: expected a value")
	}
	switch src := src.(type) {
	case string:
		*u = ID{src}
	case ID:
		*u = src
	default:
		return fmt.Errorf("xid: unexpected type, %T", src)
	}
	return nil
}

// Value implements the driver Valuer interface.
func (u ID) Value() (driver.Value, error) {
	return u.V, nil
}

// func MarshalID(id xid.ID) graphql.Marshaler {
// 	return graphql.WriterFunc(func(w io.Writer) {
// 		_, _ = io.WriteString(w, strconv.Quote(id.String()))
// 	})
// }

// func UnmarshalID(v interface{}) (id xid.ID, err error) {
// 	s, ok := v.(string)
// 	if !ok {
// 		return id, fmt.Errorf("invalid type %T, expect string", v)
// 	}
// 	return xid.FromString(s)
// }
