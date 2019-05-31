import "jasmine"
import * as mappingDataFile from "./mapping-data-file"
import * as shared from "./shared.tests"

describe(`mapping data file row`, () => shared.testMappingDataFile(
  mappingDataFile.schema,
  value => value,
  `instance`
))
