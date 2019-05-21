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
  instance: any
): void {
  it(
    `fails validation`,
    () => expect(jsonschema.validate(instance, schema).errors).not.toEqual([])
  )
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
  callback(`positive integer`, 3)
}

export function negativeIntegers(
  callback: Callback<number>
): void {
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
export const numbers = combinationOf(zeroes, positiveIntegers, negativeIntegers, positiveFloats, negativeFloats)
export const nonObjects = combinationOf<string | boolean | null | number | ReadonlyArray<never>>(strings, booleans, nulls, numbers, emptyArrays)
export const nonArrays = combinationOf(strings, booleans, nulls, numbers, emptyObjects)
export const nonStrings = combinationOf(booleans, nulls, numbers, emptyArrays, emptyObjects)

export function testIdentifier(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory
): void {
  run(exhaustiveIdentifierStrings, value => accepts(schema, instanceFactory(value)))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(value)))
  run(nonStrings, value => rejects(schema, instanceFactory(value)))
}

export function testIdentifierSet(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory
): void {
  run(exhaustiveIdentifierStrings, value => accepts(schema, instanceFactory([value])))
  run(emptyArrays, value => accepts(schema, instanceFactory(value)))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory([value])))
  run(nonStrings, value => rejects(schema, instanceFactory([value])))
  run(nonArrays, value => rejects(schema, instanceFactory(value)))
  describe(`multiple identifiers`, () => accepts(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `__this`])))
  describe(`duplicate identifiers`, () => rejects(schema, instanceFactory([`for_eg`, `val_id`, `like__`, `val_id`, `__this`])))
}

export function testLocalizedString(
  schema: jsonschema.Schema,
  instanceFactory: InstanceFactory
): void {
  run(nonObjects, value => rejects(schema, instanceFactory(value)))
  run(emptyObjects, value => accepts(schema, instanceFactory(value)))
  run(identifierStrings, value => accepts(schema, instanceFactory(keyValue(value, `Test String`))))
  run(nonIdentifierStrings, value => rejects(schema, instanceFactory(keyValue(value, `Test String`))))
  run(nonStrings, value => rejects(schema, instanceFactory(keyValue(`for_eg`, value))))
  describe(`multiple strings`, () => accepts(schema, instanceFactory({
    for_eg: `Test String A`,
    oth_id: `Test String B`,
    anther: `Test String C`,
    lastid: `Test String D`
  })))
}
