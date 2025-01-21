export function date(date?: Date) {
    const dateNew = new Date(date || Date.now())
    return dateNew;
}