create:
	go run -mod=mod entgo.io/ent/cmd/ent new --target store/ent/schema

generate:
	go generate ./...