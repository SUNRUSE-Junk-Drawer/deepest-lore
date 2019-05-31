import "jasmine"
import * as mappingDataFileSet from "./mapping-data-file-set"
import * as shared from "./shared.tests"

describe(`mapping data file set`, () => shared.testMappingDataFileSet(
  mappingDataFileSet.schema, instance => instance, `instance`
))
