import "jasmine"
import * as mappingDataFileRow from "./mapping-data-file-row"
import * as shared from "./../shared.tests"

describe(`mapping data file row`, () => shared.testMappingDataFileRow(
  mappingDataFileRow.schema,
  value => value,
  `instance`
))
