import "jasmine"
import * as columnSet from "./column-set"
import * as shared from "./../shared.tests"

describe(`column set`, () => {
  shared.testColumnSet(columnSet.schema, instance => instance, `instance`)
})
