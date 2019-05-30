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
import * as columnSet from "./column-set"
import * as labelPart from "./label-part"
import * as label from "./label"
import * as entityType from "./entity-type"
import * as entityTypeSet from "./entity-type-set"
import * as mappingKey from "./mapping-key"
import * as mappingKeySet from "./mapping-key-set"
import * as mappingSet from "./mapping-set"
import * as schema from "./schema"
import * as entityTypeDataFileRow from "./entity-type-data-file-row"
import * as entityTypeDataFile from "./entity-type-data-file"
import * as entityTypeDataFileSet from "./entity-type-data-file-set"
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
  describe(`column set`, () => {
    it(`schema`, () => expect(index.columnSet).toBe(columnSet.schema))
  })
  describe(`label part`, () => {
    it(`schema`, () => expect(index.labelPart).toBe(labelPart.schema))
  })
  describe(`label`, () => {
    it(`schema`, () => expect(index.label).toBe(label.schema))
  })
  describe(`entity type`, () => {
    it(`schema`, () => expect(index.entityType).toBe(entityType.schema))
  })
  describe(`entity type set`, () => {
    it(`schema`, () => expect(index.entityTypeSet).toBe(entityTypeSet.schema))
  })
  describe(`mapping key`, () => {
    it(`schema`, () => expect(index.mappingKey).toBe(mappingKey.schema))
  })
  describe(`mapping key set`, () => {
    it(`schema`, () => expect(index.mappingKeySet).toBe(mappingKeySet.schema))
  })
  describe(`mapping set`, () => {
    it(`schema`, () => expect(index.mappingSet).toBe(mappingSet.schema))
  })
  describe(`schema`, () => {
    it(`schema`, () => expect(index.schema).toBe(schema.schema))
  })
  describe(`entity type data file row`, () => it(`schema`,
    () => expect(index.entityTypeDataFileRow)
      .toBe(entityTypeDataFileRow.schema)))
  describe(`entity type data file`, () => it(`schema`,
    () => expect(index.entityTypeDataFile).toBe(entityTypeDataFile.schema)))
  describe(`entity type data file set`, () => it(`schema`,
    () => expect(index.entityTypeDataFileSet).toBe(entityTypeDataFileSet.schema)))
})
