import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingDataFile from "./mapping-data-file"
import * as sharedTests from "./../shared.tests"
import * as mappingDataFileRowTests from "./mapping-data-file-row.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.emptyArrays, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.nonArrays, value => sharedTests.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`)
  )
  mappingDataFileRowTests.test(
    schema, value => instanceFactory([value]), `${property}[0]`
  )
  describe(`multi-row`, () => sharedTests.accepts(schema, instanceFactory([{}, {}, {}])))
}

describe(`mapping data file row`, () => test(
  mappingDataFile.schema,
  value => value,
  `instance`
))
