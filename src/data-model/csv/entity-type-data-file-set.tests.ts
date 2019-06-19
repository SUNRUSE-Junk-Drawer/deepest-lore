import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityTypeDataFileSet from "./entity-type-data-file-set"
import * as shared from "./../shared.tests"
import * as entityTypeDataFileTests from "./entity-type-data-file.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(
    schema,
    instanceFactory(value),
    property,
    `is not of a type(s) object`
  ))
  shared.run(shared.emptyObjects, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(
    shared.identifierStrings,
    value => shared.accepts(schema, instanceFactory(shared.keyValue(value, [])))
  )
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(
    schema,
    instanceFactory(shared.keyValue(value, [])),
    property,
    `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`
  ))
  entityTypeDataFileTests.test(
    schema,
    value => instanceFactory(shared.keyValue(`for_eg`, value)),
    `${property}.for_eg`
  )
  describe(`multiple files`, () => shared.accepts(schema, instanceFactory({
    for_eg: [],
    oth_id: [],
    anther: [],
    lastid: []
  })))
}

describe(`entity type data file set`, () => test(
  entityTypeDataFileSet.schema, instance => instance, `instance`
))
