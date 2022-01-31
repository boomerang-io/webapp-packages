# Farmer

Frontend App Repo ManagER

Farmer will update all `package.json` and `package-lock.json` files in a directory with a supplied dependency version and tag a new commit with an incremented patch version

## Install & Use

```sh
$ npm install -g @boomerang-io/farmer
$ farmer -d <dependency> -v <version> -b <path/to/directory> -b <branch> -t (tag or not)
```

## Use with npx

```sh
$ npx farmer -p -d <dependency> -v <version> <path/to/directory> -b <branch> -t (tag or not)
```

## Flags

| flag | value   | description                                                                                            | default           |
| :--: | ------- | ------------------------------------------------------------------------------------------------------ | ----------------- |
|  d   | string  | dependency to update                                                                                   |                   |
|  v   | string  | version to set dependency to                                                                           |                   |
|  p   | string  | relative path to directory to look for repos to update                                                 | current directory |
|  b   | string  | branch to make changes against. The branch will be created locally if it doesn't exist.                | main              |
|  t   | boolean | boolean to git tag the commit to new version using semantic versioning "patch" e.g. `1.2.3` -> `1.2.4` | false             |

## Assumptions

- repos use `package.json` file to manage dependencies
- `npm` is used as the dependency manager
- repos have a `develop` branch
- repos follow semantic versioning for releases via git tags e.g. `1.2.3`
