export function Debounce(timeout: number) {
  // store timeout value for cancel the timeout
  let timeoutRef: null|number = null;

  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    // store original function for future use
    const original = descriptor.value;

    // override original function
    if(descriptor.value)
    descriptor.value = function(...args: any[]) {

      // clear previous timeout
      if(timeoutRef)
      clearTimeout(timeoutRef);

      // schedule timer
      timeoutRef = setTimeout(() => {

        // call original function
        original.apply(this, args);

      }, timeout);
    }

    // return descriptor with new value
    return descriptor;
  }
}