import "jasmine"
import * as jsonschema from "jsonschema"
import * as data from "./data"
import * as sharedTests from "./../shared.tests"
import * as entityTypeDataFileSetTests from "./entity-type-data-file-set.tests"
import * as mappingDataFileSetTests from "./mapping-data-file-set.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(schema, instanceFactory({
    entityTypes: {},
    mappings: {},
    unexpected: {}
  }), property, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`entityTypes`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      mappings: {}
    }), property, `requires property "entityTypes"`))
    entityTypeDataFileSetTests.test(schema, instance => instanceFactory({
      entityTypes: instance,
      mappings: {}
    }), `${property}.entityTypes`)
  })
  describe(`mappings`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      entityTypes: {}
    }), property, `requires property "mappings"`))
    mappingDataFileSetTests.test(schema, instance => instanceFactory({
      entityTypes: {},
      mappings: instance
    }), `${property}.mappings`)
  })
}

describe(`data`, () => {
  test(data.schema, value => value, `instance`)
})
