import * as jsonschema from "jsonschema"
import * as _schema from "./schema/schema"
import * as data from "./csv/data"

export const schema: jsonschema.Schema = {
  description: `A full set of schema and data.`,
  type: `object`,
  additionalProperties: false,
  required: [
    `schema`,
    `data`
  ],
  properties: {
    schema: _schema.schema,
    data: data.schema
  }
}

/**
 * A full set of schema and data.
 */
export type Type = {
  /**
   * The imported schema.
   */
  readonly schema: _schema.Type

  /**
   * The imported data.
   */
  readonly data: data.Type
}
