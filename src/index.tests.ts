import "jasmine"
import * as identifier from "./identifier"
import * as identifierSet from "./identifier-set"
import * as localizedString from "./localized-string"
import * as booleanColumn from "./boolean-column"
import * as stringColumn from "./string-column"
import * as entityReferenceColumn from "./entity-reference-column"
import * as integerColumn from "./integer-column"
import * as floatColumn from "./float-column"
import * as column from "./column"
import * as labelPart from "./label-part"
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
  describe(`integer column`, () => {
    it(`schema`, () => expect(index.integerColumn).toBe(integerColumn.schema))
  })
  describe(`float column`, () => {
    it(`schema`, () => expect(index.floatColumn).toBe(floatColumn.schema))
  })
  describe(`column`, () => {
    it(`schema`, () => expect(index.column).toBe(column.schema))
  })
  describe(`label part`, () => {
    it(`schema`, () => expect(index.labelPart).toBe(labelPart.schema))
  })
  describe(`schema`, () => {
    it(`schema`, () => expect(index.schema).toBe(schema.schema))
  })
})
