import "jasmine"
import * as jsonschema from "jsonschema"
import * as schema from "./schema"
import * as shared from "./../shared.tests"
import * as entityTypeSetTests from "./entity-type-set.tests"
import * as mappingSetTests from "./mapping-set.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => shared.rejects(schema, instanceFactory({
    localizations: [],
    localizationName: {},
    title: {},
    description: {},
    entityTypes: {},
    mappings: {},
    unexpected: {}
  }), property, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`localizations`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "localizations"`))
    shared.testIdentifierSet(schema, instance => instanceFactory({
      localizations: instance,
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.localizations`)
  })
  describe(`localizationName`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      localizations: [],
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "localizationName"`))
    shared.testLocalizedString(schema, instance => instanceFactory({
      localizations: [],
      localizationName: instance,
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.localizationName`)
  })
  describe(`title`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "title"`))
    shared.testLocalizedString(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: instance,
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.title`)
  })
  describe(`description`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "description"`))
    shared.testLocalizedString(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      description: instance,
      mappings: {}
    }), `${property}.description`)
  })
  describe(`entityTypes`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      mappings: {}
    }), property, `requires property "entityTypes"`))
    entityTypeSetTests.test(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: instance,
      mappings: {}
    }), `${property}.entityTypes`)
  })
  describe(`mappings`, () => {
    describe(`missing`, () => shared.rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {}
    }), property, `requires property "mappings"`))
    mappingSetTests.test(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: instance
    }), `${property}.mappings`)
  })
}

describe(`schema`, () => {
  test(schema.schema, value => value, `instance`)
})
