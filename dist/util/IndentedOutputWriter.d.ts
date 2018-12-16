export declare class IndentedOutputWriter {
    protected outputFilePath: string;
    private indentChars;
    private indentLevel;
    private lineLength;
    private filehandle;
    /**
     * Create a new IndentedOutputWriter writing content into the specified output file path
     * @constructs IndentedOutputWriter
     * @param {string} outputFilePath Destination file
     */
    constructor(outputFilePath: string);
    /**
     * Increase indentation by 1 level
     */
    increaseIndent(): void;
    /**
     * Decrease indentation by 1 level
     */
    decreaseIndent(): void;
    writeLine(line: string): void;
    writeChunked(lineModifier: (string: string) => string, line: string): void;
    /**
     * Write open block comment (/**)
     */
    openBlockComment(): void;
    /**
     * Write close block comment (*\/)
     */
    closeBlockComment(): void;
    writeTsDocComment(line: string): void;
    newLine(): void;
    closeFile(): void;
}
