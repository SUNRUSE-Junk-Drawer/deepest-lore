import "jasmine"
import * as jsonschema from "jsonschema"
import * as labelPart from "./label-part"
import * as sharedTests from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.exhaustiveIdentifierStrings, value => sharedTests.accepts(schema, instanceFactory([value])))
  sharedTests.run(sharedTests.emptyArrays, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory([value]), `${property}[0]`, `does not match pattern "^[_a-z0-9]{6}$"`))
  sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory([value]), `${property}[0]`, `is not of a type(s) string`))
  sharedTests.run(sharedTests.nonArrays, value => sharedTests.rejects(schema, instanceFactory(value), property, `is not of a type(s) array`))
  describe(`multiple identifiers`, () => sharedTests.accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `__this`])))
  describe(`duplicate identifiers`, () => sharedTests.accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `val_id`, `__this`])))
}

describe(`label part`, () => {
  test(labelPart.schema, instance => instance, `instance`)
})
