build: export CGO_ENABLED=0
build: export GOOS=linux
build: export VITE_HOST=http://10.106.189.10:8081

create:
	go run -mod=mod entgo.io/ent/cmd/ent new --target store/ent/schema

dev:
	air
	
gen:
	go generate ./...
	cd web && pnpm gen


build:
	cd web && pnpm build
	go build -tags prod -o ./bin/cscd-mkm ./cmd/app/main.go

uat:
	go run -tags prod ./cmd/app/main.go