import "jasmine"
import * as jsonschema from "jsonschema"
import * as mappingSet from "./mapping-set"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  shared.run(shared.emptyObjects, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.identifierStrings, value => shared.accepts(schema, instanceFactory(shared.keyValue(value, {
    keys: {},
    columns: {}
  }))))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory(shared.keyValue(value, {
    keys: {},
    columns: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  shared.testMapping(schema, value => instanceFactory(shared.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => shared.accepts(schema, instanceFactory({
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
