import "jasmine"
import * as jsonschema from "jsonschema"
import * as identifier from "./identifier"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string,
  allMessagesReplacedWith?: string
): void {
  shared.run(shared.exhaustiveIdentifierStrings, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `does not match pattern "^[_a-z0-9]{6}$"`))
  shared.run(shared.nonStrings, value => shared.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) string`))
}

describe(`identifier`, () => {
  test(identifier.schema, instance => instance, `instance`)
})
