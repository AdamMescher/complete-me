const TrieNode = require('../scripts/TrieNode');
const Trie = require('../scripts/Trie');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');
const { assert, expect, should } = require( 'chai' );

describe( 'TRIE',() => {

  let trie;
  let testArr;

  beforeEach( () => {
    trie = new Trie();
  })

  it('should have a root that is a TrieNode', () => {
    expect(trie.root.value).to.equal('');
    expect(trie.root.isComplete).to.equal(false);
    expect(trie.root.frequency).to.equal(0)
  });

  it('should have a counter property with a default value of zero', () => {
    expect(trie.counter).to.equal(0);
  });

  describe('COUNT', () => {

    it('should default to zero', () => {
      expect(trie.counter ).to.equal(0);
    });

    it('should increase when words are inserted', () => {
      trie.insert('word');
      expect(trie.counter ).to.equal(1);
    });

    it('should not increase after duplicates are added', () => {
      trie.insert('word');
      trie.insert('word');
    });

    it('should not increase after insertion of empty string', () => {
      trie.insert('');
      expect(trie.counter).to.equal(0);
    });
  });

  describe('INSERT', () => {

    it('should be able to accept a single letter', () => {
      trie.insert('a');
      expect(trie.root.children.a.value).to.equal('a')
    });

    it('should be able to accept a string', () => {
      trie.insert('dog');
      expect(trie.root.children.d.children.o.children.g.value).to.equal('g');
    });

    it('should change the last character of string node isComplete property to true', () => {
      trie.insert('dog');
      expect(trie.root.children.d.children.o.children.g.isComplete).to.equal(true);
    });

    it('should not create duplicate nodes of identical string', () => {
      trie.insert('door');
      trie.insert('door')
      let keys = Object.keys(trie.root.children);
      expect(JSON.stringify(keys)).to.equal( '["d"]' );
    });

    it('should be able to add a word even if some previous nodes exist', () => {
      trie.insert('door');
      trie.insert('dog');
      let keys = Object.keys(trie.root.children.d.children.o.children)
      expect(JSON.stringify(keys)).to.equal('["o","g"]');
    });

    it('should sort the array of returned words by frequency', () => {
      trie.insert('a');
      trie.insert('at');
      trie.insert('ate');
      trie.select('ate');

      let suggested = trie.suggest('a');
      expect( JSON.stringify(suggested) ).to.equal('["ate","a","at"]')
    });
  });

  describe('SELECT', () => {

    it('should increase the frequency of the node of the last letter in the string', () => {
      trie.insert('quad');
      expect(trie.root.children.q.children.u.children.a.children.d.frequency).to.equal(0);
      trie.select('quad');
      expect(trie.root.children.q.children.u.children.a.children.d.frequency).to.equal(1);
    });

    it('should return -1 if string is not present in trie', () => {
      let suggested = trie.suggest('b');
      expect(suggested).to.equal(-1)



    });
  });

  describe('POPULATE', () => {
    it('should be able to add one word to the tree', () => {
      let test = ['the'];
      trie.populate(test);
      let suggested = trie.suggest('the')
      expect(JSON.stringify(suggested)).to.equal('["the"]')
    });

    it('should not add duplicate words to the trie', () => {
      let test = ['the', 'the', 'the'];
      trie.populate(test);
      let suggested = trie.suggest('the');
      expect(JSON.stringify(suggested)).to.equal('["the"]')
    });

    it('should add multiple words to the trie', () => {
      let test = ['a', 'at', 'ate'];
      trie.populate(test);
      let suggested = trie.suggest('a');
      expect(JSON.stringify(suggested)).to.equal('["a","at","ate"]');
    });

    it('should be able to import dictionarty', function() {
      trie.populate(dictionary);
      expect(trie.count() ).to.equal(235886);
    }).timeout(4000);
  });

});
