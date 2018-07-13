/**
 * Create an object value.
 */
class ObjectParser {
  constructor(parser) {
    this.parser = parser;
  }

  canParse(node) {
    return !!node.properties || (typeof node.additionalProperties === 'object');
  }

  parse(node) {
    return this.generateObject(node);
  }

  generateObject(node) {
    const ret = {};
    let schema = Object.assign({}, node);

    if (typeof schema.additionalProperties === 'object') {
      let c = Math.floor(Math.random() * 5);
      for (let i = 0; i < c; i++) {
          ret[Math.random().toString(16).substr(2)] = this.parser.parse(schema.additionalProperties);
      }
    } else if (schema.properties) {
      // eslint-disable-next-line prefer-const
      for (let key of Object.keys(schema.properties)) {
          ret[key] = this.parser.parse(schema.properties[key]);
      }
    }

    return ret;
  }
}

module.exports = ObjectParser;
