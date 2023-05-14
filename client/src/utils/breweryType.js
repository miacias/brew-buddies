// gives more details about types of brewery

export default function breweryType(type) {
    const firstLetterCaps = type.charAt(0).toUpperCase() + type.slice(1);
    switch (type) {
        case 'micro':
            return `${firstLetterCaps}! Craft brewery, the most common type. For example, Samual Adams is still considered a micro brewery!`;
        case 'nano':
            return `${firstLetterCaps}! An extremely small brewery which typically only distributes locally.`;
        case 'regional':
            return `${firstLetterCaps}! A regional location of an expanded brewery. Ex. Sierra Nevada's Asheville, NC location.`;
        case 'brewpub':
            return `${firstLetterCaps}! A beer-focused restaurant or restaurant/bar with a brewery on-premise.`;
        case 'large':
            return `${firstLetterCaps}! A very large brewery... likely not for visitors. Ex. Miller-Coors.`;
        case 'planning':
            return `${firstLetterCaps}! A brewery in planning or not yet opened to the public.`;
        case 'bar':
            return `${firstLetterCaps}! A bar. No brewery equipment on premise but definitely beer!`;
        case 'contract':
            return `${firstLetterCaps}! A brewery that uses another brewery's equipment.`
        case 'proprietor':
            return `${firstLetterCaps}! Similar to contract brewing but refers more to a brewery incubator.`;
        case 'closed':
            return `${firstLetterCaps}! This location has been closed. Nooooo!!!`;
        default: ; // no default
    }
}