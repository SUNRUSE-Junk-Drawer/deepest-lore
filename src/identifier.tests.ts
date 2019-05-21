import "jasmine"
import * as identifier from "./identifier"
import * as shared from "./shared.tests"

describe(`identifier`, () => {
  shared.testIdentifier(identifier.schema, instance => instance, `instance`)
})
