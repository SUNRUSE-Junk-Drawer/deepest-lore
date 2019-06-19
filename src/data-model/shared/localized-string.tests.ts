import "jasmine"
import * as jsonschema from "jsonschema"
import * as localizedString from "./localized-string"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string,
  useExactProperty?: boolean,
  allMessagesReplacedWith?: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) object`))
  shared.run(shared.emptyObjects, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.identifierStrings, value => shared.accepts(schema, instanceFactory(shared.keyValue(value, `Test String`))))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory(shared.keyValue(value, `Test String`)), property, allMessagesReplacedWith || `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  shared.run(shared.nonStrings, value => shared.rejects(schema, instanceFactory(shared.keyValue(`for_eg`, value)), useExactProperty ? property : `${property}.for_eg`, allMessagesReplacedWith || `is not of a type(s) string`))
  describe(`multiple strings`, () => shared.accepts(schema, instanceFactory({
    for_eg: `Test String A`,
    oth_id: `Test String B`,
    anther: `Test String C`,
    lastid: `Test String D`
  })))
}

describe(`localized string`, () => {
  test(localizedString.schema, instance => instance, `instance`)
})
