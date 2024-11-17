create:
	go run -mod=mod entgo.io/ent/cmd/ent new --target store/ent/schema

gen:
	go generate ./...
	cd web && pnpm gen