import "jasmine"
import * as entityTypeDataFileSet from "./entity-type-data-file-set"
import * as shared from "./shared.tests"

describe(`entity type data file set`, () => shared.testEntityTypeDataFileSet(
  entityTypeDataFileSet.schema, instance => instance, `instance`
))
