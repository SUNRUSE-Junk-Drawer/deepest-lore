import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityTypeDataFile from "./entity-type-data-file"
import * as sharedTests from "./../shared.tests"
import * as entityTypeDataFileRowTests from "./entity-type-data-file-row.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.emptyArrays, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.nonArrays, value => sharedTests.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`)
  )
  entityTypeDataFileRowTests.test(
    schema, value => instanceFactory([value]), `${property}[0]`
  )
  describe(`multi-row`, () => sharedTests.accepts(schema, instanceFactory([{}, {}, {}])))
}

describe(`entity type data file row`, () => test(
  entityTypeDataFile.schema,
  value => value,
  `instance`
))
