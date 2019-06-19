import "jasmine"
import * as jsonschema from "jsonschema"
import * as identifier from "./identifier"
import * as sharedTests from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string,
  allMessagesReplacedWith?: string
): void {
  sharedTests.run(sharedTests.exhaustiveIdentifierStrings, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `does not match pattern "^[_a-z0-9]{6}$"`))
  sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) string`))
}

describe(`identifier`, () => {
  test(identifier.schema, instance => instance, `instance`)
})
