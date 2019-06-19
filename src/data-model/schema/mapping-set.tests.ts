import "jasmine"
import * as mappingSet from "./mapping-set"
import * as shared from "./../shared.tests"

describe(`mapping set`, () => {
  shared.testMappingSet(mappingSet.schema, instance => instance, `instance`)
})
