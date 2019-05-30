import "jasmine"
import * as entityTypeDataFile from "./entity-type-data-file"
import * as shared from "./shared.tests"

describe(`entity type data file row`, () => shared.testEntityTypeDataFile(
  entityTypeDataFile.schema,
  value => value,
  `instance`
))
