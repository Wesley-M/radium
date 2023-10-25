export const getTranslationMetadata = (t: any, id: string) => {
    if (!id) return { title: "", description: "" }
    
    const capitalize = (s: string) => {
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const getNameForIntroduction = (id: string) => {
        const namePieces = id.split("_").slice(1)
        return namePieces ? namePieces.map(capitalize).join(" ") : ""
    }

    if (id.startsWith("introducing")) {
        return {
            title: `${t("assets.stations.introducing.title", { name: getNameForIntroduction(id) })}`,
            description: `${t("assets.stations.introducing.description", { name: getNameForIntroduction(id) })}`
        }
    }

    return {
        title: t(`assets.stations.${id}.title`),
        description: t(`assets.stations.${id}.description`)
    }
}
