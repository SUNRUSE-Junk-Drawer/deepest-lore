import "jasmine"
import * as label from "./label"
import * as shared from "./../shared.tests"

describe(`label`, () => {
  shared.testLabel(label.schema, value => value, `instance`)
})
