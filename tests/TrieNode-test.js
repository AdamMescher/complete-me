const TrieNode = require('../scripts/TrieNode')
const { assert, expect, should } = require( 'chai' );

describe( 'TRIE NODE',() => {
  let node;

  beforeEach( () => {
    node = new TrieNode();
  })

  it('should be a function', ()=> {
    expect(node).to.be.a.function;
  });

  it('should have a value property with a default value of empty string', ()=> {
    expect(node.value).to.equal('');
  });

  it('should be able to take an argument for the value property', () => {
    node = new TrieNode('a');
    expect(node.value).to.equal('a');
  });

  it('should have a isComplete property with a default property of false', ()=> {
    expect(node.isComplete).to.equal(false)
  });

  it('should have a frequency property with a default value of zero', ()=> {
    expect(node.frequency).to.equal(0)
  });
});
