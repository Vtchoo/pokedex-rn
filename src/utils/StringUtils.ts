class StringUtils {

    static capitalize(original: string) {
        return original.charAt(0).toUpperCase() + original.slice(1)
    }
}

export default StringUtils