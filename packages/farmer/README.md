# boomerang.package.farmer

Frontend App Repo ManagER

Farmer will update all `package.json` and `package-lock.json` files in a directory with a supplied dependency version and tag a new commit with an incremented patch version

## Install & Use

```sh
$ npm install -g @boomerang/farmer
$ farmer <../relative/path/to/directory> <dependency> <version>
```

## Use with npx

```sh
$ npx farmer -p <../relative/path/to/directory> -d <dependency> -v <version> -t
```

## Flags

| flag | value  | description                                                                                            |
| :--: | ------ | ------------------------------------------------------------------------------------------------------ |
|  p   | string | relative path to directory to look for repos to update                                                 |
|  d   | string | dependency to update                                                                                   |
|  v   | string | version to set dependency to                                                                           |
|  t   | n/a    | boolean to git tag the commit to new version using semantic versioning "patch" e.g. `1.2.3` -> `1.2.4` |

## Assumptions

- repos use `package.json` file to manage dependencies
- `npm` is used as the dependency manager
- repos have a `develop` branch
- repos follow semantic versioning for releases via git tags e.g. `1.2.3`
