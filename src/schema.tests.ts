import "jasmine"
import * as schema from "./schema"
import * as shared from "./shared.tests"

describe(`schema`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(schema.schema, value))
  describe(`unexpected properties`, () => shared.rejects(schema.schema, {
    localizations: [],
    localizationName: {},
    title: {},
    description: {},
    unexpected: {}
  }))
  describe(`localizations`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizationName: {},
      title: {},
      description: {}
    }))
    shared.testIdentifierSet(schema.schema, instance => ({
      localizations: instance,
      localizationName: {},
      title: {},
      description: {}
    }))
  })
  describe(`localizationName`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      title: {},
      description: {}
    }))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: instance,
      title: {},
      description: {}
    }))
  })
  describe(`title`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      description: {}
    }))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: instance,
      description: {}
    }))
  })
  describe(`description`, () => {
    describe(`missing`, () => shared.rejects(schema.schema, {
      localizations: [],
      localizationName: {},
      title: {}
    }))
    shared.testLocalizedString(schema.schema, instance => ({
      localizations: [],
      localizationName: {},
      title: {},
      description: instance
    }))
  })
})
