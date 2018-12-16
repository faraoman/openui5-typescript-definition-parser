import { closeSync, openSync, writeSync } from "fs";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { dirname } from "path";

export class IndentedOutputWriter {

    private indentChars = "  ";
    private indentLevel: number = 0;
    private lineLength: number = 100;

    private filehandle: number;

    /**
     * Create a new IndentedOutputWriter writing content into the specified output file path
     * @constructs IndentedOutputWriter
     * @param {string} outputFilePath Destination file
     */
    constructor(protected outputFilePath: string) {
        let parentFolderPath: string = dirname(outputFilePath);

        if (!existsSync(parentFolderPath)) {
            console.log("Creating directory \"" + parentFolderPath + "\"");
            mkdirSync(parentFolderPath);
        }

        if (existsSync(outputFilePath)) {
            unlinkSync(outputFilePath);
        }

        this.filehandle = openSync(outputFilePath, "w");
    }

    /**
     * Increase indentation by 1 level
     */
    public increaseIndent(): void {
        this.indentLevel++;
    }

    /**
     * Decrease indentation by 1 level
     */
    public decreaseIndent(): void {
        this.indentLevel--;
    }

    public writeLine(line: string): void {
        let indentPrefix: string = new Array(this.indentLevel + 1).join(this.indentChars);
        writeSync(this.filehandle, indentPrefix + line + "\r\n", null, "UTF-8");
    }

    public writeChunked(lineModifier: (string: string) => string, line: string): void {
        if (line) {
            if (line.length > 100) {
                let regexp: RegExp = new RegExp("(.{0,100})\\s(.*)");
                let result: RegExpExecArray = regexp.exec(line);
                if (!result) {
                    console.log("Cannot write line " + line);
                } else {
                    this.writeLine(lineModifier(result[1]));
                    if (result[2].trim().length) {
                        this.writeChunked(lineModifier, result[2]);
                    }
                }
            } else {
                this.writeLine(lineModifier(line));
            }
        }
    }

    /**
     * Write open block comment (/**)
     */
    public openBlockComment(): void {
        this.writeLine("/**");
    }

    /**
     * Write close block comment (*\/)
     */
    public closeBlockComment(): void {
        this.writeLine("*/");
    }
    public writeTsDocComment(line: string): void {
        if (line) {
            this.writeChunked((str: string) => { return " * " + str; }, line.replace(/[\r\n]/g, ""));
        }

    }

    public newLine(): void {
        this.writeLine("");
    }

    public closeFile(): void {
        closeSync(this.filehandle);
    }
}