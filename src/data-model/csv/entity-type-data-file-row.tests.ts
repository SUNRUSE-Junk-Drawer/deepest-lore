import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityTypeDataFileRow from "./entity-type-data-file-row"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`primary key`, () => shared.testIdentifier(
    schema,
    value => instanceFactory(shared.keyValue(`$`, value)),
    `${property}.$`
  ))
  describe(`mapping key`, () => {
    shared.run(
      shared.combinationOf(shared.nonEmptyStrings, shared.identifierStrings),
      key => shared.rejects(
        schema,
        instanceFactory(shared.keyValue(`$${key}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`$${key}`)} exists in instance when not allowed`
      )
    )
  })
  describe(`unlocalized column`, () => {
    shared.run(
      shared.nonIdentifierStrings,
      key => shared.rejects(
        schema,
        instanceFactory(shared.keyValue(key, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(key)} exists in instance when not allowed`
      )
    )
    shared.run(
      shared.identifierStrings,
      key => shared.run(shared.strings, value => shared.accepts(
        schema,
        instanceFactory(shared.keyValue(key, value))
      ))
    )
    shared.run(
      shared.identifierStrings,
      key => shared.run(shared.nonStrings, value => shared.rejects(
        schema,
        instanceFactory(shared.keyValue(key, value)),
        `${property}.${key}`,
        `is not of a type(s) string`
      ))
    )
  })
  describe(`localized column`, () => {
    shared.runProduct(
      shared.productOf(shared.identifierStrings, shared.identifierStrings),
      (keyA, keyB) => shared.run(shared.strings, value => shared.accepts(
        schema,
        instanceFactory(shared.keyValue(`${keyA}:${keyB}`, value))
      ))
    )
    shared.runProduct(
      shared.productOf(shared.identifierStrings, shared.identifierStrings),
      (keyA, keyB) => shared.run(shared.nonStrings, value => shared.rejects(
        schema,
        instanceFactory(shared.keyValue(`${keyA}:${keyB}`, value)),
        `${property}.${keyA}:${keyB}`,
        `is not of a type(s) string`
      ))
    )
    shared.runProduct(
      shared.productOf(shared.nonIdentifierStrings, shared.identifierStrings),
      (keyA, keyB) => shared.rejects(
        schema,
        instanceFactory(shared.keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    shared.runProduct(
      shared.productOf(shared.identifierStrings, shared.nonIdentifierStrings),
      (keyA, keyB) => shared.rejects(
        schema,
        instanceFactory(shared.keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    shared.runProduct(
      shared.productOf(shared.nonIdentifierStrings, shared.nonIdentifierStrings),
      (keyA, keyB) => shared.rejects(
        schema,
        instanceFactory(shared.keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
  })
  describe(`multi-column`, () => shared.accepts(schema, instanceFactory({
    $: `prikey`,
    col__a: `Test Value A`,
    col__b: `Test Value B`,
    "col__c:loc__a": `Test Value C`,
    "col__c:loc__b": `Test Value D`,
    "col__d:loc__a": `Test Value E`
  })))
}

describe(`entity type data file row`, () => test(
  entityTypeDataFileRow.schema,
  value => value,
  `instance`
))
