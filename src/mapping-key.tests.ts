import "jasmine"
import * as mappingKey from "./mapping-key"
import * as shared from "./shared.tests"

describe(`mapping key`, () => {
  shared.testMappingKey(mappingKey.schema, instance => instance, `instance`)
})
