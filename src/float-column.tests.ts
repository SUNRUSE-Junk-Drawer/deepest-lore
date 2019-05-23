import "jasmine"
import * as floatColumn from "./float-column"
import * as shared from "./shared.tests"

describe(`float column`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(
    floatColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(floatColumn.schema, {
    type: `float`,
    label: {},
    minimum: 0,
    maximum: 0,
    default: 0,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => shared.rejects(floatColumn.schema, {
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance`, `requires property "type"`))
    shared.run(shared.nonStrings, value => shared.rejects(floatColumn.schema, {
      type: value,
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance.type`, `is not one of enum values: float`))
    shared.run(
      shared.combinationOf(
        shared.strings,
        shared.setOf(`boolean`, `integer`, `string`, `entityReference`)
      ),
      value => shared.rejects(floatColumn.schema, {
        type: value,
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }, `instance.type`, `is not one of enum values: float`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(floatColumn.schema, {
      type: `float`,
      minimum: 0,
      maximum: 0,
      default: 0
    }, `instance`, `requires property "label"`))
    shared.testLocalizedString(floatColumn.schema, instance => ({
      type: `float`,
      label: instance,
      minimum: 0,
      maximum: 0,
      default: 0
    }), `instance.label`)
  })
  describe(`minimum`, () => {
    describe(`missing`, () => shared.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      maximum: 0,
      default: 0
    }, `instance`, `requires property "minimum"`))
    shared.run(shared.nonFloats, value => shared.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }, `instance.minimum`, `is not of a type(s) number`))
    shared.run(shared.floats, value => shared.accepts(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: value,
      maximum: 0,
      default: 0
    }))
  })
  describe(`maximum`, () => {
    describe(`missing`, () => shared.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      default: 0
    }, `instance`, `requires property "maximum"`))
    shared.run(shared.nonFloats, value => shared.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }, `instance.maximum`, `is not of a type(s) number`))
    shared.run(shared.floats, value => shared.accepts(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: value,
      default: 0
    }))
  })
  describe(`default`, () => {
    describe(`missing`, () => shared.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: 0
    }, `instance`, `requires property "default"`))
    shared.run(shared.nonFloats, value => shared.rejects(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }, `instance.default`, `is not of a type(s) number`))
    shared.run(shared.floats, value => shared.accepts(floatColumn.schema, {
      type: `float`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: value
    }))
  })
})
