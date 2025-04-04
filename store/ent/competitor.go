// Code generated by ent, DO NOT EDIT.

package ent

import (
	"cscd-bds/store/ent/competitor"
	"cscd-bds/store/ent/schema/xid"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// Competitor is the model entity for the Competitor schema.
type Competitor struct {
	config `json:"-"`
	// ID of the ent.
	ID xid.ID `json:"id,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// ShortName holds the value of the "short_name" field.
	ShortName string `json:"short_name,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the CompetitorQuery when eager-loading is set.
	Edges        CompetitorEdges `json:"edges"`
	selectValues sql.SelectValues
}

// CompetitorEdges holds the relations/edges for other nodes in the graph.
type CompetitorEdges struct {
	// Tenders holds the value of the tenders edge.
	Tenders []*TenderCompetitor `json:"tenders,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
	// totalCount holds the count of the edges above.
	totalCount [1]map[string]int

	namedTenders map[string][]*TenderCompetitor
}

// TendersOrErr returns the Tenders value or an error if the edge
// was not loaded in eager-loading.
func (e CompetitorEdges) TendersOrErr() ([]*TenderCompetitor, error) {
	if e.loadedTypes[0] {
		return e.Tenders, nil
	}
	return nil, &NotLoadedError{edge: "tenders"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Competitor) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case competitor.FieldShortName, competitor.FieldName:
			values[i] = new(sql.NullString)
		case competitor.FieldCreatedAt, competitor.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case competitor.FieldID:
			values[i] = new(xid.ID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Competitor fields.
func (c *Competitor) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case competitor.FieldID:
			if value, ok := values[i].(*xid.ID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				c.ID = *value
			}
		case competitor.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				c.CreatedAt = value.Time
			}
		case competitor.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				c.UpdatedAt = value.Time
			}
		case competitor.FieldShortName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field short_name", values[i])
			} else if value.Valid {
				c.ShortName = value.String
			}
		case competitor.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				c.Name = value.String
			}
		default:
			c.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Competitor.
// This includes values selected through modifiers, order, etc.
func (c *Competitor) Value(name string) (ent.Value, error) {
	return c.selectValues.Get(name)
}

// QueryTenders queries the "tenders" edge of the Competitor entity.
func (c *Competitor) QueryTenders() *TenderCompetitorQuery {
	return NewCompetitorClient(c.config).QueryTenders(c)
}

// Update returns a builder for updating this Competitor.
// Note that you need to call Competitor.Unwrap() before calling this method if this Competitor
// was returned from a transaction, and the transaction was committed or rolled back.
func (c *Competitor) Update() *CompetitorUpdateOne {
	return NewCompetitorClient(c.config).UpdateOne(c)
}

// Unwrap unwraps the Competitor entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (c *Competitor) Unwrap() *Competitor {
	_tx, ok := c.config.driver.(*txDriver)
	if !ok {
		panic("ent: Competitor is not a transactional entity")
	}
	c.config.driver = _tx.drv
	return c
}

// String implements the fmt.Stringer.
func (c *Competitor) String() string {
	var builder strings.Builder
	builder.WriteString("Competitor(")
	builder.WriteString(fmt.Sprintf("id=%v, ", c.ID))
	builder.WriteString("created_at=")
	builder.WriteString(c.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(c.UpdatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("short_name=")
	builder.WriteString(c.ShortName)
	builder.WriteString(", ")
	builder.WriteString("name=")
	builder.WriteString(c.Name)
	builder.WriteByte(')')
	return builder.String()
}

// NamedTenders returns the Tenders named value or an error if the edge was not
// loaded in eager-loading with this name.
func (c *Competitor) NamedTenders(name string) ([]*TenderCompetitor, error) {
	if c.Edges.namedTenders == nil {
		return nil, &NotLoadedError{edge: name}
	}
	nodes, ok := c.Edges.namedTenders[name]
	if !ok {
		return nil, &NotLoadedError{edge: name}
	}
	return nodes, nil
}

func (c *Competitor) appendNamedTenders(name string, edges ...*TenderCompetitor) {
	if c.Edges.namedTenders == nil {
		c.Edges.namedTenders = make(map[string][]*TenderCompetitor)
	}
	if len(edges) == 0 {
		c.Edges.namedTenders[name] = []*TenderCompetitor{}
	} else {
		c.Edges.namedTenders[name] = append(c.Edges.namedTenders[name], edges...)
	}
}

// Competitors is a parsable slice of Competitor.
type Competitors []*Competitor
