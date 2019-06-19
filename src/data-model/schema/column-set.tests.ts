import "jasmine"
import * as jsonschema from "jsonschema"
import * as columnSet from "./column-set"
import * as sharedTests from "./../shared.tests"
import * as columnTests from "./column.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  sharedTests.run(sharedTests.nonObjects, value => sharedTests.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  sharedTests.run(sharedTests.emptyObjects, value => sharedTests.accepts(schema, instanceFactory(value)))
  sharedTests.run(sharedTests.identifierStrings, value => sharedTests.accepts(schema, instanceFactory(sharedTests.keyValue(value, {
    type: `boolean`,
    label: {},
    default: false
  }))))
  sharedTests.run(sharedTests.nonIdentifierStrings, value => sharedTests.rejects(schema, instanceFactory(sharedTests.keyValue(value, {
    type: `boolean`,
    label: {},
    default: false
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  columnTests.test(schema, value => instanceFactory(sharedTests.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => sharedTests.accepts(schema, instanceFactory({
    for_eg: {
      type: `boolean`,
      label: {},
      default: false
    },
    oth_id: {
      type: `boolean`,
      label: {},
      default: false
    },
    anther: {
      type: `boolean`,
      label: {},
      default: false
    },
    lastid: {
      type: `boolean`,
      label: {},
      default: false
    }
  })))
}

describe(`column set`, () => {
  test(columnSet.schema, instance => instance, `instance`)
})
