import { readFileSync } from "fs";
import { get } from "https";
import { IndentedOutputWriter } from "../util";
import { NamespaceParser } from "./NamespaceParser";
export class LibraryParser {
    public allNamespaces: ts_gen.api.Symbol[];
    public jQueryAdditionalContent: string;

    public jQuerySapDefs: string = `
interface Ui5Logger {
    //Allows to add a new LogListener that will be notified for new log entries.
    addLogListener(oListener)
    //Creates a new debug-level entry in the log with the given message, details and calling component.
    debug(sMessage: string, sDetails?: string, sComponent?: string)
    //Creates a new error-level entry in the log with the given message, details and calling component.
    error(sMessage: string, sDetails?: string, sComponent?: string)
    //Creates a new fatal-level entry in the log with the given message, details and calling component.
    fatal(sMessage: string, sDetails?: string, sComponent?: string)
    //Returns the log level currently effective for the given component.
    getLevel(sComponent?: string)
    //Returns the logged entries recorded so far as an array.
    getLogEntries()
    //Returns a jQuery.sap.log.Logger for the given component.
    getLogger(sComponent: string, iDefaultLogLevel?)
    //Creates a new info-level entry in the log with the given message, details and calling component.
    info(sMessage: string, sDetails?: string, sComponent?: string)
    //Checks whether logging is enabled for the given log level, depending on the currently effective log level for the given component.
    isLoggable(iLevel?, sComponent?: string)
    //Allows to remove a registered LogListener.
    removeLogListener(oListener)
    //Defines the maximum jQuery.sap.log.Level of log entries that will be recorded.
    setLevel(iLogLevel, sComponent?: string)
    //Creates a new trace-level entry in the log with the given message, details and calling component.
    trace(sMessage: string, sDetails?: string, sComponent?: string)
    //Creates a new warning-level entry in the log with the given message, details and calling component.
    warning(sMessage: string, sDetails?: string, sComponent?: string)
}

interface JquerySap {
    log: Ui5Logger
    // Adds a whitelist entry for URL valiadtion 
    addUrlWhitelist(protocol, host, port, path)
    // Calculate delta of old list and new list This implements the algorithm described in "A Technique for Isolating Differences Between Files" (Commun. 
    arrayDiff(aOld, aNew, fnCompare?, bUniqueEntries?)
    // A simple assertion mechanism that logs a message when a given condition is not met. 
    assert(bResult, sMessage)
    // Binds all events for listening with the given callback function. 
    bindAnyEvent(fnCallback)
    // Shortcut for jQuery("#" + id) with additionally the id being escaped properly. 
    byId(sId, oContext)
    // Transforms a hyphen separated string to an camel case string. 
    camelCase(sString)
    // Converts a character of the string to upper case. 
    charToUpperCase(sString, iPos)
    // Checks a given mouseover or mouseout event whether it is equivalent to a mouseenter or mousleave event regarding the given DOM reference. 
    checkMouseEnterOrLeave(oEvent, oDomRef)
    // Stops the delayed call. 
    clearDelayedCall(sDelayedCallId)
    // Stops the interval call. 
    clearIntervalCall(sIntervalCallId)
    // clears the whitelist for URL valiadtion 
    clearUrlWhitelist()
    // Returns whether oDomRefChild is oDomRefContainer or is contained in oDomRefContainer. 
    containsOrEquals(oDomRefContainer, oDomRefChild)
    // Declares a module as existing. 
    declare(sModuleName, bCreateNamespace?)
    // Calls a method after a given delay and returns an id for this timer 
    delayedCall(iDelay, oObject, method, aParameters?)
    // For the given scroll position measured from the "beginning" of a container (the right edge in RTL mode) this method returns the scrollLeft value as understood by the current browser in RTL mode. 
    denormalizeScrollBeginRTL(iNormalizedScrollBegin, oDomRef)
    // For the given scrollLeft value this method returns the scrollLeft value as understood by the current browser in RTL mode. 
    denormalizeScrollLeftRTL(iNormalizedScrollLeft, oDomRef)
    // Disable touch to mouse handling 
    disableTouchToMouseHandling()
    // Shortcut for document.getElementById(), including a bug fix for older IE versions. 
    domById(sId, oWindow?)
    // Encode the string for inclusion into CSS string literals or identifiers 
    encodeCSS(sString)
    // Encode the string for inclusion into HTML content/attribute 
    encodeHTML(sString)
    // Encode the string for inclusion into a JS string literal 
    encodeJS(sString)
    // Encode the string for inclusion into an URL parameter 
    encodeURL(sString)
    // Encode a map of parameters into a combined URL parameter string 
    encodeURLParameters(mParams)
    // Encode the string for inclusion into XML content/attribute 
    encodeXML(sString)
    // Checks whether a given sString ends with sEndString respecting the case of the strings. 
    endsWith(sString, sEndString)
    // Checks whether a given sString ends with sEndString ignoring the case of the strings. 
    endsWithIgnoreCase(sString, sEndString)
    // Compares the two given values for equality, especially takes care not to compare arrays and objects by reference, but compares their content. 
    equal(a, b, maxDepth?, contains?)
    // This function escapes the reserved letters in Regular Expression 
    escapeRegExp(sString)
    // Returns a new constructor function that creates objects with the given prototype. 
    factory(oPrototype)
    // Calls focus() on the given DOM element, but catches and ignores any errors that occur when doing so. 
    focus(oDomRef)
    // Creates a string from a pattern by replacing placeholders with concrete values. 
    formatMessage(sPattern, aValues?)
    // Returns the names of all declared modules. 
    getAllDeclaredModules()
    // Constructs an URL to load the module with the given name and file type (suffix). 
    getModulePath(sModuleName, sSuffix)
    // Returns a JavaScript object which is identified by a sequence of names. 
    getObject(sName, iNoCreates?, oContext?)
    // Determines the URL for a resource given its unified resource name. 
    getResourcePath(sResourceName)
    // Returns a new function that returns the given oValue (using its closure). 
    getter(oValue)
    // Creates and returns a new instance of jQuery.sap.util.UriParameters. 
    getUriParameters(sUri)
    // Gets the whitelist for URL valiadtion 
    getUrlWhitelist()
    // Executes an 'eval' for its arguments in the global context (without closure variables). 
    globalEval()
    // Transforms a camel case string into a hyphen separated string. 
    hyphen(sString)
    // Includes the script (via <script>-tag) into the head for the specified sUrl and optional sId. 
    includeScript(sUrl, sId?, fnLoadCallback?, fnErrorCallback?)
    // Includes the specified stylesheet via a <link>-tag in the head of the current document. 
    includeStyleSheet(sUrl, sId?, fnLoadCallback?, fnErrorCallback?)
    // Does some basic modifications to the HTML page that make it more suitable for mobile apps. 
    initMobile(options?)
    // Calls a method after a given interval and returns an id for this interval. 
    intervalCall(iInterval, oObject, method, aParameters?)
    // Check whether a given module has been loaded / declared already. 
    isDeclared(sModuleName, bIncludePreloaded?)
    // Returns a new object which has the given oPrototype as its prototype. 
    newObject(oPrototype)
    // Returns the window reference for a DomRef 
    ownerWindow(oDomRef)
    // Pads a string on the left side until is has the given length. 
    padLeft(sString, sPadChar, iLength)
    // Pads a string on the right side until is has the given length. 
    padRight(sString, sPadChar, iLength)
    // Parses the specified XML formatted string text using native parsing function of the browser and returns a valid XML document. 
    parseXML(sXMLText)
    // Creates and returns a new instance of jQuery.sap.util.Properties. 
    properties(mParams?)
    // Registers an URL prefix for a module name prefix. 
    registerModulePath(sModuleName, vUrlPrefix)
    // Registers an URL prefix for a resource name prefix. 
    registerResourcePath(sResourceNamePrefix, vUrlPrefix)
    // Removes a whitelist entry for URL valiadtion 
    removeUrlWhitelist(iIndex)
    // Ensures that the given module is loaded and executed before execution of the current script continues. 
    require(vModuleName)
    // Creates and returns a new instance of jQuery.sap.util.ResourceBundle using the given URL and locale to determine what to load. 
    resources(mParams?)
    // Returns the size (width of the vertical / height of the horizontal) native browser scrollbars. 
    scrollbarSize(sClasses?, bForce?)
    // Serializes the specified XML document into a string representation. 
    serializeXML(oXMLDocument)
    // Sets the bookmark icon for desktop browsers and the icon to be displayed on the home screen of iOS devices after the user does "add to home screen". 
    setIcons(oIcons)
    // Sets the "apple-mobile-web-app-capable" and "mobile-web-app-capable" meta information which defines whether the application is loaded in full screen mode (browser address bar and toolbar are hidden) after the user does "add to home screen" on mobile devices. 
    setMobileWebAppCapable(bValue)
    // Sets an object property to a given value, where the property is identified by a sequence of names (path). 
    setObject(sName, vValue, oContext?)
    // Convenience wrapper around jQuery.ajax() that avoids the need for callback functions when synchronous calls are made. 
    sjax(oOrigSettings)
    // Checks whether a given sString starts with sStartString respecting the case of the strings. 
    startsWith(sString, sStartString)
    // Checks whether a given sString starts with sStartString ignoring the case of the strings. 
    startsWithIgnoreCase(sString, sStartString)
    // Convenience wrapper for jQuery.sap.sjax that enforeces the Http method GET and defaults the data type of the result to 'text'. 
    syncGet(sUrl, data, sDataType?)
    // Convenience wrapper for jQuery.sap.sjax that enforces the Http method GET and the data type 'json'. 
    syncGetJSON(sUrl, data, fallback?)
    // Convenience wrapper for jQuery.sap.sjax that enforces the Http method GET and the data type 'text'. 
    syncGetText(sUrl, data, fallback?)
    // Convenience wrapper for jQuery.sap.sjax that enforces the Http method POST and defaults the data type of the result to 'text'. 
    syncPost(sUrl, data, sDataType?)
    // Search ancestors of the given source DOM element for the specified CSS class name. 
    syncStyleClass(sStyleClass, vSource, vDestination)
    // Creates and returns a pseudo-unique id. 
    uid()
    // Unbinds all events for listening with the given callback function. 
    unbindAnyEvent(fnCallback)
    // Sorts the given array in-place and removes any duplicates (identified by "==="). 
    unique(a)
    // Validates an URL. 
    validateUrl(sUrl)
}
interface JQueryStatic {
    sap: JquerySap
}
    `;

    constructor(protected writer: IndentedOutputWriter, protected symbols: ts_gen.api.Symbol[], protected namespaces: ts_gen.api.Symbol[]) {
        this.allNamespaces = namespaces.slice(0);
    }

    public buildNamespaceParser(ns: ts_gen.api.Symbol, parentCtx: string): NamespaceParser {
        console.log(ns.name);

        if (ns.name === "sap.ui.core.mvc") {
            console.log();
        }

        let namespaceParser: NamespaceParser = new NamespaceParser(this.writer, ns, parentCtx);

        let containedClasses: ts_gen.api.Symbol[] = this.filterMatching("class", ns);
        let containedNamespaces: ts_gen.api.Symbol[] = this.filterMatching("namespace", ns);
        let containedInterfaces: ts_gen.api.Symbol[] = this.filterMatching("interface", ns);
        let containedEnums: ts_gen.api.Symbol[] = this.filterMatching("enum", ns);

        namespaceParser.addContainedClasses(containedClasses);
        namespaceParser.addContainedInterfaces(containedInterfaces);
        namespaceParser.addContainedEnums(containedEnums);

        if (ns.name === "jQuery") {
            namespaceParser.setAdditionalContent(this.jQueryAdditionalContent);
        }

        let parsedSymbols: ts_gen.api.Symbol[] = containedClasses.concat(containedNamespaces, containedInterfaces, containedEnums);
        for (let i: number = parsedSymbols.length - 1; i >= 0; i--) {
            this.symbols.splice(this.symbols.indexOf(parsedSymbols[i]), 1);
        }

        for (let i: number = containedNamespaces.length - 1; i >= 0; i--) {
            this.namespaces.splice(this.namespaces.indexOf(containedNamespaces[i]), 1);
        }

        namespaceParser.addContainedNamespaceParsers(containedNamespaces.map((containedNamespace: ts_gen.api.Symbol) => this.buildNamespaceParser(containedNamespace, ns.name)));

        return namespaceParser;
    }

    public generate(): void {
        let rootNamespaces: ts_gen.api.Symbol[] = this.namespaces.filter((e) => e.name === "sap");
        get("https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/jquery/jquery.d.ts", (res) => {
            this.jQueryAdditionalContent = "";

            res.on("data", (chunk) => {
                this.jQueryAdditionalContent += chunk;
            });

            res.on("end", () => {
                let jQueryLines: string[] = this.jQueryAdditionalContent.split(/[\r\n]+/);
                jQueryLines.forEach((line) => this.writer.writeLine(line));

                this.writer.newLine();
                this.writer.newLine();
                this.writer.newLine();

                this.jQuerySapDefs.split(/[\r\n]+/).forEach((line) => {
                    this.writer.writeLine(line);
                });

                for (let ns of rootNamespaces) {
                    this.buildNamespaceParser(ns, "").generate();
                }
            });
        });

        console.log("Unmatched symbols: " + this.symbols.map((e) => e.name).reduce((a, b) => a + ", " + b));
    }

    private filterMatching(kind: string, namespace: ts_gen.api.Symbol): ts_gen.api.Symbol[] {
        return this.symbols.filter((e) => {
            let rootSpacesMatching = this.allNamespaces.filter((n) => e.name.startsWith(n.name) && n.name !== e.name).sort((a, b) => b.name.length - a.name.length);
            return e.kind === kind && e.name.startsWith(namespace.name) && rootSpacesMatching.length && rootSpacesMatching[0].name.length === namespace.name.length && e.name !== namespace.name;
        });
    }
}