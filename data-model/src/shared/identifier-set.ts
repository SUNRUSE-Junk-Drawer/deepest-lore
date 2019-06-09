import * as jsonschema from "jsonschema"
import * as identifier from "./identifier"

export const schema: jsonschema.Schema = {
  description: `A set of invariant identifiers.`,
  type: `array`,
  uniqueItems: true,
  items: identifier.schema
}

/**
 * A set of invariant identifiers.
 */
export type Type = ReadonlyArray<identifier.Type>
