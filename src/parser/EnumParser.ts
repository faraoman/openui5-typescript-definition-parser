import { IndentedOutputWriter } from "../util";

export class EnumParser {
    constructor(protected writer: IndentedOutputWriter, protected enumSymbol: ts_gen.api.Symbol) {

    }

    public generate(): void {

        this.writer.openBlockComment();
        this.writer.writeTsDocComment(this.enumSymbol.description);
        this.writer.closeBlockComment();
        this.writer.writeLine("enum " + this.enumSymbol.basename + " {");
        this.writer.increaseIndent();

        if (this.enumSymbol.properties) {
            for (var i: number = 0; i < this.enumSymbol.properties.length; i++) {
                let property: ts_gen.api.Property = this.enumSymbol.properties[i];
                let line: string = "\"" + property.name + "\"";
                if (i !== this.enumSymbol.properties.length - 1) {
                    line += ",";
                }
                this.writer.writeLine(line);
            }
        }


        this.writer.decreaseIndent();
        this.writer.writeLine("}");
    }
}