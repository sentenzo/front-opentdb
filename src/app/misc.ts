const entities: { [key: string]: string } = {
    'amp': '&',
    'apos': '\'',
    '#x27': '\'',
    '#x2F': '/',
    '#39': '\'',
    '#039': '\'',
    '#47': '/',
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'quot': '"'
}

export function decodeHTMLEntities(text: string) {
    return text.replace(/&([^;]+);/gm, function (match, entity) {
        return entities[entity] || match
    });
}
