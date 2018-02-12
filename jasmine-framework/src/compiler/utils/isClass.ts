let toString = Function.prototype.toString;

function fnBody(fn: any) {
  return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');
}

export function isClass(fn: any) {
  return (
    typeof fn === 'function' && (/^class\s/.test(toString.call(fn)) || /^.*classCallCheck\(/.test(fnBody(fn))) // babel.js
  );
}
