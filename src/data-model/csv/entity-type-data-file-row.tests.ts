import "jasmine"
import * as entityTypeDataFileRow from "./entity-type-data-file-row"
import * as shared from "./../shared.tests"

describe(`entity type data file row`, () => shared.testEntityTypeDataFileRow(
  entityTypeDataFileRow.schema,
  value => value,
  `instance`
))
