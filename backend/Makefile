# .SILENT:
.DEFAULT_GOAL=all
.PHONY: server dev prod tall all

node_modules: package.json
	yarn

yarn.lock: package.json
	npm update && npm prune

server: node_modules
	yarn serve

dev: node_modules
	yarn dev

prod: node_modules
	yarn build

test: node_modules
	yarn test

deploy: node_modules
	git add .
	git commit -am "${commit}" -S
	git push -u origin master

all: server dev assets #mail
	# to use with option -j3

tall:
	tmux new-session "make dev" \;\
		split-window -h "make server" \;\
		split-window -v "make assets"
