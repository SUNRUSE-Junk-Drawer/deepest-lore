import "jasmine"
import * as jsonschema from "jsonschema"
import * as entityTypeSet from "./entity-type-set"
import * as sharedTests from "./../shared.tests"
import * as entityTypeTests from "./entity-type.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  sharedTests.run(sharedTests.emptyObjects, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.identifierStrings, value => sharedTests.accepts(schema, instanceFactory(sharedTests.keyValue(value, {
    singular: {},
    plural: {},
    label: [],
    columns: {}
  }))))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory(sharedTests.keyValue(value, {
    singular: {},
    plural: {},
    label: [],
    columns: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  entityTypeTests.test(schema, value => instanceFactory(sharedTests.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => sharedTests.accepts(schema, instanceFactory({
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
