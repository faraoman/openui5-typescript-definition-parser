export interface ITypeConfig {
    ignoredTypes: string[];
    typeMapping: {
        [id: string]: string;
    };
}
export declare class TypeUtil {
    static namespaces: string[];
    static _config: ITypeConfig;
    static sapUiTypeToTSType(type: string): any;
}
