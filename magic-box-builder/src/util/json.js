export const jsonToObjEscape = str =>  {
    return str.replace("\\n", "\\\\n").replace("\\r", "\\\\r").replace("\\t", "\\\\t");
}

export const objTojsonEscape = str =>  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}
