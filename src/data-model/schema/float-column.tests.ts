import "jasmine"
import * as floatColumn from "./float-column"
import * as sharedTests from "./../shared.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

describe(`float column`, () => {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    floatColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(floatColumn.schema, {
    type: `float`,
    label: {},
    minimum: 0,
    maximum: 0,
    default: 0,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => sharedTests.rejects(floatColumn.schema, {
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance`, `requires property "type"`))
    sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(floatColumn.schema, {
      type: value,
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance.type`, `is not one of enum values: float`))
    sharedTests.run(
      sharedTests.combinationOf(
        sharedTests.strings,
        sharedTests.setOf(`boolean`, `integer`, `string`, `entityReference`)
      ),
      value => sharedTests.rejects(floatColumn.schema, {
        type: value,
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }, `instance.type`, `is not one of enum values: float`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => sharedTests.rejects(floatColumn.schema, {
      type: `float`,
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance`, `requires property "label"`))
    sharedLocalizedStringTests.test(floatColumn.schema, instance => ({
      type: `float`,
      label: instance,
      minimum: 0,
      maximum: 0,
      default: 0
    }), `instance.label`)
  })
  describe(`minimum`, () => {
    describe(`missing`, () => sharedTests.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      maximum: 0,
      default: 0
    }, `instance`, `requires property "minimum"`))
    sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }, `instance.minimum`, `is not of a type(s) number`))
    sharedTests.run(sharedTests.floats, value => sharedTests.accepts(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }))
  })
  describe(`maximum`, () => {
    describe(`missing`, () => sharedTests.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      default: 0
    }, `instance`, `requires property "maximum"`))
    sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }, `instance.maximum`, `is not of a type(s) number`))
    sharedTests.run(sharedTests.floats, value => sharedTests.accepts(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }))
  })
  describe(`default`, () => {
    describe(`missing`, () => sharedTests.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: 0
    }, `instance`, `requires property "default"`))
    sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }, `instance.default`, `is not of a type(s) number`))
    sharedTests.run(sharedTests.floats, value => sharedTests.accepts(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }))
  })
})
