import "jasmine"
import * as booleanColumn from "./boolean-column"
import * as shared from "./../shared.tests"

describe(`boolean column`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(
    booleanColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(booleanColumn.schema, {
    type: `boolean`,
    label: {},
    default: false,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => shared.rejects(booleanColumn.schema, {
      label: {},
      default: false
    }, `instance`, `requires property "type"`))
    shared.run(shared.nonStrings, value => shared.rejects(booleanColumn.schema, {
      type: value,
      label: {},
      default: false
    }, `instance.type`, `is not one of enum values: boolean`))
    shared.run(
      shared.combinationOf(
        shared.strings,
        shared.setOf(`integer`, `float`, `string`, `entityReference`)
      ),
      value => shared.rejects(booleanColumn.schema, {
        type: value,
        label: {},
        default: false
      }, `instance.type`, `is not one of enum values: boolean`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(booleanColumn.schema, {
      type: `boolean`,
      default: false
    }, `instance`, `requires property "label"`))
    shared.testLocalizedString(booleanColumn.schema, instance => ({
      type: `boolean`,
      label: instance,
      default: false
    }), `instance.label`)
  })
  describe(`default`, () => {
    describe(`missing`, () => shared.rejects(booleanColumn.schema, {
      type: `boolean`,
      label: {}
    }, `instance`, `requires property "default"`))
    shared.run(shared.nonBooleans, value => shared.rejects(booleanColumn.schema, {
      type: `boolean`,
      label: {},
      default: value
    }, `instance.default`, `is not of a type(s) boolean`))
    shared.run(shared.booleans, value => shared.accepts(booleanColumn.schema, {
      type: `boolean`,
      label: {},
      default: value
    }))
  })
})
