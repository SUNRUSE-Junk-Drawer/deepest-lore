import "jasmine"
import * as integerColumn from "./integer-column"
import * as sharedTests from "./../shared.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

describe(`integer column`, () => {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    integerColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(integerColumn.schema, {
    type: `integer`,
    label: {},
    minimum: 0,
    maximum: 0,
    default: 0,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => sharedTests.rejects(integerColumn.schema, {
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance`, `requires property "type"`))
    sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(integerColumn.schema, {
      type: value,
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance.type`, `is not one of enum values: integer`))
    sharedTests.run(
      sharedTests.combinationOf(
        sharedTests.strings,
        sharedTests.setOf(`boolean`, `float`, `string`, `entityReference`)
      ),
      value => sharedTests.rejects(integerColumn.schema, {
        type: value,
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }, `instance.type`, `is not one of enum values: integer`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => sharedTests.rejects(integerColumn.schema, {
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
    describe(`missing`, () => sharedTests.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      maximum: 0,
      default: 0
    }, `instance`, `requires property "minimum"`))
    sharedTests.run(sharedTests.nonIntegers, value => sharedTests.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }, `instance.minimum`, `is not of a type(s) integer`))
    sharedTests.run(sharedTests.integers, value => sharedTests.accepts(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }))
  })
  describe(`maximum`, () => {
    describe(`missing`, () => sharedTests.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      default: 0
    }, `instance`, `requires property "maximum"`))
    sharedTests.run(sharedTests.nonIntegers, value => sharedTests.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }, `instance.maximum`, `is not of a type(s) integer`))
    sharedTests.run(sharedTests.integers, value => sharedTests.accepts(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }))
  })
  describe(`default`, () => {
    describe(`missing`, () => sharedTests.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0
    }, `instance`, `requires property "default"`))
    sharedTests.run(sharedTests.nonIntegers, value => sharedTests.rejects(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }, `instance.default`, `is not of a type(s) integer`))
    sharedTests.run(sharedTests.integers, value => sharedTests.accepts(integerColumn.schema, {
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }))
  })
})
