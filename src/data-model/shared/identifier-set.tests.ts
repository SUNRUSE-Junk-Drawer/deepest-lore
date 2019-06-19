import "jasmine"
import * as jsonschema from "jsonschema"
import * as identifierSet from "./identifier-set"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string,
  useExactProperty?: boolean,
  allMessagesReplacedWith?: string
): void {
  shared.run(shared.exhaustiveIdentifierStrings, value => shared.accepts(schema, instanceFactory([value])))
  shared.run(shared.emptyArrays, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory([value]), useExactProperty ? property : `${property}[0]`, allMessagesReplacedWith || `does not match pattern "^[_a-z0-9]{6}$"`))
  shared.run(shared.nonStrings, value => shared.rejects(schema, instanceFactory([value]), useExactProperty ? property : `${property}[0]`, allMessagesReplacedWith || `is not of a type(s) string`))
  shared.run(shared.nonArrays, value => shared.rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) array`))
  describe(`multiple identifiers`, () => shared.accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `__this`])))
  describe(`duplicate identifiers`, () => shared.rejects(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `val_id`, `__this`]), property, allMessagesReplacedWith || `contains duplicate item`))
}

describe(`identifier set`, () => {
  test(identifierSet.schema, instance => instance, `instance`)
})
