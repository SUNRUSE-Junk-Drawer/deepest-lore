import * as identifier from "./identifier"
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

type Source<T> = (
  callback: Callback<T>
) => void

type InstanceFactory = (value: any) => any

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
