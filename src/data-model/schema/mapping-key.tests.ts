import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingKey from "./mapping-key"
import * as sharedTests from "./../shared.tests"
import * as sharedIdentifierTests from "./../shared/identifier.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(
    schema,
    instanceFactory({
      entityType: `for_eg`,
      label: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`entityType`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      label: {}
    }), property, `requires property "entityType"`))
    sharedIdentifierTests.test(schema, value => instanceFactory({
      entityType: value,
      label: {}
    }), `${property}.entityType`)
  })
  describe(`label`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      entityType: `for_eg`
    }), property, `requires property "label"`))
    sharedLocalizedStringTests.test(schema, value => instanceFactory({
      entityType: `for_eg`,
      label: value
    }), `${property}.label`)
  })
}

describe(`mapping key`, () => {
  test(mappingKey.schema, instance => instance, `instance`)
})
