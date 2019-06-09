import "jasmine"
import * as entityReferenceColumn from "./entity-reference-column"
import * as shared from "./../shared.tests"

describe(`entity reference column`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(
    entityReferenceColumn.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(entityReferenceColumn.schema, {
    type: `entityReference`,
    label: {},
    entityType: `enttyp`,
    default: `defalt`,
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`type`, () => {
    describe(`missing`, () => shared.rejects(entityReferenceColumn.schema, {
      label: {},
      entityType: `enttyp`,
      default: `defalt`
    }, `instance`, `requires property "type"`))
    shared.run(shared.nonStrings, value => shared.rejects(entityReferenceColumn.schema, {
      type: value,
      label: {},
      entityType: `enttyp`,
      default: `defalt`
    }, `instance.type`, `is not one of enum values: entityReference`))
    shared.run(
      shared.combinationOf(
        shared.strings,
        shared.setOf(`boolean`, `integer`, `float`, `string`)
      ),
      value => shared.rejects(entityReferenceColumn.schema, {
        type: value,
        label: {},
        entityType: `enttyp`,
        default: `defalt`
      }, `instance.type`, `is not one of enum values: entityReference`)
    )
  })
  describe(`label`, () => {
    describe(`missing`, () => shared.rejects(entityReferenceColumn.schema, {
      type: `entityReference`,
      entityType: `enttyp`,
      default: `defalt`
    }, `instance`, `requires property "label"`))
    shared.testLocalizedString(entityReferenceColumn.schema, instance => ({
      type: `entityReference`,
      label: instance,
      entityType: `enttyp`,
      default: `defalt`
    }), `instance.label`)
  })
  describe(`entityType`, () => {
    describe(`missing`, () => shared.rejects(entityReferenceColumn.schema, {
      type: `entityReference`,
      label: {},
      default: `defalt`
    }, `instance`, `requires property "entityType"`))
    shared.testIdentifier(entityReferenceColumn.schema, value => ({
      type: `entityReference`,
      label: {},
      entityType: value,
      default: `defalt`
    }), `instance.entityType`)
  })
  describe(`default`, () => {
    describe(`missing`, () => shared.rejects(entityReferenceColumn.schema, {
      type: `entityReference`,
      label: {},
      entityType: `enttyp`
    }, `instance`, `requires property "default"`))
    shared.testIdentifier(entityReferenceColumn.schema, value => ({
      type: `entityReference`,
      label: {},
      entityType: `enttyp`,
      default: value
    }), `instance.default`)
  })
})
