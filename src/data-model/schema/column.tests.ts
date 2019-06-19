import "jasmine"
import * as jsonschema from "jsonschema"
import * as column from "./column"
import * as sharedTests from "./../shared.tests"
import * as sharedIdentifierTests from "./../shared/identifier.tests"
import * as sharedLocalizedStringTests from "./../shared/localized-string.tests"

export function test(
  schema: jsonschema.Schema,
  instanceFactory: sharedTests.InstanceFactory,
  property: string
): void {
  const message = `is not exactly one from [subschema 0],[subschema 1],[subschema 2],[subschema 3],[subschema 4]`
  sharedTests.run(
    sharedTests.nonObjects,
    value => sharedTests.rejects(schema, instanceFactory(value), property, message)
  )
  describe(`boolean`, () => {
    describe(`unexpected properties`, () => sharedTests.rejects(schema, instanceFactory({
      type: `boolean`,
      label: {},
      default: false,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        label: {},
        default: false
      }), property, message))
      sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory({
        type: value,
        label: {},
        default: false
      }), property, message))
      sharedTests.run(
        sharedTests.combinationOf(
          sharedTests.strings,
          sharedTests.setOf(`integer`, `float`, `string`, `entityReference`)
        ),
        value => sharedTests.rejects(schema, instanceFactory({
          type: value,
          label: {},
          default: false
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `boolean`,
        default: false
      }), property, message))
      sharedLocalizedStringTests.test(schema, instance => instanceFactory({
        type: `boolean`,
        label: instance,
        default: false
      }), property, true, message)
    })
    describe(`default`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `boolean`,
        label: {}
      }), property, message))
      sharedTests.run(sharedTests.nonBooleans, value => sharedTests.rejects(schema, instanceFactory({
        type: `boolean`,
        label: {},
        default: value
      }), property, message))
      sharedTests.run(sharedTests.booleans, value => sharedTests.accepts(schema, instanceFactory({
        type: `boolean`,
        label: {},
        default: value
      })))
    })
  })
  describe(`string`, () => {
    describe(`unexpected properties`, () => sharedTests.rejects(schema, instanceFactory({
      type: `string`,
      label: {},
      maximumLength: 1,
      default: {},
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        label: {},
        maximumLength: 1,
        default: {},
      }), property, message))
      sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory({
        type: value,
        label: {},
        maximumLength: 1,
        default: {},
      }), property, message))
      sharedTests.run(
        sharedTests.combinationOf(
          sharedTests.strings,
          sharedTests.setOf(`boolean`, `integer`, `float`, `entityReference`)
        ),
        value => sharedTests.rejects(schema, instanceFactory({
          type: value,
          label: {},
          maximumLength: 1,
          default: {},
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `string`,
        maximumLength: 1,
        default: {},
      }), property, message))
      sharedLocalizedStringTests.test(schema, instance => instanceFactory({
        type: `string`,
        label: instance,
        maximumLength: 1,
        default: {},
      }), property, true, message)
    })
    describe(`maximumLength`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `string`,
        label: {},
        default: {}
      }), property, message))
      sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(schema, instanceFactory({
        type: `string`,
        label: {},
        maximumLength: value,
        default: {}
      }), property, message))
      sharedTests.run(
        sharedTests.combinationOf(sharedTests.negativeFloats),
        value => sharedTests.rejects(schema, instanceFactory({
          type: `string`,
          label: {},
          maximumLength: value,
          default: {}
        }), property, message)
      )
      sharedTests.run(
        sharedTests.combinationOf(sharedTests.zeroes, sharedTests.negativeIntegers),
        value => sharedTests.rejects(schema, instanceFactory({
          type: `string`,
          label: {},
          maximumLength: value,
          default: {}
        }), property, message)
      )
      sharedTests.run(sharedTests.positiveIntegers, value => sharedTests.accepts(schema, instanceFactory({
        type: `string`,
        label: {},
        maximumLength: value,
        default: {}
      })))
    })
    describe(`default`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `string`,
        label: {},
        maximumLength: 1
      }), property, message))
      sharedLocalizedStringTests.test(schema, value => instanceFactory({
        type: `string`,
        label: {},
        maximumLength: 1,
        default: value
      }), property, true, message)
    })
  })
  describe(`entity reference`, () => {
    describe(`unexpected properties`, () => sharedTests.rejects(schema, instanceFactory({
      type: `entityReference`,
      label: {},
      entityType: `enttyp`,
      default: `defalt`,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        label: {},
        entityType: `enttyp`,
        default: `defalt`
      }), property, message))
      sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory({
        type: value,
        label: {},
        entityType: `enttyp`,
        default: `defalt`
      }), property, message))
      sharedTests.run(
        sharedTests.combinationOf(
          sharedTests.strings,
          sharedTests.setOf(`boolean`, `integer`, `float`, `string`)
        ),
        value => sharedTests.rejects(schema, instanceFactory({
          type: value,
          label: {},
          entityType: `enttyp`,
          default: `defalt`
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `entityReference`,
        entityType: `enttyp`,
        default: `defalt`
      }), property, message))
      sharedLocalizedStringTests.test(schema, instance => instanceFactory({
        type: `entityReference`,
        label: instance,
        entityType: `enttyp`,
        default: `defalt`
      }), property, true, message)
    })
    describe(`entityType`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `entityReference`,
        label: {},
        default: `defalt`
      }), property, message))
      sharedIdentifierTests.test(schema, value => instanceFactory({
        type: `entityReference`,
        label: {},
        entityType: value,
        default: `defalt`
      }), property, message)
    })
    describe(`default`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `entityReference`,
        label: {},
        entityType: `enttyp`
      }), property, message))
      sharedIdentifierTests.test(schema, value => instanceFactory({
        type: `entityReference`,
        label: {},
        entityType: `enttyp`,
        default: value
      }), property, message)
    })
  })
  describe(`integer`, () => {
    describe(`unexpected properties`, () => sharedTests.rejects(schema, instanceFactory({
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, message))
      sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory({
        type: value,
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, message))
      sharedTests.run(
        sharedTests.combinationOf(
          sharedTests.strings,
          sharedTests.setOf(`boolean`, `string`, `entityReference`)
        ),
        value => sharedTests.rejects(schema, instanceFactory({
          type: value,
          label: {},
          minimum: 0,
          maximum: 0,
          default: 0
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `integer`,
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, message))
      sharedLocalizedStringTests.test(schema, instance => instanceFactory({
        type: `integer`,
        label: instance,
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, true, message)
    })
    describe(`minimum`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        maximum: 0,
        default: 0
      }), property, message))
      sharedTests.run(sharedTests.nonIntegers, value => sharedTests.rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: value,
        maximum: 0,
        default: 0
      }), property, message))
      sharedTests.run(sharedTests.integers, value => sharedTests.accepts(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: value,
        maximum: 0,
        default: 0
      })))
    })
    describe(`maximum`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        default: 0
      }), property, message))
      sharedTests.run(sharedTests.nonIntegers, value => sharedTests.rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: value,
        default: 0
      }), property, message))
      sharedTests.run(sharedTests.integers, value => sharedTests.accepts(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: value,
        default: 0
      })))
    })
    describe(`default`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: 0
      }), property, message))
      sharedTests.run(sharedTests.nonIntegers, value => sharedTests.rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: 0,
        default: value
      }), property, message))
      sharedTests.run(sharedTests.integers, value => sharedTests.accepts(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: 0,
        default: value
      })))
    })
  })
  describe(`float`, () => {
    describe(`unexpected properties`, () => sharedTests.rejects(schema, instanceFactory({
      type: `float`,
      label: {},
      minimum: 0.1,
      maximum: 0.1,
      default: 0.1,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      sharedTests.run(sharedTests.nonStrings, value => sharedTests.rejects(schema, instanceFactory({
        type: value,
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      sharedTests.run(
        sharedTests.combinationOf(
          sharedTests.strings,
          sharedTests.setOf(`boolean`, `integer`, `string`, `entityReference`)
        ),
        value => sharedTests.rejects(schema, instanceFactory({
          type: value,
          label: {},
          minimum: 0.1,
          maximum: 0.1,
          default: 0.1
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `float`,
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      sharedLocalizedStringTests.test(schema, instance => instanceFactory({
        type: `float`,
        label: instance,
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, true, message)
    })
    describe(`minimum`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        maximum: 0.1,
        default: 0.1
      }), property, message))
      sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: value,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      sharedTests.run(sharedTests.floats, value => sharedTests.accepts(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: value,
        maximum: 0.1,
        default: 0.1
      })))
    })
    describe(`maximum`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        default: 0.1
      }), property, message))
      sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: value,
        default: 0.1
      }), property, message))
      sharedTests.run(sharedTests.floats, value => sharedTests.accepts(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: value,
        default: 0.1
      })))
    })
    describe(`default`, () => {
      describe(`missing`, () => sharedTests.rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: 0.1
      }), property, message))
      sharedTests.run(sharedTests.nonFloats, value => sharedTests.rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: value
      }), property, message))
      sharedTests.run(sharedTests.floats, value => sharedTests.accepts(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: value
      })))
    })
  })
}

describe(`column`, () => {
  test(column.schema, value => value, `instance`)
})
