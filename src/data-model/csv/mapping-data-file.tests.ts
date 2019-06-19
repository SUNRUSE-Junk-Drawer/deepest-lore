import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingDataFile from "./mapping-data-file"
import * as shared from "./../shared.tests"
import * as mappingDataFileRowTests from "./mapping-data-file-row.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.emptyArrays, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.nonArrays, value => shared.rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`)
  )
  mappingDataFileRowTests.test(
    schema, value => instanceFactory([value]), `${property}[0]`
  )
  describe(`multi-row`, () => shared.accepts(schema, instanceFactory([{}, {}, {}])))
}

describe(`mapping data file row`, () => test(
  mappingDataFile.schema,
  value => value,
  `instance`
))
