// gives more details about types of brewery

export default function breweryType(type) {
    switch (type) {
        case 'micro':
            return 'Craft brewery, the most common type. For example, Samual Adams is still considered a micro brewery!';
        case 'nano':
            return 'An extremely small brewery which typically only distributes locally.';
        case 'regional':
            return 'A regional location of an expanded brewery. Ex. Sierra Nevada\'s Asheville, NC location.';
        case 'brewpub':
            return 'A beer-focused restaurant or restaurant/bar with a brewery on-premise.';
        case 'large':
            return 'A very large brewery... likely not for visitors. Ex. Miller-Coors.';
        case 'planning':
            return 'A brewery in planning or not yet opened to the public.';
        case 'bar':
            return 'A bar. No brewery equipment on premise but definitely beer!'
        case 'contract':
            return 'A brewery that uses another brewery\'s equipment.'
        case 'proprietor':
            return 'Similar to contract brewing but refers more to a brewery incubator.'
        case 'closed':
            return 'This location has been closed. Nooooo!!!';
        default: ; // no default
    }
}