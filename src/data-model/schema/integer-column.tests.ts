import "jasmine"
import * as integerColumn from "./integer-column"
import * as shared from "./../shared.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

describe(`integer column`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(
    integerColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(integerColumn.schema, {
    type: `integer`,
    label: {},
    minimum: 0,
    maximum: 0,
    default: 0,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => shared.rejects(integerColumn.schema, {
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance`, `requires property "type"`))
    shared.run(shared.nonStrings, value => shared.rejects(integerColumn.schema, {
      type: value,
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance.type`, `is not one of enum values: integer`))
    shared.run(
      shared.combinationOf(
        shared.strings,
        shared.setOf(`boolean`, `float`, `string`, `entityReference`)
      ),
      value => shared.rejects(integerColumn.schema, {
        type: value,
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }, `instance.type`, `is not one of enum values: integer`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(integerColumn.schema, {
      type: `integer`,
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance`, `requires property "label"`))
    sharedLocalizedStringTests.test(integerColumn.schema, instance => ({
      type: `integer`,
      label: instance,
      minimum: 0,
      maximum: 0,
      default: 0
    }), `instance.label`)
  })
  describe(`minimum`, () => {
    describe(`missing`, () => shared.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      maximum: 0,
      default: 0
    }, `instance`, `requires property "minimum"`))
    shared.run(shared.nonIntegers, value => shared.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }, `instance.minimum`, `is not of a type(s) integer`))
    shared.run(shared.integers, value => shared.accepts(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }))
  })
  describe(`maximum`, () => {
    describe(`missing`, () => shared.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      default: 0
    }, `instance`, `requires property "maximum"`))
    shared.run(shared.nonIntegers, value => shared.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }, `instance.maximum`, `is not of a type(s) integer`))
    shared.run(shared.integers, value => shared.accepts(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }))
  })
  describe(`default`, () => {
    describe(`missing`, () => shared.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0
    }, `instance`, `requires property "default"`))
    shared.run(shared.nonIntegers, value => shared.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }, `instance.default`, `is not of a type(s) integer`))
    shared.run(shared.integers, value => shared.accepts(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }))
  })
})
