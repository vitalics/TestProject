import ts = require('typescript');

function makeItFunction() {
  const functionName = ts.createIdentifier('it');
  const paramName = ts.createIdentifier('done');
  const parameter = ts.createParameter(
    /*decorators*/ undefined,
    /*modifiers*/ undefined,
    /*dotDotDotToken*/ undefined,
    paramName
  );

  const condition = ts.createBinary(paramName, ts.SyntaxKind.LessThanEqualsToken, ts.createLiteral(1));

  const ifBody = ts.createBlock([ ts.createReturn(ts.createLiteral(1)) ], /*multiline*/ true);
  const decrementedArg = ts.createBinary(paramName, ts.SyntaxKind.MinusToken, ts.createLiteral(1));
  const recurse = ts.createBinary(
    paramName,
    ts.SyntaxKind.AsteriskToken,
    ts.createCall(functionName, /*typeArgs*/ undefined, [ decrementedArg ])
  );
  const statements = [ ts.createIf(condition, ifBody), ts.createReturn(recurse) ];

  return ts.createFunctionDeclaration(
    /*decorators*/ undefined, // [ ts.createToken(ts.SyntaxKind.) ],
    /*modifiers*/ /*modifiers*/ undefined,
    /*asteriskToken*/ undefined,
    functionName,
    /*typeParameters*/ undefined,
    [ parameter ],
    /*returnType*/ ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.createBlock(statements, /*multiline*/ true)
  );
}

function makeDescribeFunction() {
  const functionName = ts.createIdentifier('describe');
  const paramName = ts.createIdentifier('n');
  const parameter = ts.createParameter(
    /*decorators*/ undefined,
    /*modifiers*/ undefined,
    /*dotDotDotToken*/ undefined,
    paramName
  );

  const condition = ts.createBinary(paramName, ts.SyntaxKind.LessThanEqualsToken, ts.createLiteral(1));

  const ifBody = ts.createBlock([ ts.createReturn(ts.createLiteral(1)) ], /*multiline*/ true);
  const decrementedArg = ts.createBinary(paramName, ts.SyntaxKind.MinusToken, ts.createLiteral(1));
  const recurse = ts.createBinary(
    paramName,
    ts.SyntaxKind.AsteriskToken,
    ts.createCall(functionName, /*typeArgs*/ undefined, [ decrementedArg ])
  );
  const statements = [ ts.createIf(condition, ifBody), ts.createReturn(recurse) ];

  return ts.createFunctionDeclaration(
    /*decorators*/ undefined,
    /*modifiers*/ [ ts.createToken(ts.SyntaxKind.ExportKeyword) ],
    /*asteriskToken*/ undefined,
    functionName,
    /*typeParameters*/ [ ts.createTypeParameterDeclaration(ts.createIdentifier('n')) ],
    [ parameter ],
    /*returnType*/ ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.createBlock(statements, /*multiline*/ true)
  );
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

const result = printer.printNode(ts.EmitHint.Unspecified, makeItFunction(), resultFile);

console.log(result);
