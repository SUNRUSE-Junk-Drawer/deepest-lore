import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityTypeSet from "./entity-type-set"
import * as shared from "./../shared.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  shared.run(shared.emptyObjects, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.identifierStrings, value => shared.accepts(schema, instanceFactory(shared.keyValue(value, {
    singular: {},
    plural: {},
    label: [],
    columns: {}
  }))))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory(shared.keyValue(value, {
    singular: {},
    plural: {},
    label: [],
    columns: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  shared.testEntityType(schema, value => instanceFactory(shared.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => shared.accepts(schema, instanceFactory({
    for_eg: {
      singular: {},
      plural: {},
      label: [],
      columns: {}
    },
    oth_id: {
      singular: {},
      plural: {},
      label: [],
      columns: {}
    },
    anther: {
      singular: {},
      plural: {},
      label: [],
      columns: {}
    },
    lastid: {
      singular: {},
      plural: {},
      label: [],
      columns: {}
    }
  })))
}

describe(`entity type set`, () => {
  test(entityTypeSet.schema, value => value, `instance`)
})
