import "jasmine"
import * as identifierSet from "./identifier-set"
import * as shared from "./../shared.tests"

describe(`identifier set`, () => {
  shared.testIdentifierSet(identifierSet.schema, instance => instance, `instance`)
})
