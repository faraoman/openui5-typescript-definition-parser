"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_2 = require("fs");
const path_1 = require("path");
class IndentedOutputWriter {
    /**
     * Create a new IndentedOutputWriter writing content into the specified output file path
     * @constructs IndentedOutputWriter
     * @param {string} outputFilePath Destination file
     */
    constructor(outputFilePath) {
        this.outputFilePath = outputFilePath;
        this.indentChars = "  ";
        this.indentLevel = 0;
        this.lineLength = 100;
        let parentFolderPath = path_1.dirname(outputFilePath);
        if (!fs_2.existsSync(parentFolderPath)) {
            console.log("Creating directory \"" + parentFolderPath + "\"");
            fs_2.mkdirSync(parentFolderPath);
        }
        if (fs_2.existsSync(outputFilePath)) {
            fs_2.unlinkSync(outputFilePath);
        }
        this.filehandle = fs_1.openSync(outputFilePath, "w");
    }
    /**
     * Increase indentation by 1 level
     */
    increaseIndent() {
        this.indentLevel++;
    }
    /**
     * Decrease indentation by 1 level
     */
    decreaseIndent() {
        this.indentLevel--;
    }
    writeLine(line) {
        let indentPrefix = new Array(this.indentLevel + 1).join(this.indentChars);
        fs_1.writeSync(this.filehandle, indentPrefix + line + "\r\n", null, "UTF-8");
    }
    writeChunked(lineModifier, line) {
        if (line) {
            if (line.length > 100) {
                let regexp = new RegExp("(.{0,100})\\s(.*)");
                let result = regexp.exec(line);
                if (!result) {
                    console.log("Cannot write line " + line);
                }
                else {
                    this.writeLine(lineModifier(result[1]));
                    if (result[2].trim().length) {
                        this.writeChunked(lineModifier, result[2]);
                    }
                }
            }
            else {
                this.writeLine(lineModifier(line));
            }
        }
    }
    /**
     * Write open block comment (/**)
     */
    openBlockComment() {
        this.writeLine("/**");
    }
    /**
     * Write close block comment (*\/)
     */
    closeBlockComment() {
        this.writeLine("*/");
    }
    writeTsDocComment(line) {
        if (line) {
            this.writeChunked((str) => { return " * " + str; }, line.replace(/[\r\n]/g, ""));
        }
    }
    newLine() {
        this.writeLine("");
    }
    closeFile() {
        fs_1.closeSync(this.filehandle);
    }
}
exports.IndentedOutputWriter = IndentedOutputWriter;
//# sourceMappingURL=IndentedOutputWriter.js.map