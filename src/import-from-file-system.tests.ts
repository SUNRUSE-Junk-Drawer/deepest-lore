import "jasmine"
import * as path from "path"
import importFromFileSystem from "./import-from-file-system"

describe(`import from file system`, () => {
  const withSuffix = (
    description: string,
    suffix: string
  ): void => describe(description, () => {
    const accepts = (
      description: string,
      basePath: string,
      result: any
    ): void => describe(description, () => {
      let imported: any
      beforeAll(async () => {
        imported = null
        imported = await importFromFileSystem(`${path.join(`src`, `scenarios`, basePath)}${suffix}`)
      })

      it(`imports the expected value`, () => expect(imported).toEqual(result))
    })

    const rejects = (
      description: string,
      basePath: string,
      possibleMessages: ReadonlyArray<string>
    ): void => describe(description, () => {
      let thrown: null | Error
      beforeAll(async () => {
        thrown = null
        try {
          await importFromFileSystem(`${path.join(`src`, `scenarios`, basePath)}${suffix}`)
        } catch (e) {
          thrown = e
        }
      })

      it(`throws an error`, () => expect(thrown).toEqual(jasmine.any(Error)))
      it(`throws one of the expected errors`, () => thrown !== null && expect(possibleMessages).toContain(thrown.message))
    })

    rejects(`missing base path`, `missing-base-path`, [
      `The schema document cannot be read.`,
      `The entity type data directory cannot be searched.`,
      `The mapping data directory cannot be searched.`
    ])
    rejects(`base path is a file`, `base-path-is-a-file`, [
      `The schema document cannot be read.`,
      `The entity type data directory cannot be searched.`,
      `The mapping data directory cannot be searched.`
    ])
    accepts(`all present but empty`, `all-present-but-empty`, {
      schema: {
        example: `json`,
        which: `is`,
        parseable: true
      },
      data: {
        entityTypes: {},
        mappings: {}
      }
    })
    rejects(`empty base path`, `empty-base-path`, [
      `The schema document cannot be read.`,
      `The entity type data directory cannot be searched.`,
      `The mapping data directory cannot be searched.`
    ])
    rejects(`entity types only`, `entity-types-only`, [
      `The schema document cannot be read.`,
      `The mapping data directory cannot be searched.`
    ])
    rejects(`mappings only`, `mappings-only`, [
      `The schema document cannot be read.`,
      `The entity type data directory cannot be searched.`
    ])
    rejects(`missing entity types`, `missing-entity-types`, [
      `The entity type data directory cannot be searched.`
    ])
    rejects(`entity types are a file`, `entity-types-are-a-file`, [
      `The entity type data directory cannot be searched.`
    ])
    rejects(`missing mappings`, `missing-mappings`, [
      `The mapping data directory cannot be searched.`
    ])
    rejects(`mappings are a file`, `mappings-are-a-file`, [
      `The mapping data directory cannot be searched.`
    ])
    rejects(`missing schema`, `missing-schema`, [
      `The schema document cannot be read.`
    ])
    rejects(`schema is a directory`, `schema-is-a-directory`, [
      `The schema document cannot be read.`
    ])
    rejects(`schema only`, `schema-only`, [
      `The entity type data directory cannot be searched.`,
      `The mapping data directory cannot be searched.`
    ])
    rejects(`unparseable schema`, `unparseable-schema`, [
      `The schema document cannot be parsed.`
    ])
    accepts(`valid`, `valid`, {
      schema: {
        example: `json`,
        which: `is`,
        parseable: true
      },
      data: {
        entityTypes: {
          "test-entity-type-a": [{
            "test-entity-type-a-key-a": `test-entity-type-a-key-a-value-a`,
            "test-entity-type-a-key-b": `test-entity-type-a-key-b-value-a`,
            "test-entity-type-a-key-c": `test-entity-type-a-key-c-value-a`
          }, {
            "test-entity-type-a-key-a": `test-entity-type-a-key-a-value-b`,
            "test-entity-type-a-key-b": `test-entity-type-a-key-b-value-b`,
            "test-entity-type-a-key-c": `test-entity-type-a-key-c-value-b`
          }, {
            "test-entity-type-a-key-a": `test-entity-type-a-key-a-value-c`,
            "test-entity-type-a-key-b": `test-entity-type-a-key-b-value-c`,
            "test-entity-type-a-key-c": `test-entity-type-a-key-c-value-c`
          }],
          "test-entity-type-b": [{
            "test-entity-type-b-key-a": `test-entity-type-b-key-a-value-a`,
            "test-entity-type-b-key-b": `test-entity-type-b-key-b-value-a`,
            "test-entity-type-b-key-c": `test-entity-type-b-key-c-value-a`
          }, {
            "test-entity-type-b-key-a": `test-entity-type-b-key-a-value-b`,
            "test-entity-type-b-key-b": `test-entity-type-b-key-b-value-b`,
            "test-entity-type-b-key-c": `test-entity-type-b-key-c-value-b`
          }, {
            "test-entity-type-b-key-a": `test-entity-type-b-key-a-value-c`,
            "test-entity-type-b-key-b": `test-entity-type-b-key-b-value-c`,
            "test-entity-type-b-key-c": `test-entity-type-b-key-c-value-c`
          }],
          "test-entity-type-c": [{
            "test-entity-type-c-key-a": `test-entity-type-c-key-a-value-a`,
            "test-entity-type-c-key-b": `test-entity-type-c-key-b-value-a`,
            "test-entity-type-c-key-c": `test-entity-type-c-key-c-value-a`
          }, {
            "test-entity-type-c-key-a": `test-entity-type-c-key-a-value-b`,
            "test-entity-type-c-key-b": `test-entity-type-c-key-b-value-b`,
            "test-entity-type-c-key-c": `test-entity-type-c-key-c-value-b`
          }, {
            "test-entity-type-c-key-a": `test-entity-type-c-key-a-value-c`,
            "test-entity-type-c-key-b": `test-entity-type-c-key-b-value-c`,
            "test-entity-type-c-key-c": `test-entity-type-c-key-c-value-c`
          }]
        },
        mappings: {
          "test-mapping-a": [{
            "test-mapping-a-key-a": `test-mapping-a-key-a-value-a`,
            "test-mapping-a-key-b": `test-mapping-a-key-b-value-a`,
            "test-mapping-a-key-c": `test-mapping-a-key-c-value-a`
          }, {
            "test-mapping-a-key-a": `test-mapping-a-key-a-value-b`,
            "test-mapping-a-key-b": `test-mapping-a-key-b-value-b`,
            "test-mapping-a-key-c": `test-mapping-a-key-c-value-b`
          }, {
            "test-mapping-a-key-a": `test-mapping-a-key-a-value-c`,
            "test-mapping-a-key-b": `test-mapping-a-key-b-value-c`,
            "test-mapping-a-key-c": `test-mapping-a-key-c-value-c`
          }],
          "test-mapping-b": [{
            "test-mapping-b-key-a": `test-mapping-b-key-a-value-a`,
            "test-mapping-b-key-b": `test-mapping-b-key-b-value-a`,
            "test-mapping-b-key-c": `test-mapping-b-key-c-value-a`
          }, {
            "test-mapping-b-key-a": `test-mapping-b-key-a-value-b`,
            "test-mapping-b-key-b": `test-mapping-b-key-b-value-b`,
            "test-mapping-b-key-c": `test-mapping-b-key-c-value-b`
          }, {
            "test-mapping-b-key-a": `test-mapping-b-key-a-value-c`,
            "test-mapping-b-key-b": `test-mapping-b-key-b-value-c`,
            "test-mapping-b-key-c": `test-mapping-b-key-c-value-c`
          }],
          "test-mapping-c": [{
            "test-mapping-c-key-a": `test-mapping-c-key-a-value-a`,
            "test-mapping-c-key-b": `test-mapping-c-key-b-value-a`,
            "test-mapping-c-key-c": `test-mapping-c-key-c-value-a`
          }, {
            "test-mapping-c-key-a": `test-mapping-c-key-a-value-b`,
            "test-mapping-c-key-b": `test-mapping-c-key-b-value-b`,
            "test-mapping-c-key-c": `test-mapping-c-key-c-value-b`
          }, {
            "test-mapping-c-key-a": `test-mapping-c-key-a-value-c`,
            "test-mapping-c-key-b": `test-mapping-c-key-b-value-c`,
            "test-mapping-c-key-c": `test-mapping-c-key-c-value-c`
          }]
        }
      }
    })
  })

  withSuffix(`without a trailing slash`, ``)
  withSuffix(`with a trailing slash`, path.sep)
})
