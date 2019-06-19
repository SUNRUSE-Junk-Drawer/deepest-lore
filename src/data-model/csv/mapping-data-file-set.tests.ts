import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingDataFileSet from "./mapping-data-file-set"
import * as sharedTests from "./../shared.tests"
import * as mappingDataFileTests from "./mapping-data-file.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(
    schema,
    instanceFactory(value),
    property,
    `is not of a type(s) object`
  ))
  sharedTests.run(sharedTests.emptyObjects, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(
    sharedTests.identifierStrings,
    value => sharedTests.accepts(schema, instanceFactory(sharedTests.keyValue(value, [])))
  )
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(
    schema,
    instanceFactory(sharedTests.keyValue(value, [])),
    property,
    `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`
  ))
  mappingDataFileTests.test(
    schema,
    value => instanceFactory(sharedTests.keyValue(`for_eg`, value)),
    `${property}.for_eg`
  )
  describe(`multiple files`, () => sharedTests.accepts(schema, instanceFactory({
    for_eg: [],
    oth_id: [],
    anther: [],
    lastid: []
  })))
}

describe(`mapping data file set`, () => test(
  mappingDataFileSet.schema, instance => instance, `instance`
))
