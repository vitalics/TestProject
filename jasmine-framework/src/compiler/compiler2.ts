import * as ts from 'typescript';
import * as fs from 'fs';

import { TestStore, Test, TestStructure } from './compiler.store';
import { SyntaxAnalizer } from './syntax.analizator';

const store = TestStore.Store;

interface DocEntry {
  name?: string;
  fileName?: string;
  documentation?: string;
  type?: string;
  constructors?: DocEntry[];
  parameters?: DocEntry[];
  returnType?: string;
}

const resultFile = ts.createSourceFile(
  'someFileName.ts',
  '',
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
);
const printer = ts.createPrinter({
  newLine: ts.NewLineKind.CarriageReturnLineFeed,
  removeComments: false
});

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): void {
  // Build a program using the set of root file names in fileNames
  let program = ts.createProgram(fileNames, options);

  // Get the checker, we will use it to find more about classes
  let checker = program.getTypeChecker();

  let output: DocEntry[] = [];

  // Visit every sourceFile in the program
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      // Walk the tree to search for classes
      ts.forEachChild(sourceFile, visit);
      const result = printer.printNode(ts.EmitHint.SourceFile, sourceFile, resultFile);
      console.log(result);
    }
  }

  // print out the doc
  fs.writeFileSync('classes.js', JSON.stringify(output, undefined, 4));

  return;

  /** visit nodes finding exported classes */
  function visit(node: ts.Node) {
    // Only consider exported nodes
    if (!isNodeExported(node)) {
      return;
    }

    SyntaxAnalizer.analize(program, node);

    //   if (ts.isMethodDeclaration(node) && node.name && node.decorators) {
    //     let decoratorsForClass = node.decorators;

    //     for (const decorator of decoratorsForClass) {
    //       const fullDecoratorName = decorator.expression.getText();
    //       const splittedArr: string[] = fullDecoratorName.match(/\w+|"[^"]+"/g);
    //       const decoratorName = splittedArr[0];

    //       if (decoratorName == `it`) {
    //         TestStore.setDescribe({ description: splittedArr[1] });
    //         console.log(TestStore.Store);
    //         decorator.expression.getSourceFile();
    //         let symbol = checker.getSymbolAtLocation(node.name);
    //         if (symbol) {
    //           output.push(serializeClass(symbol));
    //         }
    //         // tests[0].description = decorator.expression.getChildCount();
    //       }
    //       if (decorator.expression.getText() === 'Test') {
    //       }
    //     }
    //   }

    //   if (ts.isClassDeclaration(node) && node.name && node.decorators) {
    //     let decoratorsForClass = node.decorators;

    //     for (const decorator of decoratorsForClass) {
    //       const fullDecoratorName = decorator.expression.getText();
    //       const splittedArr: string[] = fullDecoratorName.match(/\w+|"[^"]+"/g);
    //       const decoratorName = splittedArr[0];

    //       if (decoratorName == `describe`) {
    //         TestStore.setDescribe({ description: splittedArr[1] });
    //         console.log(TestStore.Store);
    //         decorator.expression.getSourceFile();
    //         let symbol = checker.getSymbolAtLocation(node.name);
    //         if (symbol) {
    //           output.push(serializeClass(symbol));
    //         }
    //         // tests[0].description = decorator.expression.getChildCount();
    //       }
    //       if (decorator.expression.getText() === 'Test') {
    //       }
    //     }
    //   }

    //   if (ts.isClassDeclaration(node) && node.name) {
    //     // This is a top level class, get its symbol
    //     let symbol = checker.getSymbolAtLocation(node.name);
    //     if (symbol) {
    //       output.push(serializeClass(symbol));
    //     }
    //     // No need to walk any further, class expressions/inner declarations
    //     // cannot be exported
    //   } else if (ts.isModuleDeclaration(node)) {
    //     // This is a namespace, visit its children
    //     ts.forEachChild(node, visit);
    //   }
  }

  /** Serialize a symbol into a json object */
  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(symbol.getDocumentationComment()),
      type: checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!))
    };
  }

  /** Serialize a class symbol information */
  function serializeClass(symbol: ts.Symbol) {
    let details = serializeSymbol(symbol);

    // Get the construct signatures
    let constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
    details.constructors = constructorType.getConstructSignatures().map(serializeSignature);
    return details;
  }

  /** Serialize a signature (call or construct) */
  function serializeSignature(signature: ts.Signature) {
    return {
      parameters: signature.parameters.map(serializeSymbol),
      returnType: checker.typeToString(signature.getReturnType()),
      documentation: ts.displayPartsToString(signature.getDocumentationComment())
    };
  }

  /** True if this is visible outside this file, false otherwise */
  function isNodeExported(node: ts.Node): boolean {
    return (
      (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
      (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
  }
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  emitDecoratorMetadata: true,
  experimentalDecorators: true
});
