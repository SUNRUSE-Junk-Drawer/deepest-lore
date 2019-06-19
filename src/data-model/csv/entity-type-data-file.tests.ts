import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityTypeDataFile from "./entity-type-data-file"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.emptyArrays, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.nonArrays, value => shared.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`)
  )
  shared.testEntityTypeDataFileRow(
    schema, value => instanceFactory([value]), `${property}[0]`
  )
  describe(`multi-row`, () => shared.accepts(schema, instanceFactory([{}, {}, {}])))
}

describe(`entity type data file row`, () => test(
  entityTypeDataFile.schema,
  value => value,
  `instance`
))
