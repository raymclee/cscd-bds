package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.56

import (
	"context"
	"cscd-bds/graphql/model"
	"fmt"
)

// SearchFeishuUser is the resolver for the searchFeishuUser field.
func (r *queryResolver) SearchFeishuUser(ctx context.Context, keyword string) ([]*model.FeishuUser, error) {
	users, err := r.feishu.SearchFeishuUser(ctx, keyword)
	if err != nil {
		return nil, err
	}
	var out []*model.FeishuUser
	for _, user := range *users {
		out = append(out, &model.FeishuUser{
			OpenID:    user.OpenID,
			Name:      user.Name,
			AvatarURL: user.Avatar.AvatarOrigin,
		})
	}
	return out, nil
}

// SearchLocation is the resolver for the searchLocation field.
func (r *queryResolver) SearchLocation(ctx context.Context, keyword string) ([]*model.Location, error) {
	panic(fmt.Errorf("not implemented: SearchLocation - searchLocation"))
}
