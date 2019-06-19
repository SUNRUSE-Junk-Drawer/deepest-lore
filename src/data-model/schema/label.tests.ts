import "jasmine"
import * as jsonschema from "jsonschema"
import * as label from "./label"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonArrays, value => shared.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`
  ))
  shared.run(shared.emptyArrays, value => shared.accepts(schema, instanceFactory(value)))
  shared.testLabelPart(schema, value => instanceFactory([value]), `${property}[0]`)
  describe(`example`, () => shared.accepts(schema, instanceFactory([
    [`for_eg`, `la_run`, `mu_par`],
    [],
    [`just_1`],
    [`long_w`, `2thetp`, `wanna_`, `depest`, `lore__`]
  ])))
}

describe(`label`, () => {
  test(label.schema, value => value, `instance`)
})
