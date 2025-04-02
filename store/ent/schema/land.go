package schema

import "entgo.io/ent"

// Land holds the schema definition for the Land entity.
type Land struct {
	ent.Schema
}

func (Land) Mixin() []ent.Mixin {
	return []ent.Mixin{
		MixinWithPrefix("LA"),
		TimeMixin{},
	}
}

// Fields of the Land.
func (Land) Fields() []ent.Field {
	return nil
}

// Edges of the Land.
func (Land) Edges() []ent.Edge {
	return nil
}
