import "jasmine"
import * as schema from "./schema"
import * as shared from "./shared.tests"

describe(`schema`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(schema.schema, value, `instance`, `is not of a type(s) object`))
  describe(`unexpected properties`, () => shared.rejects(schema.schema, {
    localizations: [],
    localizationName: {},
    title: {},
    description: {},
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`localizations`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizationName: {},
      title: {},
      description: {}
    }, `instance`, `requires property "localizations"`))
    shared.testIdentifierSet(schema.schema, instance => ({
      localizations: instance,
      localizationName: {},
      title: {},
      description: {}
    }), `instance.localizations`)
  })
  describe(`localizationName`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      title: {},
      description: {}
    }, `instance`, `requires property "localizationName"`))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: instance,
      title: {},
      description: {}
    }), `instance.localizationName`)
  })
  describe(`title`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      description: {}
    }, `instance`, `requires property "title"`))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: instance,
      description: {}
    }), `instance.title`)
  })
  describe(`description`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      title: {}
    }, `instance`, `requires property "description"`))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: {},
      description: instance
    }), `instance.description`)
  })
})
