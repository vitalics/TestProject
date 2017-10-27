/***
  @singleton decorator
  add static method getInstance(...args) to decorated class which returns single instance 
  (or constructs single instance if it doesn't exist)
  
***/

export function singleton(Target: any) {

    //static instance getter method
    Target.getInstance = function (...args: any[]) {

        // save a reference to the original constructor
        var original = Target;

        // a utility function to generate instance of a class
        function construct(constructor) {
            var c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        //new constructor
        var f: any = function () {
            return construct(original);
        }

        if (!original.instance) {
            // copy prototype so intanceof operator still works
            f.prototype = original.prototype;
            original.instance = new f();
        }

        return original.instance;
    }

}

