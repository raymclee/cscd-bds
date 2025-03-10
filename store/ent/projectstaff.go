// Code generated by ent, DO NOT EDIT.

package ent

import (
	"cscd-bds/store/ent/project"
	"cscd-bds/store/ent/projectstaff"
	"cscd-bds/store/ent/schema/xid"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// ProjectStaff is the model entity for the ProjectStaff schema.
type ProjectStaff struct {
	config `json:"-"`
	// ID of the ent.
	ID xid.ID `json:"id,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// UpdatedAt holds the value of the "updated_at" field.
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// Code-YYYY-MM
	Cym string `json:"cym,omitempty"`
	// 安裝人數
	Installation *float64 `json:"installation,omitempty"`
	// 管理人數
	Management *float64 `json:"management,omitempty"`
	// 設計人數
	Design *float64 `json:"design,omitempty"`
	// ProjectID holds the value of the "project_id" field.
	ProjectID xid.ID `json:"project_id,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the ProjectStaffQuery when eager-loading is set.
	Edges        ProjectStaffEdges `json:"edges"`
	selectValues sql.SelectValues
}

// ProjectStaffEdges holds the relations/edges for other nodes in the graph.
type ProjectStaffEdges struct {
	// Project holds the value of the project edge.
	Project *Project `json:"project,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
	// totalCount holds the count of the edges above.
	totalCount [1]map[string]int
}

// ProjectOrErr returns the Project value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e ProjectStaffEdges) ProjectOrErr() (*Project, error) {
	if e.Project != nil {
		return e.Project, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: project.Label}
	}
	return nil, &NotLoadedError{edge: "project"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*ProjectStaff) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case projectstaff.FieldInstallation, projectstaff.FieldManagement, projectstaff.FieldDesign:
			values[i] = new(sql.NullFloat64)
		case projectstaff.FieldCym:
			values[i] = new(sql.NullString)
		case projectstaff.FieldCreatedAt, projectstaff.FieldUpdatedAt:
			values[i] = new(sql.NullTime)
		case projectstaff.FieldID, projectstaff.FieldProjectID:
			values[i] = new(xid.ID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the ProjectStaff fields.
func (ps *ProjectStaff) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case projectstaff.FieldID:
			if value, ok := values[i].(*xid.ID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				ps.ID = *value
			}
		case projectstaff.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				ps.CreatedAt = value.Time
			}
		case projectstaff.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				ps.UpdatedAt = value.Time
			}
		case projectstaff.FieldCym:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field cym", values[i])
			} else if value.Valid {
				ps.Cym = value.String
			}
		case projectstaff.FieldInstallation:
			if value, ok := values[i].(*sql.NullFloat64); !ok {
				return fmt.Errorf("unexpected type %T for field installation", values[i])
			} else if value.Valid {
				ps.Installation = new(float64)
				*ps.Installation = value.Float64
			}
		case projectstaff.FieldManagement:
			if value, ok := values[i].(*sql.NullFloat64); !ok {
				return fmt.Errorf("unexpected type %T for field management", values[i])
			} else if value.Valid {
				ps.Management = new(float64)
				*ps.Management = value.Float64
			}
		case projectstaff.FieldDesign:
			if value, ok := values[i].(*sql.NullFloat64); !ok {
				return fmt.Errorf("unexpected type %T for field design", values[i])
			} else if value.Valid {
				ps.Design = new(float64)
				*ps.Design = value.Float64
			}
		case projectstaff.FieldProjectID:
			if value, ok := values[i].(*xid.ID); !ok {
				return fmt.Errorf("unexpected type %T for field project_id", values[i])
			} else if value != nil {
				ps.ProjectID = *value
			}
		default:
			ps.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the ProjectStaff.
// This includes values selected through modifiers, order, etc.
func (ps *ProjectStaff) Value(name string) (ent.Value, error) {
	return ps.selectValues.Get(name)
}

// QueryProject queries the "project" edge of the ProjectStaff entity.
func (ps *ProjectStaff) QueryProject() *ProjectQuery {
	return NewProjectStaffClient(ps.config).QueryProject(ps)
}

// Update returns a builder for updating this ProjectStaff.
// Note that you need to call ProjectStaff.Unwrap() before calling this method if this ProjectStaff
// was returned from a transaction, and the transaction was committed or rolled back.
func (ps *ProjectStaff) Update() *ProjectStaffUpdateOne {
	return NewProjectStaffClient(ps.config).UpdateOne(ps)
}

// Unwrap unwraps the ProjectStaff entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (ps *ProjectStaff) Unwrap() *ProjectStaff {
	_tx, ok := ps.config.driver.(*txDriver)
	if !ok {
		panic("ent: ProjectStaff is not a transactional entity")
	}
	ps.config.driver = _tx.drv
	return ps
}

// String implements the fmt.Stringer.
func (ps *ProjectStaff) String() string {
	var builder strings.Builder
	builder.WriteString("ProjectStaff(")
	builder.WriteString(fmt.Sprintf("id=%v, ", ps.ID))
	builder.WriteString("created_at=")
	builder.WriteString(ps.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(ps.UpdatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("cym=")
	builder.WriteString(ps.Cym)
	builder.WriteString(", ")
	if v := ps.Installation; v != nil {
		builder.WriteString("installation=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	builder.WriteString(", ")
	if v := ps.Management; v != nil {
		builder.WriteString("management=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	builder.WriteString(", ")
	if v := ps.Design; v != nil {
		builder.WriteString("design=")
		builder.WriteString(fmt.Sprintf("%v", *v))
	}
	builder.WriteString(", ")
	builder.WriteString("project_id=")
	builder.WriteString(fmt.Sprintf("%v", ps.ProjectID))
	builder.WriteByte(')')
	return builder.String()
}

// ProjectStaffs is a parsable slice of ProjectStaff.
type ProjectStaffs []*ProjectStaff
