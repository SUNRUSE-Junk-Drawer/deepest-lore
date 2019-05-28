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
    entityTypes: {},
    mappings: {},
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`localizations`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }, `instance`, `requires property "localizations"`))
    shared.testIdentifierSet(schema.schema, instance => ({
      localizations: instance,
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `instance.localizations`)
  })
  describe(`localizationName`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }, `instance`, `requires property "localizationName"`))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: instance,
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `instance.localizationName`)
  })
  describe(`title`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }, `instance`, `requires property "title"`))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: instance,
      description: {},
      entityTypes: {},
      mappings: {}
    }), `instance.title`)
  })
  describe(`description`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      mappings: {}
    }, `instance`, `requires property "description"`))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      description: instance,
      mappings: {}
    }), `instance.description`)
  })
  describe(`entityTypes`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      mappings: {}
    }, `instance`, `requires property "entityTypes"`))
    shared.testEntityTypeSet(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: instance,
      mappings: {}
    }), `instance.entityTypes`)
  })
  describe(`mappings`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {}
    }, `instance`, `requires property "mappings"`))
    shared.testMappingSet(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: instance
    }), `instance.mappings`)
  })
})
