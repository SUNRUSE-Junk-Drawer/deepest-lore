import "jasmine"
import * as label from "./label"
import * as shared from "./shared.tests"

describe(`label`, () => {
  shared.run(shared.nonArrays, value => shared.rejects(
    label.schema, value, `instance`, `is not of a type(s) array`
  ))
  shared.run(shared.emptyArrays, value => shared.accepts(label.schema, value))
  shared.testLabelPart(label.schema, instance => [instance], `instance[0]`)
  describe(`example`, () => shared.accepts(label.schema, [
    [`for_eg`, `la_run`, `mu_par`],
    [],
    [`just_1`],
    [`long_w`, `2thetp`, `wanna_`, `depest`, `lore__`]
  ]))
})
