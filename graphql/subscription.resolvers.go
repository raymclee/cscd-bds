package graphql

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.56

import (
	"context"
	"cscd-bds/graphql/generated"
	"time"
)

// ProjectWarning is the resolver for the projectWarning field.
func (r *subscriptionResolver) ProjectWarning(ctx context.Context) (<-chan string, error) {
	ch := make(chan string)
	go func() {
		for {
			time.Sleep(1 * time.Second)

			currentTime := time.Now()
			ch <- currentTime.Format("2006-01-02 15:04:05")
		}
	}()
	return ch, nil
}

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type subscriptionResolver struct{ *Resolver }
