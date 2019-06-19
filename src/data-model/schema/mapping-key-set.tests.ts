import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingKeySet from "./mapping-key-set"
import * as sharedTests from "./../shared.tests"
import * as mappingKeyTests from "./mapping-key.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  sharedTests.run(sharedTests.emptyObjects, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.identifierStrings, value => sharedTests.accepts(schema, instanceFactory(sharedTests.keyValue(value, {
    entityType: `for_eg`,
    label: {}
  }))))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory(sharedTests.keyValue(value, {
    entityType: `for_eg`,
    label: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  mappingKeyTests.test(schema, value => instanceFactory(sharedTests.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => sharedTests.accepts(schema, instanceFactory({
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
