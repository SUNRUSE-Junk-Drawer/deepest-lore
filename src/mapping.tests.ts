import "jasmine"
import * as mapping from "./mapping"
import * as shared from "./shared.tests"

describe(`mapping`, () => {
  shared.testMapping(mapping.schema, instance => instance, `instance`)
})
