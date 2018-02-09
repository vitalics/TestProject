export enum LogType {
  CLASS = 'class',
  PROPERTY = 'property',
  PARAMETER = 'paramenter',
  METHOD = 'method'
}
export function log(what: LogType, params?: any[]) {
  switch (what) {
    case LogType.CLASS:
      return logClass.apply(this, params);
    case LogType.PROPERTY:
      return logProperty.apply(this, params);
    case LogType.PARAMETER:
      if (typeof params[1] === 'number') {
        return logParameter.apply(this, params);
      }
    case LogType.METHOD:
      return logMethod.apply(this, params);
  }
}
export function logClass(target: any) {
  // save a reference to the original constructor
  var original = target;

  // a utility function to generate instances of a class
  function construct(constructor: Function, args: any[]) {
    var c: any = function() {
      var argses = [];
      for (var _i = 0; _i < args.length; _i++) {
        argses[_i - 0] = args[_i];
      }
      var a = argses
        .map(function(a) {
          return JSON.stringify(a);
        })
        .join();
      console.log('Call: ' + constructor.name + '(' + a + ')');
      return constructor.apply(this, args);
    };
    c.prototype = constructor.prototype;
    return new c();
  }

  // the new constructor behaviour
  var f: any = function(...args: any[]) {
    console.log('New: ' + original.name);
    return construct(original, args);
  };

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f;
}
export function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  // save a reference to the original method this way we keep the values currently in the
  // descriptor and don't overwrite what another decorator might have done to the descriptor.
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }
  var originalMethod: Function = descriptor.value;

  //editing the descriptor/value parameter
  descriptor.value = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    var a = args
      .map(function(a) {
        return JSON.stringify(a);
      })
      .join();
    // note usage of originalMethod here
    var result = originalMethod.apply(this, args);
    var r = JSON.stringify(result);
    console.log('Call: ' + key + '(' + a + ') is returned' + r);
    return result;
  };

  // return edited descriptor as opposed to overwriting the descriptor
  return descriptor;
}
export function logParameter(target: any, key: string, index: number) {
  var metadataKey = `__log_${key}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  } else {
    target[metadataKey] = [ index ];
  }
  console.log(target);
}
export function logProperty(target: any, key: string) {
  // property value
  var _val = target[key];

  // property getter
  var getter = function() {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };

  // property setter
  var setter = function(newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };

  // Delete property.
  if (delete target[key]) {
    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}
