import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityType from "./entity-type"
import * as sharedTests from "./../shared.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"
import * as labelTests from "./label.tests"
import * as columnSetTests from "./column-set.tests"

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
      singular: {},
      plural: {},
      label: [],
      columns: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`singular`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      plural: {},
      label: [],
      columns: {}
    }), property, `requires property "singular"`))
    sharedLocalizedStringTests.test(schema, value => instanceFactory({
      singular: value,
      plural: {},
      label: [],
      columns: {},
    }), `${property}.singular`)
  })
  describe(`plural`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      singular: {},
      label: [],
      columns: {}
    }), property, `requires property "plural"`))
    sharedLocalizedStringTests.test(schema, value => instanceFactory({
      singular: {},
      plural: value,
      label: [],
      columns: {},
    }), `${property}.plural`)
  })
  describe(`label`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      singular: {},
      plural: {},
      columns: {}
    }), property, `requires property "label"`))
    labelTests.test(schema, value => instanceFactory({
      singular: {},
      plural: {},
      label: value,
      columns: {},
    }), `${property}.label`)
  })
  describe(`columns`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      singular: {},
      plural: {},
      label: []
    }), property, `requires property "columns"`))
    columnSetTests.test(schema, value => instanceFactory({
      singular: {},
      plural: {},
      label: [],
      columns: value,
    }), `${property}.columns`)
  })
}

describe(`entity type`, () => {
  test(entityType.schema, value => value, `instance`)
})
