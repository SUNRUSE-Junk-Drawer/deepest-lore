import "jasmine"
import * as identifier from "./data-model/shared/identifier"
import * as identifierSet from "./data-model/shared/identifier-set"
import * as localizedString from "./data-model/shared/localized-string"
import * as booleanColumn from "./data-model/schema/boolean-column"
import * as stringColumn from "./data-model/schema/string-column"
import * as entityReferenceColumn from "./data-model/schema/entity-reference-column"
import * as integerColumn from "./data-model/schema/integer-column"
import * as floatColumn from "./data-model/schema/float-column"
import * as column from "./data-model/schema/column"
import * as columnSet from "./data-model/schema/column-set"
import * as labelPart from "./data-model/schema/label-part"
import * as label from "./data-model/schema/label"
import * as entityType from "./data-model/schema/entity-type"
import * as entityTypeSet from "./data-model/schema/entity-type-set"
import * as mappingKey from "./data-model/schema/mapping-key"
import * as mappingKeySet from "./data-model/schema/mapping-key-set"
import * as mappingSet from "./data-model/schema/mapping-set"
import * as schema from "./data-model/schema/schema"
import * as entityTypeDataFileRow from "./data-model/csv/entity-type-data-file-row"
import * as entityTypeDataFile from "./data-model/csv/entity-type-data-file"
import * as entityTypeDataFileSet from "./data-model/csv/entity-type-data-file-set"
import * as mappingDataFileRow from "./data-model/csv/mapping-data-file-row"
import * as mappingDataFile from "./data-model/csv/mapping-data-file"
import * as mappingDataFileSet from "./data-model/csv/mapping-data-file-set"
import * as data from "./data-model/csv/data"
import * as imported from "./data-model/imported"
import importFromFileSystem from "./import-from-file-system"
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
  describe(`mapping data file row`, () => it(`schema`,
    () => expect(index.mappingDataFileRow).toBe(mappingDataFileRow.schema)))
  describe(`mapping data file`, () => it(`schema`,
    () => expect(index.mappingDataFile).toBe(mappingDataFile.schema)))
  describe(`mapping data file set`, () => it(`schema`,
    () => expect(index.mappingDataFileSet).toBe(mappingDataFileSet.schema)))
  describe(`data`, () => {
    it(`schema`, () => expect(index.data).toBe(data.schema))
  })
  describe(`imported`, () => {
    it(`schema`, () => expect(index.imported).toBe(imported.schema))
  })
  describe(`import-from-file-system`, () => it(`schema`,
    () => expect(index.importFromFileSystem).toBe(importFromFileSystem)
  ))
})
