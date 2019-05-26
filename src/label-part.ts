import * as jsonschema from "jsonschema"
import * as identifier from "./identifier"

export const schema: jsonschema.Schema = {
    description: `A chain of column identifiers which can be followed to find a value which is to be used as part of a label.`,
    type: `array`,
    items: identifier.schema
}

/**
 * A chain of column identifiers which can be followed to find a value which is to be used as part of a label.
 */
export type Type = ReadonlyArray<identifier.Type>
