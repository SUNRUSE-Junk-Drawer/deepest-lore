import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingKey from "./mapping-key"
import * as shared from "./../shared.tests"

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
      entityType: `for_eg`,
      label: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`entityType`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      label: {}
    }), property, `requires property "entityType"`))
    shared.testIdentifier(schema, value => instanceFactory({
      entityType: value,
      label: {}
    }), `${property}.entityType`)
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      entityType: `for_eg`
    }), property, `requires property "label"`))
    shared.testLocalizedString(schema, value => instanceFactory({
      entityType: `for_eg`,
      label: value
    }), `${property}.label`)
  })
}

describe(`mapping key`, () => {
  test(mappingKey.schema, instance => instance, `instance`)
})
