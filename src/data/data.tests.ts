import "jasmine"
import * as data from "./data"
import * as shared from "./../shared.tests"

describe(`data`, () => {
  shared.testData(data.schema, value => value, `instance`)
})
