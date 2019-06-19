import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityType from "./entity-type"
import * as shared from "./../shared.tests"
import * as labelTests from "./label.tests"
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
      singular: {},
      plural: {},
      label: [],
      columns: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`singular`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      plural: {},
      label: [],
      columns: {}
    }), property, `requires property "singular"`))
    shared.testLocalizedString(schema, value => instanceFactory({
      singular: value,
      plural: {},
      label: [],
      columns: {},
    }), `${property}.singular`)
  })
  describe(`plural`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      singular: {},
      label: [],
      columns: {}
    }), property, `requires property "plural"`))
    shared.testLocalizedString(schema, value => instanceFactory({
      singular: {},
      plural: value,
      label: [],
      columns: {},
    }), `${property}.plural`)
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
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
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
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
