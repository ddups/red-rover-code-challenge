import { useState } from "react";

const validRegex = /^\(([A-Za-z0-9:]+)((,[A-Za-z0-9:]+)|(\([A-Za-z0-9:]+)|(\)+))*\)$/;
const placeholderText = "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)";
let parsedHierarchy: string[] = [];

export function Form({ onParse }: { onParse: (hierarchy: string[]) => void }) {
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
        type="submit">Parse Hierarchy
      </button>
    </form>
  );

  function submit() {
    // reset parsed hierarchy
    onParse([]);
    let normalizedInput = normalizeInput(input);
    if (!isValidInput(normalizedInput)) {
      alert("Invalid input received, could not parse.");
    } else {
      printInDefaultOrder(normalizedInput);
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
    const prefix = "- ";
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
            // add tabs based on current level
            for (let t = 0; t < tabLevel; t++) {
              word += "\t";
            }
            // add a hyphen and space before new words
            word += prefix;
          }
          word += char;
          break;
      }
    });

    parsedHierarchy = words;
    console.log(parsedHierarchy.join("\n"));
    onParse(parsedHierarchy);
  }

  /**
   * NOT IMPLEMENTED
   * Print the hierarchy in alphabetical order, respecting groupings
   * @param input The input string to parse and print
   */
  function printInAlphabeticalOrder(input: string) {
    // Placeholder for actual print logic
    console.log("Printing in alphabetical order: ");
  }

  /* HELPER FUNCTIONS */

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
    for (let char of input) {
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
}