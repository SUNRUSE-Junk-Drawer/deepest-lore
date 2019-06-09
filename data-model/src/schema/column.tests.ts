import "jasmine"
import * as column from "./column"
import * as shared from "./../shared.tests"

describe(`column`, () => {
  shared.testColumn(column.schema, value => value, `instance`)
})
