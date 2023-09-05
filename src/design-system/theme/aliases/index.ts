import aliases from "./aliases.json"

/**
 * The aliases.json file is auto-generated when running the application, so
 * don't edit directly, given that your changes will be lost.
*/

export type Aliases = typeof aliases
export type ColorAlias = keyof Aliases["colors"]
export type SpacingAlias = keyof Aliases["spacing"]
export type BorderAlias = keyof Aliases["border"]
export type AvatarAlias = keyof Aliases["image"]

export const alias = <Type extends keyof Aliases>(namespace: Type, name: keyof Aliases[Type]): Aliases[Type][typeof name] => {
    return aliases[namespace][name]
}