import "jasmine"
import * as stringColumn from "./string-column"
import * as shared from "./../shared.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

describe(`string column`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(
    stringColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(stringColumn.schema, {
    type: `string`,
    label: {},
    maximumLength: 1,
    default: {},
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => shared.rejects(stringColumn.schema, {
      label: {},
      maximumLength: 1,
      default: {},
    }, `instance`, `requires property "type"`))
    shared.run(shared.nonStrings, value => shared.rejects(stringColumn.schema, {
      type: value,
      label: {},
      maximumLength: 1,
      default: {},
    }, `instance.type`, `is not one of enum values: string`))
    shared.run(
      shared.combinationOf(
        shared.strings,
        shared.setOf(`boolean`, `integer`, `float`, `entityReference`)
      ),
      value => shared.rejects(stringColumn.schema, {
        type: value,
        label: {},
        maximumLength: 1,
        default: {},
      }, `instance.type`, `is not one of enum values: string`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(stringColumn.schema, {
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
    describe(`missing`, () => shared.rejects(stringColumn.schema, {
      type: `string`,
      label: {},
      default: {}
    }, `instance`, `requires property "maximumLength"`))
    shared.run(shared.nonFloats, value => shared.rejects(stringColumn.schema, {
      type: `string`,
      label: {},
      maximumLength: value,
      default: {}
    }, `instance.maximumLength`, `is not of a type(s) integer`))
    shared.run(
      shared.combinationOf(shared.negativeFloats),
      value => shared.rejectsMany(stringColumn.schema, {
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
    shared.run(
      shared.combinationOf(shared.zeroes, shared.negativeIntegers),
      value => shared.rejects(stringColumn.schema, {
        type: `string`,
        label: {},
        maximumLength: value,
        default: {}
      }, `instance.maximumLength`, `must have a minimum value of 1`)
    )
    shared.run(shared.positiveIntegers, value => shared.accepts(stringColumn.schema, {
      type: `string`,
      label: {},
      maximumLength: value,
      default: {}
    }))
  })
  describe(`default`, () => {
    describe(`missing`, () => shared.rejects(stringColumn.schema, {
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
