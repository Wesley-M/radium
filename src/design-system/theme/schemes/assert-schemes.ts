import dark from "@design-system/theme/schemes/dark.json"
import light from "@design-system/theme/schemes/dark.json"
import { Theme } from "@design-system/theme/types"
import { Equals, assert } from "tsafe"

/** 
 * This is a type assertion (in compilation time) that will fail 
 * if the json type differs from the Theme.
*/
assert<Equals<typeof dark, Theme>>()
assert<Equals<typeof light, Theme>>()