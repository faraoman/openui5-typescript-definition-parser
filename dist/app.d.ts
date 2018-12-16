export interface IConfigDef {
    namespaces?: string[];
    outFilePath?: string;
    methodExceptionsFile?: string;
    typeConfigFile?: string;
}
export declare function parseDefinitions(config: IConfigDef): void;
