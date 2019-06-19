import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingDataFileRow from "./mapping-data-file-row"
import * as shared from "./../shared.tests"
import * as sharedIdentifierTests from "./../shared/identifier.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`primary key`, () => shared.rejects(
    schema,
    instanceFactory(shared.keyValue(`$`, `for_eg`)),
    property,
    `additionalProperty "$" exists in instance when not allowed`
  ))
  describe(`mapping key`, () => {
    shared.run(shared.nonIdentifierStrings, key => shared.rejects(
      schema,
      instanceFactory(shared.keyValue(`$${key}`, `for_eg`)),
      property,
      `additionalProperty ${JSON.stringify(`$${key}`)} exists in instance when not allowed`
    ))
    shared.run(shared.identifierStrings, key => sharedIdentifierTests.test(
      schema,
      value => instanceFactory(shared.keyValue(`$${key}`, value)),
      `${property}.$${key}`
    ))
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
    $key__a: `val__a`,
    $key__b: `val__b`,
    $key__c: `val__c`,
    $key__d: `val__d`,
    col__a: `Test Value A`,
    col__b: `Test Value B`,
    "col__c:loc__a": `Test Value C`,
    "col__c:loc__b": `Test Value D`,
    "col__d:loc__a": `Test Value E`
  })))
}

describe(`mapping data file row`, () => test(
  mappingDataFileRow.schema,
  value => value,
  `instance`
))
