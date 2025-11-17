/**
 * Represents a (set of) string(s) grouped by a set of parentheses in the input string. 
 * A Record's children are the values contained within the parentheses, and its name is 
 * the value directly preceding the parentheses. A top-level Record will have the name "". 
 * 
 * The children of a Record are stored in an array of strings, and will need to be sorted 
 * to return in alphabetical order.
 * 
 * The subRecords map contains nested Records, keyed by their name.
 */
export interface Record {
    name: string;
    children: string[];
    subRecords: Map<string, Record>;
}

/**
 * Helper function to create a new record (essentially a constructor).
 * @param name The name of the record
 * @returns A new Record object
 */
export function createRecord(name: string): Record {
    return {
        name: name,
        children: [],
        subRecords: new Map<string, Record>(),
    };
}
