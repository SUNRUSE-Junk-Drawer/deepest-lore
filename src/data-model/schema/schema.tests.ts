import "jasmine"
import * as jsonschema from "jsonschema"
import * as schema from "./schema"
import * as sharedTests from "./../shared.tests"
import * as sharedIdentifierSetTests from "./../shared/identifier-set.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"
import * as entityTypeSetTests from "./entity-type-set.tests"
import * as mappingSetTests from "./mapping-set.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => sharedTests.rejects(schema, instanceFactory({
    localizations: [],
    localizationName: {},
    title: {},
    description: {},
    entityTypes: {},
    mappings: {},
    unexpected: {}
  }), property, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`localizations`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "localizations"`))
    sharedIdentifierSetTests.test(schema, instance => instanceFactory({
      localizations: instance,
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.localizations`)
  })
  describe(`localizationName`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      localizations: [],
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "localizationName"`))
    sharedLocalizedStringTests.test(schema, instance => instanceFactory({
      localizations: [],
      localizationName: instance,
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.localizationName`)
  })
  describe(`title`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "title"`))
    sharedLocalizedStringTests.test(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: instance,
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.title`)
  })
  describe(`description`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "description"`))
    sharedLocalizedStringTests.test(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      description: instance,
      mappings: {}
    }), `${property}.description`)
  })
  describe(`entityTypes`, () => {
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
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
    describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
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
