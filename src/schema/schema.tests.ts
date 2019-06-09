import "jasmine"
import * as schema from "./schema"
import * as shared from "./../shared.tests"

describe(`schema`, () => {
  shared.testSchema(schema.schema, value => value, `instance`)
})
