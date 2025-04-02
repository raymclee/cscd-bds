package schema

import "entgo.io/ent"

// Land holds the schema definition for the Land entity.
type Land struct {
	ent.Schema
}

// Fields of the Land.
func (Land) Fields() []ent.Field {
	return nil
}

// Edges of the Land.
func (Land) Edges() []ent.Edge {
	return nil
}
