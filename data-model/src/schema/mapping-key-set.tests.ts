import "jasmine"
import * as mappingKeySet from "./mapping-key-set"
import * as shared from "./../shared.tests"

describe(`mapping key set`, () => {
  shared.testMappingKeySet(mappingKeySet.schema, value => value, `instance`)
})
