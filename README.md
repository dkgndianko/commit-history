# _Commit History_
This is a sample project retrieving user commits



# Objectives:
- build REST API that allows to read commits
- consume GitHub API from NodeJS
- refresh action (front end)
references: https://developer.github.com/v3/

# Front end
Implemented with vuejs

# Back end
Implemented with expressjs with typescript

## Installation

```bash
  git clone git@github.com:bcdbuddy/commit-history.git
  cp sample.env .env
  yarn watch
```

## Run
```bash
  # Dev: compile typescript
  yarn dev

  # Serve: start the server
  yarn serve

  # Watch: Run both server and compilation on watch mode
  yarn watch

  # Build for production
  yarn build

  # Linting using standard/standard
  yarn lint

```


- implement repository pattern
- add commit router with associated controller

# TODO
- test
- change repository parameter from .env to actual parameter
- add features:
  * compare commits
  * issues
  * pull requests associated with a commit
  * branches
- support other repository (gitlab, bitbuckets)