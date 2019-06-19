import "jasmine"
import * as stringColumn from "./string-column"
import * as sharedTests from "./../shared.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

describe(`string column`, () => {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    stringColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(stringColumn.schema, {
    type: `string`,
    label: {},
    maximumLength: 1,
    default: {},
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => sharedTests.rejects(stringColumn.schema, {
      label: {},
      maximumLength: 1,
      default: {},
    }, `instance`, `requires property "type"`))
    sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(stringColumn.schema, {
      type: value,
      label: {},
      maximumLength: 1,
      default: {},
    }, `instance.type`, `is not one of enum values: string`))
    sharedTests.run(
      sharedTests.combinationOf(
        sharedTests.strings,
        sharedTests.setOf(`boolean`, `integer`, `float`, `entityReference`)
      ),
      value => sharedTests.rejects(stringColumn.schema, {
        type: value,
        label: {},
        maximumLength: 1,
        default: {},
      }, `instance.type`, `is not one of enum values: string`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => sharedTests.rejects(stringColumn.schema, {
      type: `string`,
      maximumLength: 1,
      default: {},
    }, `instance`, `requires property "label"`))
    sharedLocalizedStringTests.test(stringColumn.schema, instance => ({
      type: `string`,
      label: instance,
      maximumLength: 1,
      default: {},
    }), `instance.label`)
  })
  describe(`maximumLength`, () => {
    describe(`missing`, () => sharedTests.rejects(stringColumn.schema, {
      type: `string`,
      label: {},
      default: {}
    }, `instance`, `requires property "maximumLength"`))
    sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(stringColumn.schema, {
      type: `string`,
      label: {},
      maximumLength: value,
      default: {}
    }, `instance.maximumLength`, `is not of a type(s) integer`))
    sharedTests.run(
      sharedTests.combinationOf(sharedTests.negativeFloats),
      value => sharedTests.rejectsMany(stringColumn.schema, {
        type: `string`,
        label: {},
        maximumLength: value,
        default: {}
      }, [{
        property: `instance.maximumLength`,
        message: `is not of a type(s) integer`
      }, {
        property: `instance.maximumLength`,
        message: `must have a minimum value of 1`
      }])
    )
    sharedTests.run(
      sharedTests.combinationOf(sharedTests.zeroes, sharedTests.negativeIntegers),
      value => sharedTests.rejects(stringColumn.schema, {
        type: `string`,
        label: {},
        maximumLength: value,
        default: {}
      }, `instance.maximumLength`, `must have a minimum value of 1`)
    )
    sharedTests.run(sharedTests.positiveIntegers, value => sharedTests.accepts(stringColumn.schema, {
      type: `string`,
      label: {},
      maximumLength: value,
      default: {}
    }))
  })
  describe(`default`, () => {
    describe(`missing`, () => sharedTests.rejects(stringColumn.schema, {
      type: `string`,
      label: {},
      maximumLength: 1
    }, `instance`, `requires property "default"`))
    sharedLocalizedStringTests.test(stringColumn.schema, value => ({
      type: `string`,
      label: {},
      maximumLength: 1,
      default: value
    }), `instance.default`)
  })
})
