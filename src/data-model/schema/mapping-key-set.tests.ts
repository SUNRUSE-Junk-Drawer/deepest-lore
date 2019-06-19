import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingKeySet from "./mapping-key-set"
import * as shared from "./../shared.tests"
import * as mappingKeyTests from "./mapping-key.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  shared.run(shared.emptyObjects, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.identifierStrings, value => shared.accepts(schema, instanceFactory(shared.keyValue(value, {
    entityType: `for_eg`,
    label: {}
  }))))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory(shared.keyValue(value, {
    entityType: `for_eg`,
    label: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  mappingKeyTests.test(schema, value => instanceFactory(shared.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => shared.accepts(schema, instanceFactory({
    for_eg: {
      entityType: `refr_a`,
      label: {}
    },
    oth_id: {
      entityType: `refr_b`,
      label: {}
    },
    anther: {
      entityType: `refr_c`,
      label: {}
    },
    lastid: {
      entityType: `refr_d`,
      label: {}
    }
  })))
}

describe(`mapping key set`, () => {
  test(mappingKeySet.schema, value => value, `instance`)
})
