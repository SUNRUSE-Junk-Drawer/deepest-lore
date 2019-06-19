import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingSet from "./mapping-set"
import * as sharedTests from "./../shared.tests"
import * as mappingTests from "./mapping.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  sharedTests.run(sharedTests.emptyObjects, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.identifierStrings, value => sharedTests.accepts(schema, instanceFactory(sharedTests.keyValue(value, {
    keys: {},
    columns: {}
  }))))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory(sharedTests.keyValue(value, {
    keys: {},
    columns: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  mappingTests.test(schema, value => instanceFactory(sharedTests.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => sharedTests.accepts(schema, instanceFactory({
    for_eg: {
      keys: {},
      columns: {}
    },
    oth_id: {
      keys: {},
      columns: {}
    },
    anther: {
      keys: {},
      columns: {}
    },
    lastid: {
      keys: {},
      columns: {}
    }
  })))
}

describe(`mapping set`, () => {
  test(mappingSet.schema, instance => instance, `instance`)
})
