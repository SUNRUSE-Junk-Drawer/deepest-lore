import "jasmine"
import * as imported from "./imported"
import * as shared from "./shared.tests"

describe(`imported`, () => {
  shared.run(shared.nonObjects, value => shared.rejects(
    imported.schema, value, `instance`, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(imported.schema, {
    schema: {
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    },
    data: {
      entityTypes: {},
      mappings: {}
    },
    unexpected: {}
  }, `instance`, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`schema`, () => {
    describe(`missing`, () => shared.rejects(imported.schema, {
      data: {
        entityTypes: {},
        mappings: {}
      }
    }, `instance`, `requires property "schema"`))
    shared.testSchema(imported.schema, instance => ({
      schema: instance,
      data: {
        entityTypes: {},
        mappings: {}
      }
    }), `instance.schema`)
  })
  describe(`data`, () => {
    describe(`missing`, () => shared.rejects(imported.schema, {
      schema: {
        localizations: [],
        localizationName: {},
        title: {},
        description: {},
        entityTypes: {},
        mappings: {}
      }
    }, `instance`, `requires property "data"`))
    shared.testData(imported.schema, instance => ({
      schema: {
        localizations: [],
        localizationName: {},
        title: {},
        description: {},
        entityTypes: {},
        mappings: {}
      },
      data: instance
    }), `instance.data`)
  })
})
