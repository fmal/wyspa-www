// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
exports.wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });
