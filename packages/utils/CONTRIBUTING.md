# Contributing to the Boomerang Utility Library

How to contribute to the project

## Prereqs

You must follow the steps in the [README](README.md) to gain access.

## Standards - TODO

## Publish

Open a pull request on the [repo](https://github.ibm.com/Boomerang/boomerang.app.utilities.git) from your feature or fix branch into `develop` and have it approved.

Pull down the changes on the `develop` branch and merge code into the `master` branch.

```bash
$ git checkout master
$ git merge develop
```

Increment the version in the `package.json` according to [semantic versioning](http://semver.org/) principles, e.g. "1.3.2" -> "1.4.0".

Commit the change and tag it with the corresponding version tag, e.g. "1.4.0".

```bash
$ git commit -m "1.4.0"
$ git tag 1.4.0
```

Push both the commit and tag.

```bash
$ git push
$ git push --tags
```

Publish the npm repository to Artifactory.

```bash
$ npm publish
```

Update artifact properties in Artifactory for Boomerang Lib discovery.

```
PUT https://tools.boomerangplatform.net/artifactory/api/storage/boomeranglib-npm/boomerang-utilities/-/boomerang-utilities-<version>.tgz?properties=git.repo.url=https://github.ibm.com/Boomerang/boomerang.app.utilities.git
HEADERS: X-JFrog-Art-Api: <Personal_API_key>
```

- This can be done using CURL or an API app like [Postman](https://getpostman.com). Find the collection that contains an example of this request [here](https://www.getpostman.com/collections/e846e378d227e699d77f).

Ensure that you have the Boomerang Lib repo of the component library configured as a remote and push latest changes to that repo.

```
$ git remote add lib git@github.ibm.com:Boomerang/boomerang.app.utilities.git
$ git push lib
```
