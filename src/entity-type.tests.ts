import "jasmine"
import * as entityType from "./entity-type"
import * as shared from "./shared.tests"

describe(`entity type`, () => {
  shared.testEntityType(entityType.schema, value => value, `instance`)
})
