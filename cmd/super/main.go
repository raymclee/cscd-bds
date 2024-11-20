package main

import (
	"context"
	"cscd-bds/store"
	"log"
)

func main() {
	s := store.NewStore()

	if err := s.User.Create().
		SetName("Ray LEE").
		SetUsername("ray.mclee").
		SetOpenID("on_87d2f3c411799159f6fc28a754c2b77e").SetEmail("ray.mclee@fefacade.com").
		SetAvatarURL("https://s1-imfile.feishucdn.com/static-resource/v1/v3_009r_993c6382-4209-4eb3-96aa-d2271c7d601g~?image_size=72x72&cut_type=&quality=&format=image&sticker_format=.webp").Exec(context.Background()); err != nil {
		log.Fatal(err)
	}
}
