import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityTypeDataFileRow from "./entity-type-data-file-row"
import * as sharedTests from "./../shared.tests"
import * as sharedIdentifierTests from "./../shared/identifier.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`primary key`, () => sharedIdentifierTests.test(
    schema,
    value => instanceFactory(sharedTests.keyValue(`$`, value)),
    `${property}.$`
  ))
  describe(`mapping key`, () => {
    sharedTests.run(
      sharedTests.combinationOf(sharedTests.nonEmptyStrings, sharedTests.identifierStrings),
      key => sharedTests.rejects(
        schema,
        instanceFactory(sharedTests.keyValue(`$${key}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`$${key}`)} exists in instance when not allowed`
      )
    )
  })
  describe(`unlocalized column`, () => {
    sharedTests.run(
      sharedTests.nonIdentifierStrings,
      key => sharedTests.rejects(
        schema,
        instanceFactory(sharedTests.keyValue(key, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(key)} exists in instance when not allowed`
      )
    )
    sharedTests.run(
      sharedTests.identifierStrings,
      key => sharedTests.run(sharedTests.strings, value => sharedTests.accepts(
        schema,
        instanceFactory(sharedTests.keyValue(key, value))
      ))
    )
    sharedTests.run(
      sharedTests.identifierStrings,
      key => sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(
        schema,
        instanceFactory(sharedTests.keyValue(key, value)),
        `${property}.${key}`,
        `is not of a type(s) string`
      ))
    )
  })
  describe(`localized column`, () => {
    sharedTests.runProduct(
      sharedTests.productOf(sharedTests.identifierStrings, sharedTests.identifierStrings),
      (keyA, keyB) => sharedTests.run(sharedTests.strings, value => sharedTests.accepts(
        schema,
        instanceFactory(sharedTests.keyValue(`${keyA}:${keyB}`, value))
      ))
    )
    sharedTests.runProduct(
      sharedTests.productOf(sharedTests.identifierStrings, sharedTests.identifierStrings),
      (keyA, keyB) => sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(
        schema,
        instanceFactory(sharedTests.keyValue(`${keyA}:${keyB}`, value)),
        `${property}.${keyA}:${keyB}`,
        `is not of a type(s) string`
      ))
    )
    sharedTests.runProduct(
      sharedTests.productOf(sharedTests.nonIdentifierStrings, sharedTests.identifierStrings),
      (keyA, keyB) => sharedTests.rejects(
        schema,
        instanceFactory(sharedTests.keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    sharedTests.runProduct(
      sharedTests.productOf(sharedTests.identifierStrings, sharedTests.nonIdentifierStrings),
      (keyA, keyB) => sharedTests.rejects(
        schema,
        instanceFactory(sharedTests.keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    sharedTests.runProduct(
      sharedTests.productOf(sharedTests.nonIdentifierStrings, sharedTests.nonIdentifierStrings),
      (keyA, keyB) => sharedTests.rejects(
        schema,
        instanceFactory(sharedTests.keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
  })
  describe(`multi-column`, () => sharedTests.accepts(schema, instanceFactory({
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
