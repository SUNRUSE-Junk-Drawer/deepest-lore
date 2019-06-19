import "jasmine"
import * as jsonschema from "jsonschema"
import * as label from "./label"
import * as sharedTests from "./../shared.tests"
import * as labelPartTests from "./label-part.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonArrays, value => sharedTests.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`
  ))
  sharedTests.run(sharedTests.emptyArrays, value => sharedTests.accepts(schema, instanceFactory(value)))
  labelPartTests.test(schema, value => instanceFactory([value]), `${property}[0]`)
  describe(`example`, () => sharedTests.accepts(schema, instanceFactory([
    [`for_eg`, `la_run`, `mu_par`],
    [],
    [`just_1`],
    [`long_w`, `2thetp`, `wanna_`, `depest`, `lore__`]
  ])))
}

describe(`label`, () => {
  test(label.schema, value => value, `instance`)
})
