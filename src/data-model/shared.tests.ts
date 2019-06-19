import * as identifier from "./shared/identifier"
import * as jsonschema from "jsonschema"

export function accepts<T>(
  schema: jsonschema.Schema,
  instance: T
): void {
  it(
    `passes validation`,
    () => expect(jsonschema.validate(instance, schema).errors).toEqual([])
  )
}

export function rejects(
  schema: jsonschema.Schema,
  instance: any,
  property: string,
  message: string
): void {
  let result: jsonschema.ValidatorResult
  beforeAll(() => result = jsonschema.validate(instance, schema))
  it(
    `fails validation`,
    () => expect(result.errors.length).toEqual(1)
  )
  it(
    `fails validation on the expected property`,
    () => expect(result.errors[0].property).toEqual(property)
  )
  it(
    `fails validation with the expected message`,
    () => expect(result.errors[0].message).toEqual(message)
  )
}

export function rejectsMany(
  schema: jsonschema.Schema,
  instance: any,
  errors: ReadonlyArray<{
    readonly property: string
    readonly message: string
  }>
): void {
  let result: jsonschema.ValidatorResult
  beforeAll(() => result = jsonschema.validate(instance, schema))
  it(
    `returns the expected number of errors`,
    () => expect(result.errors.length).toEqual(errors.length)
  )
  errors.forEach(error => it(
    `returns all expected errors`,
    () => expect(result.errors).toContain(jasmine.objectContaining(error))
  ))
}

export function keyValue<TValue>(
  key: string,
  value: TValue
): { readonly [key: string]: TValue } {
  const output: { [key: string]: TValue } = {}
  output[key] = value
  return output
}

type Callback<T> = (
  description: string,
  value: T
) => void

type ProductCallback<T> = (
  descriptionA: string,
  valueA: T,
  descriptionB: string,
  valueB: T
) => void

type Source<T> = (
  callback: Callback<T>
) => void

type ProductSource<T> = (
  callback: ProductCallback<T>
) => void

export type InstanceFactory = (value: any) => any

export function run<T>(
  source: Source<T>,
  test: (
    value: T
  ) => void
): void {
  source((description, value) => describe(description, () => test(value)))
}

export function combinationOf<T>(
  ...sources: ReadonlyArray<Source<T>>
): Source<T> {
  return (
    callback: Callback<T>
  ): void => {
    for (const source of sources) {
      source(callback)
    }
  }
}

export function productOf<T>(
  a: Source<T>,
  b: Source<T>
): ProductSource<T> {
  return (
    callback: ProductCallback<T>
  ): void => a((descriptionA, valueA) => b((descriptionB, valueB) => callback(
    descriptionA, valueA, descriptionB, valueB
  )))
}

export function runProduct<T>(
  source: ProductSource<T>,
  test: (
    valueA: T,
    valueB: T
  ) => void
): void {
  source((descriptionA, valueA, descriptionB, valueB) => describe(`${descriptionA}:${descriptionB}`, () => test(valueA, valueB)))
}

export function setOf(
  ...strings: ReadonlyArray<string>
): Source<string> {
  return (
    callback: Callback<string>
  ): void => {
    strings.forEach(str => callback(str, str))
  }
}

export function emptyStrings(
  callback: Callback<identifier.Type>
): void {
  return callback(`empty string`, ``)
}

export function exhaustiveIdentifierStrings(
  callback: Callback<identifier.Type>
): void {
  callback(`identifier minimum value`, `______`)
  callback(`identifier maximum value`, `zzzzzz`)
  callback(`identifier typical example`, `for_eg`)
  callback(`identifier character set 1`, `_01234`)
  callback(`identifier character set 2`, `56789a`)
  callback(`identifier character set 3`, `bcdefg`)
  callback(`identifier character set 4`, `hijklm`)
  callback(`identifier character set 5`, `nopqrs`)
  callback(`identifier character set 6`, `tuvwxy`)
}

export function nonIdentifierStrings(
  callback: Callback<string>
): void {
  callback(`string too short to be an identifier`, `for_e`)
  callback(`string too long to be an identifier`, `for_epl`)
  callback(`string with a character invalid in identifiers`, `for_£g`)
  callback(`string containing white space`, `for_\ng`)
  callback(`string with preceding white space`, `\nor_eg`)
  callback(`string with trailing white space`, `for_e\n`)
  callback(`string with additional white space`, `for_\neg`)
  callback(`string with additional preceding white space`, `\nfor_eg`)
  callback(`string with additional trailing white space`, `for_eg\n`)
}

export function nonEmptyStrings(
  callback: Callback<string>
): void {
  callback(`non-empty string`, `Test Non-Empty String`)
}

export function identifierStrings(
  callback: Callback<string>
): void {
  callback(`identifier`, `for_eg`)
}

export function trues(
  callback: Callback<boolean>
): void {
  callback(`true`, true)
}

export function falses(
  callback: Callback<boolean>
): void {
  callback(`falses`, false)
}

export function nulls(
  callback: Callback<null>
): void {
  callback(`null`, null)
}

export function zeroes(
  callback: Callback<number>
): void {
  callback(`zero`, 0)
}

export function positiveIntegers(
  callback: Callback<number>
): void {
  callback(`positive one`, 1)
  callback(`positive integer`, 3)
}

export function negativeIntegers(
  callback: Callback<number>
): void {
  callback(`negative one`, -1)
  callback(`negative integer`, -3)
}

export function positiveFloats(
  callback: Callback<number>
): void {
  callback(`positive float`, 3.14)
}

export function negativeFloats(
  callback: Callback<number>
): void {
  callback(`negative float`, -3.14)
}

export function emptyArrays(
  callback: Callback<ReadonlyArray<never>>
): void {
  callback(`empty array`, [])
}

export function emptyObjects(
  callback: Callback<{}>
): void {
  callback(`empty objects`, {})
}

export const strings = combinationOf(emptyStrings, nonEmptyStrings, identifierStrings)
export const booleans = combinationOf(trues, falses)
export const integers = combinationOf(zeroes, positiveIntegers, negativeIntegers)
export const floats = combinationOf(integers, positiveFloats, negativeFloats)
export const nonObjects = combinationOf<string | boolean | null | number | ReadonlyArray<never>>(strings, booleans, nulls, floats, emptyArrays)
export const nonArrays = combinationOf(strings, booleans, nulls, floats, emptyObjects)
export const nonStrings = combinationOf(booleans, nulls, floats, emptyArrays, emptyObjects)
export const nonBooleans = combinationOf(strings, nulls, floats, emptyArrays, emptyObjects)
export const nonIntegers = combinationOf(strings, booleans, nulls, positiveFloats, negativeFloats, emptyArrays, emptyObjects)
export const nonFloats = combinationOf(strings, booleans, nulls, emptyArrays, emptyObjects)

export function testIdentifier(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string,
  allMessagesReplacedWith?: string
): void {
  run(exhaustiveIdentifierStrings, value => accepts(schema, instanceFactory(value)))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `does not match pattern "^[_a-z0-9]{6}$"`))
  run(nonStrings, value => rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) string`))
}

export function testIdentifierSet(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string,
  useExactProperty?: boolean,
  allMessagesReplacedWith?: string
): void {
  run(exhaustiveIdentifierStrings, value => accepts(schema, instanceFactory([value])))
  run(emptyArrays, value => accepts(schema, instanceFactory(value)))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory([value]), useExactProperty ? property : `${property}[0]`, allMessagesReplacedWith || `does not match pattern "^[_a-z0-9]{6}$"`))
  run(nonStrings, value => rejects(schema, instanceFactory([value]), useExactProperty ? property : `${property}[0]`, allMessagesReplacedWith || `is not of a type(s) string`))
  run(nonArrays, value => rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) array`))
  describe(`multiple identifiers`, () => accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `__this`])))
  describe(`duplicate identifiers`, () => rejects(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `val_id`, `__this`]), property, allMessagesReplacedWith || `contains duplicate item`))
}

export function testLocalizedString(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string,
  useExactProperty?: boolean,
  allMessagesReplacedWith?: string
): void {
  run(nonObjects, value => rejects(schema, instanceFactory(value), property, allMessagesReplacedWith || `is not of a type(s) object`))
  run(emptyObjects, value => accepts(schema, instanceFactory(value)))
  run(identifierStrings, value => accepts(schema, instanceFactory(keyValue(value, `Test String`))))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(keyValue(value, `Test String`)), property, allMessagesReplacedWith || `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  run(nonStrings, value => rejects(schema, instanceFactory(keyValue(`for_eg`, value)), useExactProperty ? property : `${property}.for_eg`, allMessagesReplacedWith || `is not of a type(s) string`))
  describe(`multiple strings`, () => accepts(schema, instanceFactory({
    for_eg: `Test String A`,
    oth_id: `Test String B`,
    anther: `Test String C`,
    lastid: `Test String D`
  })))
}

export function testColumn(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  const message = `is not exactly one from [subschema 0],[subschema 1],[subschema 2],[subschema 3],[subschema 4]`
  run(
    nonObjects,
    value => rejects(schema, instanceFactory(value), property, message)
  )
  describe(`boolean`, () => {
    describe(`unexpected properties`, () => rejects(schema, instanceFactory({
      type: `boolean`,
      label: {},
      default: false,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        label: {},
        default: false
      }), property, message))
      run(nonStrings, value => rejects(schema, instanceFactory({
        type: value,
        label: {},
        default: false
      }), property, message))
      run(
        combinationOf(
          strings,
          setOf(`integer`, `float`, `string`, `entityReference`)
        ),
        value => rejects(schema, instanceFactory({
          type: value,
          label: {},
          default: false
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `boolean`,
        default: false
      }), property, message))
      testLocalizedString(schema, instance => instanceFactory({
        type: `boolean`,
        label: instance,
        default: false
      }), property, true, message)
    })
    describe(`default`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `boolean`,
        label: {}
      }), property, message))
      run(nonBooleans, value => rejects(schema, instanceFactory({
        type: `boolean`,
        label: {},
        default: value
      }), property, message))
      run(booleans, value => accepts(schema, instanceFactory({
        type: `boolean`,
        label: {},
        default: value
      })))
    })
  })
  describe(`string`, () => {
    describe(`unexpected properties`, () => rejects(schema, instanceFactory({
      type: `string`,
      label: {},
      maximumLength: 1,
      default: {},
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        label: {},
        maximumLength: 1,
        default: {},
      }), property, message))
      run(nonStrings, value => rejects(schema, instanceFactory({
        type: value,
        label: {},
        maximumLength: 1,
        default: {},
      }), property, message))
      run(
        combinationOf(
          strings,
          setOf(`boolean`, `integer`, `float`, `entityReference`)
        ),
        value => rejects(schema, instanceFactory({
          type: value,
          label: {},
          maximumLength: 1,
          default: {},
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `string`,
        maximumLength: 1,
        default: {},
      }), property, message))
      testLocalizedString(schema, instance => instanceFactory({
        type: `string`,
        label: instance,
        maximumLength: 1,
        default: {},
      }), property, true, message)
    })
    describe(`maximumLength`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `string`,
        label: {},
        default: {}
      }), property, message))
      run(nonFloats, value => rejects(schema, instanceFactory({
        type: `string`,
        label: {},
        maximumLength: value,
        default: {}
      }), property, message))
      run(
        combinationOf(negativeFloats),
        value => rejects(schema, instanceFactory({
          type: `string`,
          label: {},
          maximumLength: value,
          default: {}
        }), property, message)
      )
      run(
        combinationOf(zeroes, negativeIntegers),
        value => rejects(schema, instanceFactory({
          type: `string`,
          label: {},
          maximumLength: value,
          default: {}
        }), property, message)
      )
      run(positiveIntegers, value => accepts(schema, instanceFactory({
        type: `string`,
        label: {},
        maximumLength: value,
        default: {}
      })))
    })
    describe(`default`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `string`,
        label: {},
        maximumLength: 1
      }), property, message))
      testLocalizedString(schema, value => instanceFactory({
        type: `string`,
        label: {},
        maximumLength: 1,
        default: value
      }), property, true, message)
    })
  })
  describe(`entity reference`, () => {
    describe(`unexpected properties`, () => rejects(schema, instanceFactory({
      type: `entityReference`,
      label: {},
      entityType: `enttyp`,
      default: `defalt`,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        label: {},
        entityType: `enttyp`,
        default: `defalt`
      }), property, message))
      run(nonStrings, value => rejects(schema, instanceFactory({
        type: value,
        label: {},
        entityType: `enttyp`,
        default: `defalt`
      }), property, message))
      run(
        combinationOf(
          strings,
          setOf(`boolean`, `integer`, `float`, `string`)
        ),
        value => rejects(schema, instanceFactory({
          type: value,
          label: {},
          entityType: `enttyp`,
          default: `defalt`
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `entityReference`,
        entityType: `enttyp`,
        default: `defalt`
      }), property, message))
      testLocalizedString(schema, instance => instanceFactory({
        type: `entityReference`,
        label: instance,
        entityType: `enttyp`,
        default: `defalt`
      }), property, true, message)
    })
    describe(`entityType`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `entityReference`,
        label: {},
        default: `defalt`
      }), property, message))
      testIdentifier(schema, value => instanceFactory({
        type: `entityReference`,
        label: {},
        entityType: value,
        default: `defalt`
      }), property, message)
    })
    describe(`default`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `entityReference`,
        label: {},
        entityType: `enttyp`
      }), property, message))
      testIdentifier(schema, value => instanceFactory({
        type: `entityReference`,
        label: {},
        entityType: `enttyp`,
        default: value
      }), property, message)
    })
  })
  describe(`integer`, () => {
    describe(`unexpected properties`, () => rejects(schema, instanceFactory({
      type: `integer`,
      label: {},
      minimum: 0,
      maximum: 0,
      default: 0,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, message))
      run(nonStrings, value => rejects(schema, instanceFactory({
        type: value,
        label: {},
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, message))
      run(
        combinationOf(
          strings,
          setOf(`boolean`, `string`, `entityReference`)
        ),
        value => rejects(schema, instanceFactory({
          type: value,
          label: {},
          minimum: 0,
          maximum: 0,
          default: 0
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `integer`,
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, message))
      testLocalizedString(schema, instance => instanceFactory({
        type: `integer`,
        label: instance,
        minimum: 0,
        maximum: 0,
        default: 0
      }), property, true, message)
    })
    describe(`minimum`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        maximum: 0,
        default: 0
      }), property, message))
      run(nonIntegers, value => rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: value,
        maximum: 0,
        default: 0
      }), property, message))
      run(integers, value => accepts(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: value,
        maximum: 0,
        default: 0
      })))
    })
    describe(`maximum`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        default: 0
      }), property, message))
      run(nonIntegers, value => rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: value,
        default: 0
      }), property, message))
      run(integers, value => accepts(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: value,
        default: 0
      })))
    })
    describe(`default`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: 0
      }), property, message))
      run(nonIntegers, value => rejects(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: 0,
        default: value
      }), property, message))
      run(integers, value => accepts(schema, instanceFactory({
        type: `integer`,
        label: {},
        minimum: 0,
        maximum: 0,
        default: value
      })))
    })
  })
  describe(`float`, () => {
    describe(`unexpected properties`, () => rejects(schema, instanceFactory({
      type: `float`,
      label: {},
      minimum: 0.1,
      maximum: 0.1,
      default: 0.1,
      unexpected: {}
    }), property, message))
    describe(`type`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      run(nonStrings, value => rejects(schema, instanceFactory({
        type: value,
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      run(
        combinationOf(
          strings,
          setOf(`boolean`, `integer`, `string`, `entityReference`)
        ),
        value => rejects(schema, instanceFactory({
          type: value,
          label: {},
          minimum: 0.1,
          maximum: 0.1,
          default: 0.1
        }), property, message)
      )
    })
    describe(`label`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `float`,
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      testLocalizedString(schema, instance => instanceFactory({
        type: `float`,
        label: instance,
        minimum: 0.1,
        maximum: 0.1,
        default: 0.1
      }), property, true, message)
    })
    describe(`minimum`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        maximum: 0.1,
        default: 0.1
      }), property, message))
      run(nonFloats, value => rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: value,
        maximum: 0.1,
        default: 0.1
      }), property, message))
      run(floats, value => accepts(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: value,
        maximum: 0.1,
        default: 0.1
      })))
    })
    describe(`maximum`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        default: 0.1
      }), property, message))
      run(nonFloats, value => rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: value,
        default: 0.1
      }), property, message))
      run(floats, value => accepts(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: value,
        default: 0.1
      })))
    })
    describe(`default`, () => {
      describe(`missing`, () => rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: 0.1
      }), property, message))
      run(nonFloats, value => rejects(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: value
      }), property, message))
      run(floats, value => accepts(schema, instanceFactory({
        type: `float`,
        label: {},
        minimum: 0.1,
        maximum: 0.1,
        default: value
      })))
    })
  })
}

export function testColumnSet(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  run(emptyObjects, value => accepts(schema, instanceFactory(value)))
  run(identifierStrings, value => accepts(schema, instanceFactory(keyValue(value, {
    type: `boolean`,
    label: {},
    default: false
  }))))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(keyValue(value, {
    type: `boolean`,
    label: {},
    default: false
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  testColumn(schema, value => instanceFactory(keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => accepts(schema, instanceFactory({
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

export function testLabelPart(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(exhaustiveIdentifierStrings, value => accepts(schema, instanceFactory([value])))
  run(emptyArrays, value => accepts(schema, instanceFactory(value)))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory([value]), `${property}[0]`, `does not match pattern "^[_a-z0-9]{6}$"`))
  run(nonStrings, value => rejects(schema, instanceFactory([value]), `${property}[0]`, `is not of a type(s) string`))
  run(nonArrays, value => rejects(schema, instanceFactory(value), property, `is not of a type(s) array`))
  describe(`multiple identifiers`, () => accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `__this`])))
  describe(`duplicate identifiers`, () => accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `val_id`, `__this`])))
}

export function testLabel(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonArrays, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`
  ))
  run(emptyArrays, value => accepts(schema, instanceFactory(value)))
  testLabelPart(schema, value => instanceFactory([value]), `${property}[0]`)
  describe(`example`, () => accepts(schema, instanceFactory([
    [`for_eg`, `la_run`, `mu_par`],
    [],
    [`just_1`],
    [`long_w`, `2thetp`, `wanna_`, `depest`, `lore__`]
  ])))
}

export function testEntityType(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => rejects(
    schema,
    instanceFactory({
      singular: {},
      plural: {},
      label: [],
      columns: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`singular`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      plural: {},
      label: [],
      columns: {}
    }), property, `requires property "singular"`))
    testLocalizedString(schema, value => instanceFactory({
      singular: value,
      plural: {},
      label: [],
      columns: {},
    }), `${property}.singular`)
  })
  describe(`plural`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      singular: {},
      label: [],
      columns: {}
    }), property, `requires property "plural"`))
    testLocalizedString(schema, value => instanceFactory({
      singular: {},
      plural: value,
      label: [],
      columns: {},
    }), `${property}.plural`)
  })
  describe(`label`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      singular: {},
      plural: {},
      columns: {}
    }), property, `requires property "label"`))
    testLabel(schema, value => instanceFactory({
      singular: {},
      plural: {},
      label: value,
      columns: {},
    }), `${property}.label`)
  })
  describe(`columns`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      singular: {},
      plural: {},
      label: []
    }), property, `requires property "columns"`))
    testColumnSet(schema, value => instanceFactory({
      singular: {},
      plural: {},
      label: [],
      columns: value,
    }), `${property}.columns`)
  })
}

export function testEntityTypeSet(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  run(emptyObjects, value => accepts(schema, instanceFactory(value)))
  run(identifierStrings, value => accepts(schema, instanceFactory(keyValue(value, {
    singular: {},
    plural: {},
    label: [],
    columns: {}
  }))))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(keyValue(value, {
    singular: {},
    plural: {},
    label: [],
    columns: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  testEntityType(schema, value => instanceFactory(keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => accepts(schema, instanceFactory({
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

export function testMappingKey(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => rejects(
    schema,
    instanceFactory({
      entityType: `for_eg`,
      label: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`entityType`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      label: {}
    }), property, `requires property "entityType"`))
    testIdentifier(schema, value => instanceFactory({
      entityType: value,
      label: {}
    }), `${property}.entityType`)
  })
  describe(`label`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      entityType: `for_eg`
    }), property, `requires property "label"`))
    testLocalizedString(schema, value => instanceFactory({
      entityType: `for_eg`,
      label: value
    }), `${property}.label`)
  })
}

export function testMappingKeySet(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  run(emptyObjects, value => accepts(schema, instanceFactory(value)))
  run(identifierStrings, value => accepts(schema, instanceFactory(keyValue(value, {
    entityType: `for_eg`,
    label: {}
  }))))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(keyValue(value, {
    entityType: `for_eg`,
    label: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  testMappingKey(schema, value => instanceFactory(keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => accepts(schema, instanceFactory({
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

export function testMapping(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => rejects(
    schema,
    instanceFactory({
      keys: {},
      columns: {},
      unexpected: {}
    }), property, `additionalProperty "unexpected" exists in instance when not allowed`
  ))
  describe(`keys`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      columns: {}
    }), property, `requires property "keys"`))
    testMappingKeySet(schema, value => instanceFactory({
      keys: value,
      columns: {}
    }), `${property}.keys`)
  })
  describe(`columns`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      keys: {}
    }), property, `requires property "columns"`))
    testColumnSet(schema, value => instanceFactory({
      keys: {},
      columns: value
    }), `${property}.columns`)
  })
}

export function testMappingSet(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(schema, instanceFactory(value), property, `is not of a type(s) object`))
  run(emptyObjects, value => accepts(schema, instanceFactory(value)))
  run(identifierStrings, value => accepts(schema, instanceFactory(keyValue(value, {
    keys: {},
    columns: {}
  }))))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(keyValue(value, {
    keys: {},
    columns: {}
  })), property, `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`))
  testMapping(schema, value => instanceFactory(keyValue(`for_eg`, value)), `${property}.for_eg`)
  describe(`multiple columns`, () => accepts(schema, instanceFactory({
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

export function testSchema(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`unexpected properties`, () => rejects(schema, instanceFactory({
    localizations: [],
    localizationName: {},
    title: {},
    description: {},
    entityTypes: {},
    mappings: {},
    unexpected: {}
  }), property, `additionalProperty "unexpected" exists in instance when not allowed`))
  describe(`localizations`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "localizations"`))
    testIdentifierSet(schema, instance => instanceFactory({
      localizations: instance,
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.localizations`)
  })
  describe(`localizationName`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      localizations: [],
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "localizationName"`))
    testLocalizedString(schema, instance => instanceFactory({
      localizations: [],
      localizationName: instance,
      title: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.localizationName`)
  })
  describe(`title`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      description: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "title"`))
    testLocalizedString(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: instance,
      description: {},
      entityTypes: {},
      mappings: {}
    }), `${property}.title`)
  })
  describe(`description`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      mappings: {}
    }), property, `requires property "description"`))
    testLocalizedString(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      entityTypes: {},
      description: instance,
      mappings: {}
    }), `${property}.description`)
  })
  describe(`entityTypes`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      mappings: {}
    }), property, `requires property "entityTypes"`))
    testEntityTypeSet(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: instance,
      mappings: {}
    }), `${property}.entityTypes`)
  })
  describe(`mappings`, () => {
    describe(`missing`, () => rejects(schema, instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {}
    }), property, `requires property "mappings"`))
    testMappingSet(schema, instance => instanceFactory({
      localizations: [],
      localizationName: {},
      title: {},
      description: {},
      entityTypes: {},
      mappings: instance
    }), `${property}.mappings`)
  })
}

export function testEntityTypeDataFileRow(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`primary key`, () => testIdentifier(
    schema,
    value => instanceFactory(keyValue(`$`, value)),
    `${property}.$`
  ))
  describe(`mapping key`, () => {
    run(
      combinationOf(nonEmptyStrings, identifierStrings),
      key => rejects(
        schema,
        instanceFactory(keyValue(`$${key}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`$${key}`)} exists in instance when not allowed`
      )
    )
  })
  describe(`unlocalized column`, () => {
    run(
      nonIdentifierStrings,
      key => rejects(
        schema,
        instanceFactory(keyValue(key, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(key)} exists in instance when not allowed`
      )
    )
    run(
      identifierStrings,
      key => run(strings, value => accepts(
        schema,
        instanceFactory(keyValue(key, value))
      ))
    )
    run(
      identifierStrings,
      key => run(nonStrings, value => rejects(
        schema,
        instanceFactory(keyValue(key, value)),
        `${property}.${key}`,
        `is not of a type(s) string`
      ))
    )
  })
  describe(`localized column`, () => {
    runProduct(
      productOf(identifierStrings, identifierStrings),
      (keyA, keyB) => run(strings, value => accepts(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, value))
      ))
    )
    runProduct(
      productOf(identifierStrings, identifierStrings),
      (keyA, keyB) => run(nonStrings, value => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, value)),
        `${property}.${keyA}:${keyB}`,
        `is not of a type(s) string`
      ))
    )
    runProduct(
      productOf(nonIdentifierStrings, identifierStrings),
      (keyA, keyB) => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    runProduct(
      productOf(identifierStrings, nonIdentifierStrings),
      (keyA, keyB) => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    runProduct(
      productOf(nonIdentifierStrings, nonIdentifierStrings),
      (keyA, keyB) => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
  })
  describe(`multi-column`, () => accepts(schema, instanceFactory({
    $: `prikey`,
    col__a: `Test Value A`,
    col__b: `Test Value B`,
    "col__c:loc__a": `Test Value C`,
    "col__c:loc__b": `Test Value D`,
    "col__d:loc__a": `Test Value E`
  })))
}

export function testEntityTypeDataFile(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(emptyArrays, value => accepts(schema, instanceFactory(value)))
  run(nonArrays, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`)
  )
  testEntityTypeDataFileRow(
    schema, value => instanceFactory([value]), `${property}[0]`
  )
  describe(`multi-row`, () => accepts(schema, instanceFactory([{}, {}, {}])))
}

export function testEntityTypeDataFileSet(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(
    schema,
    instanceFactory(value),
    property,
    `is not of a type(s) object`
  ))
  run(emptyObjects, value => accepts(schema, instanceFactory(value)))
  run(
    identifierStrings,
    value => accepts(schema, instanceFactory(keyValue(value, [])))
  )
  run(nonIdentifierStrings, value => rejects(
    schema,
    instanceFactory(keyValue(value, [])),
    property,
    `additionalProperty ${JSON.stringify(value)} exists in instance when not allowed`
  ))
  testEntityTypeDataFile(
    schema,
    value => instanceFactory(keyValue(`for_eg`, value)),
    `${property}.for_eg`
  )
  describe(`multiple files`, () => accepts(schema, instanceFactory({
    for_eg: [],
    oth_id: [],
    anther: [],
    lastid: []
  })))
}

export function testMappingDataFileRow(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(nonObjects, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) object`
  ))
  describe(`primary key`, () => rejects(
    schema,
    instanceFactory(keyValue(`$`, `for_eg`)),
    property,
    `additionalProperty "$" exists in instance when not allowed`
  ))
  describe(`mapping key`, () => {
    run(nonIdentifierStrings, key => rejects(
      schema,
      instanceFactory(keyValue(`$${key}`, `for_eg`)),
      property,
      `additionalProperty ${JSON.stringify(`$${key}`)} exists in instance when not allowed`
    ))
    run(identifierStrings, key => testIdentifier(
      schema,
      value => instanceFactory(keyValue(`$${key}`, value)),
      `${property}.$${key}`
    ))
  })
  describe(`unlocalized column`, () => {
    run(
      nonIdentifierStrings,
      key => rejects(
        schema,
        instanceFactory(keyValue(key, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(key)} exists in instance when not allowed`
      )
    )
    run(
      identifierStrings,
      key => run(strings, value => accepts(
        schema,
        instanceFactory(keyValue(key, value))
      ))
    )
    run(
      identifierStrings,
      key => run(nonStrings, value => rejects(
        schema,
        instanceFactory(keyValue(key, value)),
        `${property}.${key}`,
        `is not of a type(s) string`
      ))
    )
  })
  describe(`localized column`, () => {
    runProduct(
      productOf(identifierStrings, identifierStrings),
      (keyA, keyB) => run(strings, value => accepts(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, value))
      ))
    )
    runProduct(
      productOf(identifierStrings, identifierStrings),
      (keyA, keyB) => run(nonStrings, value => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, value)),
        `${property}.${keyA}:${keyB}`,
        `is not of a type(s) string`
      ))
    )
    runProduct(
      productOf(nonIdentifierStrings, identifierStrings),
      (keyA, keyB) => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    runProduct(
      productOf(identifierStrings, nonIdentifierStrings),
      (keyA, keyB) => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
    runProduct(
      productOf(nonIdentifierStrings, nonIdentifierStrings),
      (keyA, keyB) => rejects(
        schema,
        instanceFactory(keyValue(`${keyA}:${keyB}`, `for_eg`)),
        property,
        `additionalProperty ${JSON.stringify(`${keyA}:${keyB}`)} exists in instance when not allowed`
      )
    )
  })
  describe(`multi-column`, () => accepts(schema, instanceFactory({
    $key__a: `val__a`,
    $key__b: `val__b`,
    $key__c: `val__c`,
    $key__d: `val__d`,
    col__a: `Test Value A`,
    col__b: `Test Value B`,
    "col__c:loc__a": `Test Value C`,
    "col__c:loc__b": `Test Value D`,
    "col__d:loc__a": `Test Value E`
  })))
}

export function testMappingDataFile(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory,
  property: string
): void {
  run(emptyArrays, value => accepts(schema, instanceFactory(value)))
  run(nonArrays, value => rejects(
    schema, instanceFactory(value), property, `is not of a type(s) array`)
  )
  testMappingDataFileRow(
    schema, value => instanceFactory([value]), `${property}[0]`
  )
  describe(`multi-row`, () => accepts(schema, instanceFactory([{}, {}, {}])))
}
