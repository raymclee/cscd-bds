// Code generated by ent, DO NOT EDIT.

package ent

import (
	"cscd-bds/store/ent/opportunity"
	"cscd-bds/store/ent/schema/xid"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// Opportunity is the model entity for the Opportunity schema.
type Opportunity struct {
	config `json:"-"`
	// ID of the ent.
	ID xid.ID `json:"id,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// RegistrationNumber holds the value of the "registration_number" field.
	RegistrationNumber string `json:"registration_number,omitempty"`
	selectValues       sql.SelectValues
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Opportunity) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case opportunity.FieldRegistrationNumber:
			values[i] = new(sql.NullString)
		case opportunity.FieldCreatedAt, opportunity.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case opportunity.FieldID:
			values[i] = new(xid.ID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Opportunity fields.
func (o *Opportunity) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case opportunity.FieldID:
			if value, ok := values[i].(*xid.ID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				o.ID = *value
			}
		case opportunity.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				o.CreatedAt = value.Time
			}
		case opportunity.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				o.UpdatedAt = value.Time
			}
		case opportunity.FieldRegistrationNumber:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field registration_number", values[i])
			} else if value.Valid {
				o.RegistrationNumber = value.String
			}
		default:
			o.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Opportunity.
// This includes values selected through modifiers, order, etc.
func (o *Opportunity) Value(name string) (ent.Value, error) {
	return o.selectValues.Get(name)
}

// Update returns a builder for updating this Opportunity.
// Note that you need to call Opportunity.Unwrap() before calling this method if this Opportunity
// was returned from a transaction, and the transaction was committed or rolled back.
func (o *Opportunity) Update() *OpportunityUpdateOne {
	return NewOpportunityClient(o.config).UpdateOne(o)
}

// Unwrap unwraps the Opportunity entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (o *Opportunity) Unwrap() *Opportunity {
	_tx, ok := o.config.driver.(*txDriver)
	if !ok {
		panic("ent: Opportunity is not a transactional entity")
	}
	o.config.driver = _tx.drv
	return o
}

// String implements the fmt.Stringer.
func (o *Opportunity) String() string {
	var builder strings.Builder
	builder.WriteString("Opportunity(")
	builder.WriteString(fmt.Sprintf("id=%v, ", o.ID))
	builder.WriteString("created_at=")
	builder.WriteString(o.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(o.UpdatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("registration_number=")
	builder.WriteString(o.RegistrationNumber)
	builder.WriteByte(')')
	return builder.String()
}

// Opportunities is a parsable slice of Opportunity.
type Opportunities []*Opportunity
