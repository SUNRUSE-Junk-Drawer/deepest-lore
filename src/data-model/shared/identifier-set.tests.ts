import "jasmine"
import * as jsonschema from "jsonschema"
import * as identifierSet from "./identifier-set"
import * as sharedTests from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string,
  useExactProperty?: boolean,
  allMessagesReplacedWith?: string
): void {
  sharedTests.run(sharedTests.exhaustiveIdentifierStrings, value => sharedTests.accepts(schema, instanceFactory([value])))
  sharedTests.run(sharedTests.emptyArrays, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory([value]), useExactProperty ? property : `${property}[0]`, allMessagesReplacedWith || `does not match pattern "^[_a-z0-9]{6}$"`))
  sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory([value]), useExactProperty ? property : `${property}[0]`, allMessagesReplacedWith || `is not of a type(s) string`))
  sharedTests.run(sharedTests.nonArrays, value => sharedTests.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) array`))
  describe(`multiple identifiers`, () => sharedTests.accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `__this`])))
  describe(`duplicate identifiers`, () => sharedTests.rejects(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `val_id`, `__this`]), property, allMessagesReplacedWith || `contains duplicate item`))
}

describe(`identifier set`, () => {
  test(identifierSet.schema, instance => instance, `instance`)
})
