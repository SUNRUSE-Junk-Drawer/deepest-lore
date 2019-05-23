import "jasmine"
import * as identifier from "./identifier"
import * as identifierSet from "./identifier-set"
import * as localizedString from "./localized-string"
import * as booleanColumn from "./boolean-column"
import * as stringColumn from "./string-column"
import * as entityReferenceColumn from "./entity-reference-column"
import * as schema from "./schema"
import * as index from "./index"

describe(`index`, () => {
  describe(`identifier`, () => {
    it(`schema`, () => expect(index.identifier).toBe(identifier.schema))
  })
  describe(`identifier set`, () => {
    it(`schema`, () => expect(index.identifierSet).toBe(identifierSet.schema))
  })
  describe(`localized string`, () => {
    it(`schema`, () => expect(index.localizedString).toBe(localizedString.schema))
  })
  describe(`boolean column`, () => {
    it(`schema`, () => expect(index.booleanColumn).toBe(booleanColumn.schema))
  })
  describe(`string column`, () => {
    it(`schema`, () => expect(index.stringColumn).toBe(stringColumn.schema))
  })
  describe(`entity reference column`, () => {
    it(`schema`, () => expect(index.entityReferenceColumn)
      .toBe(entityReferenceColumn.schema))
  })
  describe(`schema`, () => {
    it(`schema`, () => expect(index.schema).toBe(schema.schema))
  })
})
