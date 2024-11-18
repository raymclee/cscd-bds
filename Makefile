create:
	go run -mod=mod entgo.io/ent/cmd/ent new --target store/ent/schema

dev:
	air
	
gen:
	go generate ./...
	cd web && pnpm gen