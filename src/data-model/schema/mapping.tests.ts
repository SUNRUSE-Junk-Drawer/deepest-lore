import "jasmine"
import * as jsonschema from "jsonschema"
import * as mapping from "./mapping"
import * as shared from "./../shared.tests"
import * as mappingKeySetTests from "./mapping-key-set.tests"
import * as columnSetTests from "./column-set.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(
    schema,
    instanceFactory({
      keys: {},
      columns: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`keys`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      columns: {}
    }), property, `requires property "keys"`))
    mappingKeySetTests.test(schema, value => instanceFactory({
      keys: value,
      columns: {}
    }), `${property}.keys`)
  })
  describe(`columns`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      keys: {}
    }), property, `requires property "columns"`))
    columnSetTests.test(schema, value => instanceFactory({
      keys: {},
      columns: value
    }), `${property}.columns`)
  })
}

describe(`mapping`, () => {
  test(mapping.schema, instance => instance, `instance`)
})
