import "jasmine"
import * as booleanColumn from "./boolean-column"
import * as sharedTests from "./../shared.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

describe(`boolean column`, () => {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    booleanColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(booleanColumn.schema, {
    type: `boolean`,
    label: {},
    default: false,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => sharedTests.rejects(booleanColumn.schema, {
      label: {},
      default: false
    }, `instance`, `requires property "type"`))
    sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(booleanColumn.schema, {
      type: value,
      label: {},
      default: false
    }, `instance.type`, `is not one of enum values: boolean`))
    sharedTests.run(
      sharedTests.combinationOf(
        sharedTests.strings,
        sharedTests.setOf(`integer`, `float`, `string`, `entityReference`)
      ),
      value => sharedTests.rejects(booleanColumn.schema, {
        type: value,
        label: {},
        default: false
      }, `instance.type`, `is not one of enum values: boolean`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => sharedTests.rejects(booleanColumn.schema, {
      type: `boolean`,
      default: false
    }, `instance`, `requires property "label"`))
    sharedLocalizedStringTests.test(booleanColumn.schema, instance => ({
      type: `boolean`,
      label: instance,
      default: false
    }), `instance.label`)
  })
  describe(`default`, () => {
    describe(`missing`, () => sharedTests.rejects(booleanColumn.schema, {
      type: `boolean`,
      label: {}
    }, `instance`, `requires property "default"`))
    sharedTests.run(sharedTests.nonBooleans, value => sharedTests.rejects(booleanColumn.schema, {
      type: `boolean`,
      label: {},
      default: value
    }, `instance.default`, `is not of a type(s) boolean`))
    sharedTests.run(sharedTests.booleans, value => sharedTests.accepts(booleanColumn.schema, {
      type: `boolean`,
      label: {},
      default: value
    }))
  })
})
