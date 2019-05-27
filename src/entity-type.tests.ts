import "jasmine"
import * as entityType from "./entity-type"
import * as shared from "./shared.tests"

describe(`entity type`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(
    entityType.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(entityType.schema, {
    singular: {},
    plural: {},
    label: [],
    columns: {},
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`singular`, () => {
    describe(`missing`, () => shared.rejects(entityType.schema, {
      plural: {},
      label: [],
      columns: {}
    }, `instance`, `requires property "singular"`))
    shared.testLocalizedString(entityType.schema, instance => ({
      singular: instance,
      plural: {},
      label: [],
      columns: {},
    }), `instance.singular`)
  })
  describe(`plural`, () => {
    describe(`missing`, () => shared.rejects(entityType.schema, {
      singular: {},
      label: [],
      columns: {}
    }, `instance`, `requires property "plural"`))
    shared.testLocalizedString(entityType.schema, instance => ({
      singular: {},
      plural: instance,
      label: [],
      columns: {},
    }), `instance.plural`)
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(entityType.schema, {
      singular: {},
      plural: {},
      columns: {}
    }, `instance`, `requires property "label"`))
    shared.testLabel(entityType.schema, instance => ({
      singular: {},
      plural: {},
      label: instance,
      columns: {},
    }), `instance.label`)
  })
  describe(`columns`, () => {
    describe(`missing`, () => shared.rejects(entityType.schema, {
      singular: {},
      plural: {},
      label: []
    }, `instance`, `requires property "columns"`))
    shared.testColumnSet(entityType.schema, instance => ({
      singular: {},
      plural: {},
      label: [],
      columns: instance,
    }), `instance.columns`)
  })
})
