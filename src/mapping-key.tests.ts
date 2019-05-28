import "jasmine"
import * as mappingKey from "./mapping-key"
import * as shared from "./shared.tests"

describe(`localized string`, () => {
  shared.testMappingKey(mappingKey.schema, instance => instance, `instance`)
})
