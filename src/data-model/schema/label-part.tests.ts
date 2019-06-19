import "jasmine"
import * as jsonschema from "jsonschema"
import * as labelPart from "./label-part"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.exhaustiveIdentifierStrings, value => shared.accepts(schema, instanceFactory([value])))
  shared.run(shared.emptyArrays, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory([value]), `${property}[0]`, `does not match pattern "^[_a-z0-9]{6}$"`))
  shared.run(shared.nonStrings, value => shared.rejects(schema, instanceFactory([value]), `${property}[0]`, `is not of a type(s) string`))
  shared.run(shared.nonArrays, value => shared.rejects(schema, instanceFactory(value), property, `is not of a type(s) array`))
  describe(`multiple identifiers`, () => shared.accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `__this`])))
  describe(`duplicate identifiers`, () => shared.accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `val_id`, `__this`])))
}

describe(`label part`, () => {
  test(labelPart.schema, instance => instance, `instance`)
})
