import "jasmine"
import * as labelPart from "./label-part"
import * as shared from "./shared.tests"

describe(`label part`, () => {
  shared.testLabelPart(labelPart.schema, instance => instance, `instance`)
})
