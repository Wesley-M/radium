import defDark from "@design-system/theme/schemes/default-dark.json"
import defLight from "@design-system/theme/schemes/default-light.json"
import solDark from "@design-system/theme/schemes/solarized-dark.json"
import solLight from "@design-system/theme/schemes/solarized-light.json"
import monDark from "@design-system/theme/schemes/monokai-dark.json"
import monLight from "@design-system/theme/schemes/monokai-light.json"
import { Theme } from "@design-system/theme/types"
import { Equals, assert } from "tsafe"

/** 
 * This is a type assertion (in compilation time) that will fail 
 * if the json type differs from the Theme.
*/
assert<Equals<typeof defDark, Theme>>()
assert<Equals<typeof defLight, Theme>>()
assert<Equals<typeof solDark, Theme>>()
assert<Equals<typeof solLight, Theme>>()
assert<Equals<typeof monDark, Theme>>()
assert<Equals<typeof monLight, Theme>>()