import * as jsonschema from "jsonschema"
import * as booleanColumn from "./boolean-column"
import * as stringColumn from "./string-column"
import * as entityReferenceColumn from "./entity-reference-column"
import * as integerColumn from "./integer-column"
import * as floatColumn from "./float-column"

export const schema: jsonschema.Schema = {
  description: `A column.`,
  oneOf: [
    booleanColumn.schema,
    stringColumn.schema,
    entityReferenceColumn.schema,
    integerColumn.schema,
    floatColumn.schema
  ]
}

/**
 * A column.
 */
export type Type =
  | booleanColumn.Type
  | stringColumn.Type
  | entityReferenceColumn.Type
  | integerColumn.Type
  | floatColumn.Type
