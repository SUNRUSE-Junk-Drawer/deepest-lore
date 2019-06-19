import "jasmine"
import * as entityReferenceColumn from "./entity-reference-column"
import * as sharedTests from "./../shared.tests"
import * as sharedIdentifierTests from "./../shared/identifier.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

describe(`entity reference column`, () => {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    entityReferenceColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(entityReferenceColumn.schema, {
    type: `entityReference`,
    label: {},
    entityType: `enttyp`,
    default: `defalt`,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => sharedTests.rejects(entityReferenceColumn.schema, {
      label: {},
      entityType: `enttyp`,
      default: `defalt`
    }, `instance`, `requires property "type"`))
    sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(entityReferenceColumn.schema, {
      type: value,
      label: {},
      entityType: `enttyp`,
      default: `defalt`
    }, `instance.type`, `is not one of enum values: entityReference`))
    sharedTests.run(
      sharedTests.combinationOf(
        sharedTests.strings,
        sharedTests.setOf(`boolean`, `integer`, `float`, `string`)
      ),
      value => sharedTests.rejects(entityReferenceColumn.schema, {
        type: value,
        label: {},
        entityType: `enttyp`,
        default: `defalt`
      }, `instance.type`, `is not one of enum values: entityReference`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => sharedTests.rejects(entityReferenceColumn.schema, {
      type: `entityReference`,
      entityType: `enttyp`,
      default: `defalt`
    }, `instance`, `requires property "label"`))
    sharedLocalizedStringTests.test(entityReferenceColumn.schema, instance => ({
      type: `entityReference`,
      label: instance,
      entityType: `enttyp`,
      default: `defalt`
    }), `instance.label`)
  })
  describe(`entityType`, () => {
    describe(`missing`, () => sharedTests.rejects(entityReferenceColumn.schema, {
      type: `entityReference`,
      label: {},
      default: `defalt`
    }, `instance`, `requires property "entityType"`))
    sharedIdentifierTests.test(entityReferenceColumn.schema, value => ({
      type: `entityReference`,
      label: {},
      entityType: value,
      default: `defalt`
    }), `instance.entityType`)
  })
  describe(`default`, () => {
    describe(`missing`, () => sharedTests.rejects(entityReferenceColumn.schema, {
      type: `entityReference`,
      label: {},
      entityType: `enttyp`
    }, `instance`, `requires property "default"`))
    sharedIdentifierTests.test(entityReferenceColumn.schema, value => ({
      type: `entityReference`,
      label: {},
      entityType: `enttyp`,
      default: value
    }), `instance.default`)
  })
})
