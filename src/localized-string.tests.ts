import "jasmine"
import * as localizedString from "./localized-string"
import * as shared from "./shared.tests"

describe(`localized string`, () => {
  shared.testLocalizedString(localizedString.schema, instance => instance, `instance`)
})
