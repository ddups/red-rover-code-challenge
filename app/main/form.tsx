import { useState } from "react";
import { createRecord, type Record } from "../types/record";

const validRegex = /^\(([A-Za-z0-9:]+)((,[A-Za-z0-9:]+)|(\([A-Za-z0-9:]+)|(\)+))*\)$/;
const placeholderText = "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)";

export function Form({
  onParseDefault,
  onParseAlpha
}: {
  onParseDefault: (hierarchy: string[]) => void;
  onParseAlpha: (hierarchy: string[]) => void;
}) {
  const [input, setInput] = useState(placeholderText);

  return (
    <form action={submit}
      className="flex flex-col items-center rounded-3xl border border-gray-200 p-6 space-y-4">
      <input type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="w-full text-center rounded-md border border-gray-200"
        placeholder={placeholderText}
      />
      <button
        className="rounded-md border border-gray-200 px-4"
        type="submit">Parse Hierarchies
      </button>
    </form>
  );

  function submit() {
    // reset parsed hierarchies
    onParseDefault([]);
    onParseAlpha([]);

    // normalize and validate input
    let normalizedInput = normalizeInput(input);
    if (!isValidInput(normalizedInput)) {
      alert("Invalid input received, could not parse.");
    } else {
      printInDefaultOrder(normalizedInput);
      printInAlphabeticalOrder(normalizedInput);
    }
  }

  /**
   * Print the hierarchy in the same order that it was received
   * Returns the parsed hierarchy to the parent component via onParse callback
   * @param input The input string to parse and print
   */
  function printInDefaultOrder(input: string) {
    console.log("Printing in default order");

    const chars = [...input];
    let parsedHierarchy: string[] = [];
    let tabLevel = 0;
    let words: string[] = [];
    let word = "";

    chars.forEach((char, i) => {
      switch (char) {
        case ',':
          words.push(word);
          word = "";
          break;
        case '(':
          // if this is not the first group, add a tab for nested groups
          if (i > 0) {
            // add word
            if (word.length > 0) {
              words.push(word);
            }
            word = "";

            // increase tab level
            tabLevel++;
          }
          break;
        case ')':
          // reduce tab level
          tabLevel--;
          if (i == chars.length - 1) {
            // push last word if at end of string
            if (word.length > 0) {
              words.push(word);
            }
          }
          break;
        default:
          // accumulate characters for the current word
          if (word.length === 0) {
            word = getIndentation(tabLevel);
          }
          word += char;
          break;
      }
    });

    parsedHierarchy = words;
    console.log(parsedHierarchy.join("\n"));
    onParseDefault(parsedHierarchy);
  }

  /**
   * Print the hierarchy in alphabetical order, respecting groupings
   * @param input The input string to parse and print
   */
  function printInAlphabeticalOrder(input: string) {
    console.log("Printing in alphabetical order: ");

    let topRecord = parseToRecords(input);
    const parsedHierarchy = getAlphaHierarchy(topRecord);
    console.log(parsedHierarchy.join("\n"));
    onParseAlpha(parsedHierarchy);
  }

  //#region Helper Functions

  /**
   * Normalize the input string by removing whitespace
   * @param input The input string to normalize
   * @returns The normalized string
   */
  function normalizeInput(input: string) {
    return input.trim().replace(/\s+/g, '');
  }

  /**
   * Ensure that the input is valid according to parentheses and regex
   * @param input The input string to validate
   * @returns true if the input is valid, false otherwise
   */
  function isValidInput(input: string) {
    return isValidParentheses(input) && isValidRegex(input);
  }

  /** 
   * Ensure the parentheses are in matching sets 
   * @param input The input string to validate
   * @returns true if the parentheses are valid, false otherwise
   */
  function isValidParentheses(input: string) {
    let parenStack = [];
    for (const char of input) {
      if (char == '(') {
        parenStack.push(char);
      } else if (char == ')') {
        if (parenStack.length == 0) {
          return false;
        } else if (parenStack[parenStack.length - 1] == '(') {
          parenStack.pop();
        }
        else {
          return false;
        }
      }
    }
    return parenStack.length == 0;
  }

  /**
   * Ensure that the input matches the valid format
   * @param input The input string to validate
   * @returns true if the input matches the valid regex, false otherwise
   */
  function isValidRegex(input: string) {
    return validRegex.test(input);
  }

  /**
   * Returns a "prefix" for a string based on the given indent level.
   * @param indentLevel The current indentation level.
   * @returns A string with the appropriate indentation.
   */
  function getIndentation(indentLevel: number = 0): string {
    const prefix = "- ";
    let indent = "";

    // add indentation based on current level
    for (let t = 0; t < indentLevel; t++) {
      indent += "\t";
    }

    return `${indent}${prefix}`;
  }

  /**
   * Breaks down the input string into Record objects and returns a top-level
   * Record which maps the entire input string to a sorted hierarchy of records.
   * @param input The input string to parse
   * @returns a top-level Record representing the entire hierarchy
   */
  function parseToRecords(input: string) {
    const recordMap = new Map<string, Record>();
    let topRecord: Record | null = null;

    let rightParenIndex: number;
    let leftParenIndex: number;

    // continue until we have found the top-level record
    while (!topRecord) {
      // get children (values between parentheses)
      rightParenIndex = input.indexOf(')');
      leftParenIndex = input.lastIndexOf('(', rightParenIndex); // find the matching *left* parenthesis
      const childrenStr = input.substring(leftParenIndex + 1, rightParenIndex);

      // now read the name of the record (value before parentheses),
      // unless leftIndex === 0, then leave blank. create new record
      let recordName = "";
      if (leftParenIndex != 0) {
        recordName = readRecordName(input, leftParenIndex);
      }
      const record = createRecord(recordName);

      const children = childrenStr.split(',');
      // sort the children alphabetically
      record.children = children.sort((a, b) => a.localeCompare(b));

      // iterate over child strings and add to record
      for (const child of record.children) {
        const subRecord = recordMap.get(child);
        if (subRecord) {
          // if there is a sub-record with this name, also set the record's sub-record
          record.subRecords.set(child, subRecord);
        }
      }

      // if there is no name this is the top record, exit on next loop
      if (recordName.length === 0) {
        topRecord = record;
      } else {
        // otherwise, add this record to the map
        recordMap.set(recordName, record);

        // remove record from the input string
        const preRecord = input.substring(0, leftParenIndex);
        const postRecord = input.substring(rightParenIndex + 1);
        input = `${preRecord}${postRecord}`;
      }
    }

    return topRecord!;
  }

  /**
   * Back-track through a string starting from a left parenthesis until 
   * a non-alphanumeric character is found.
   * @param input
   * @param leftIndex
   * @returns a string representing the name of the record
   */
  function readRecordName(input: string, leftIndex: number): string {
    let rightIndex = leftIndex;
    leftIndex = rightIndex - 1;

    let char = input.charAt(leftIndex);
    while (leftIndex > 0 && /[A-Za-z0-9:]/.test(char)) {
      char = input.charAt(--leftIndex);
    }

    return input.substring(leftIndex + 1, rightIndex);
  }

  /**
   * Recursively generates the final indented string array from the top record.
   * @param record The current Record node.
   * @param indentLevel The current level of indentation (default is 0).
   * @returns An array of strings representing the sorted, indented hierarchy.
   */
  function getAlphaHierarchy(record: Record | null, indentLevel: number = 0): string[] {
    if (!record) return [];

    const hierarchy: string[] = [];
    // determine number of tabs to prepend based on level
    let prefix = getIndentation(indentLevel);

    // iterate over the children, which are already sorted alphabetically
    for (const childName of record.children) {
      // add the current child name
      hierarchy.push(`${prefix}${childName}`);

      const subRecord = record.subRecords.get(childName);
      if (subRecord) {
        // if there is a subRecord, get its hierarchy before adding the next child
        hierarchy.push(...getAlphaHierarchy(subRecord, indentLevel + 1));
      }
    }

    return hierarchy;
  }

  //#endregion
}