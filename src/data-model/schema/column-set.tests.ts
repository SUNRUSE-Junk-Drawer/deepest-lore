import "jasmine"
import * as jsonschema from "jsonschema"
import * as columnSet from "./column-set"
import * as shared from "./../shared.tests"
import * as columnTests from "./column.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: shared.InstanceFactory,
  property: string
): void {
  shared.run(shared.nonObjects, value => shared.rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  shared.run(shared.emptyObjects, value => shared.accepts(schema, instanceFactory(value)))
  shared.run(shared.identifierStrings, value => shared.accepts(schema, instanceFactory(shared.keyValue(value, {
    type: `boolean`,
    label: {},
    default: false
  }))))
  shared.run(shared.nonIdentifierStrings, value => shared.rejects(schema, instanceFactory(shared.keyValue(value, {
    type: `boolean`,
    label: {},
    default: false
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  columnTests.test(schema, value => instanceFactory(shared.keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => shared.accepts(schema, instanceFactory({
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
