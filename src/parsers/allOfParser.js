/**
 * Return a value against all the subschemas. Look at expanding to oneOf, allOf, and anyOf.
 */
class AllOfParser {
  constructor(parser) {
    this.parser = parser;
  }

  canParse(node) {
    return !!node.allOf;
  }

  parse(node) {
    return this.generateObject(node);
  }

  generateObject(node) {
    let ret = node.allOf.reduce(
        (s, o) => !!o.properties ? Object.assign(s, this.parser.parse(o)) : {},
        {}
    );
    let schema = Object.assign({}, node);
    if (schema.properties) {
        // eslint-disable-next-line prefer-const
        for (let key of Object.keys(schema.properties)) {
            ret[key] = this.parser.parse(schema.properties[key]);
        }
    }
    return ret;
  }
}

module.exports = AllOfParser;
