const objectHasKeys = (obj, attrs) => {
    const isValidKey = (selectedKey) => attrs.find(key => key === selectedKey)
    const getValidKeys = () => Object.keys(obj).filter(key => isValidKey(key))
    return getValidKeys().length === attrs.length
}

export const ValidateUtils = {
    objectHasKeys
}