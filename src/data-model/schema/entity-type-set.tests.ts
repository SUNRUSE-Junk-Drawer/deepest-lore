import "jasmine"
import * as entityTypeSet from "./entity-type-set"
import * as shared from "./../shared.tests"

describe(`entity type set`, () => {
  shared.testEntityTypeSet(entityTypeSet.schema, value => value, `instance`)
})
