import * as ts from 'typescript';
import * as fs from 'fs';

export class SyntaxAnalizer {
  private static program: ts.Program;
  private static checker: ts.TypeChecker;
  public constructor() {}
  public static analize(program: ts.Program, node: ts.Node) {
    this.program = program;
    this.checker = program.getTypeChecker();

    if (ts.isMethodDeclaration(node) && node.name && node.decorators) {
      let decoratorsForMethod = node.decorators;

      for (const decorator of decoratorsForMethod) {
        const fullDecoratorName = decorator.expression.getText();
        const splittedArr: string[] = fullDecoratorName.match(/\w+|"[^"]+"/g);
        const decoratorName = splittedArr[0];

        if (decoratorName == `it`) {
          let symbol = this.checker.getSymbolAtLocation(node.name);
          if (symbol) {
            console.log(symbol);
          }
        }
      }
    }

    if (ts.isClassDeclaration(node) && node.name && node.decorators) {
      let decoratorsForClass = node.decorators;

      for (const decorator of decoratorsForClass) {
        const fullDecoratorName = decorator.expression.getText();
        const splittedArr: string[] = fullDecoratorName.match(/\w+|"[^"]+"/g);
        const decoratorName = splittedArr[0];

        if (decoratorName == `describe`) {
          this.slpitClassToMembers(node.members);
          let classSymbol = this.checker.getSymbolAtLocation(node.name);
          if (classSymbol) {
            console.log('classInfo:');
            console.log(classSymbol.members);
            console.log('===============');
          }
        }
      }
    }
  }
  public static slpitClassToMembers(classElement: ts.NodeArray<ts.ClassElement>) {
    const resultFile = ts.createSourceFile(
      'someFileName.ts',
      '',
      ts.ScriptTarget.Latest,
      /*setParentNodes*/ true,
      ts.ScriptKind.TS
    );
    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.CarriageReturnLineFeed,
      removeComments: false
    });

    for (const elem of classElement) {
      const result = printer.printNode(ts.EmitHint.Unspecified, elem, resultFile);
      console.log(result);

      const name = elem.name;
      const elemSymbol = this.checker.getSymbolAtLocation(elem.name);
      const isFunc = this.isFunc(elemSymbol);
      const isCtor = this.isCtor(elemSymbol);
      const isDecaratos = this.isDecorators(elemSymbol);
      if (isFunc && isDecaratos) {
        const decorators = this.getNodeDecorators(elemSymbol);
        const specificDecorator = this.getDecorator(decorators);
        if (specificDecorator.decoratorName === 'it') {
        }
      }
    }
  }
  private static isFunc(symbolMember: ts.Symbol): boolean {
    if (this.isCtor(symbolMember)) {
      return false;
    }
    const type = this.checker.typeToString(
      this.checker.getTypeOfSymbolAtLocation(symbolMember, symbolMember.valueDeclaration!)
    );
    if (type.includes('=> ')) {
      return true;
    } else {
      return false;
    }
  }

  private static isDecorators(symbolMember: ts.Symbol): boolean {
    if (!this.isFunc(symbolMember) && !this.isCtor(symbolMember)) {
      return false;
    }
    const decorators = this.getNodeDecorators(symbolMember);
    return decorators ? true : false;
  }

  private static isCtor(symbolMember: ts.Symbol) {
    let name = '__constructor';
    if (symbolMember) {
      name = symbolMember.getName();
    }
    return name === '__constructor' ? true : false;
  }
  private static isVariable(symbolMember: ts.Symbol) {
    const valueDeclaration = symbolMember.valueDeclaration!;
    if (this.isCtor(symbolMember)) {
      return false;
    }
    const text = valueDeclaration.getFullText();
    return text ? true : false;
  }
  private static getNodeDecorators(symbol: ts.Symbol): ts.NodeArray<ts.Decorator> {
    if (!symbol) {
      return;
    }
    const declaration = symbol.getDeclarations()[0];
    const nodeDecorators = declaration.decorators;
    return nodeDecorators;
  }
  private static getDecorator(decorators: ts.NodeArray<ts.Decorator>): EasyDecorators {
    for (const decorator of decorators) {
      const fullDecoratorName = decorator.expression.getText();
      const splittedArr: string[] = fullDecoratorName.match(/\w+|"[^"]+"/g);
      const decoratorName = splittedArr[0];
      return {
        decoratorName,
        arguments: splittedArr.splice(0, 1)
      };
    }
  }
}
interface EasyDecorators {
  decoratorName: string;
  arguments: any[];
}
