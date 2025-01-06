build: export CGO_ENABLED=0
build: export GOOS=linux

uat: export CGO_ENABLED=0
uat: export GOOS=linux

build-pull: export CGO_ENABLED=0
build-pull: export GOOS=linux

build-pull-image: export CGO_ENABLED=0
build-pull-image: export GOOS=linux

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
	cd web && pnpm build
	go build -tags uat -o ./bin/cscd-mkm-uat ./cmd/app/main.go

build-pull:
	go build -tags prod -o ./bin/pull ./cmd/pull/.

build-pull-image:
	go build -tags prod -o ./bin/pull-image ./cmd/pull-image/.

