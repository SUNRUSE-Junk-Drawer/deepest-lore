import "jasmine"
import * as jsonschema from "jsonschema"
import * as localizedString from "./localized-string"
import * as sharedTests from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string,
  useExactProperty?: boolean,
  allMessagesReplacedWith?: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) object`))
  sharedTests.run(sharedTests.emptyObjects, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.identifierStrings, value => sharedTests.accepts(schema, instanceFactory(sharedTests.keyValue(value, `Test String`))))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory(sharedTests.keyValue(value, `Test String`)), property, allMessagesReplacedWith || `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory(sharedTests.keyValue(`for_eg`, value)), useExactProperty ? property : `${property}.for_eg`, allMessagesReplacedWith || `is not of a type(s) string`))
  describe(`multiple strings`, () => sharedTests.accepts(schema, instanceFactory({
    for_eg: `Test String A`,
    oth_id: `Test String B`,
    anther: `Test String C`,
    lastid: `Test String D`
  })))
}

describe(`localized string`, () => {
  test(localizedString.schema, instance => instance, `instance`)
})
