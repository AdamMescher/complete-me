const TrieNode = require('./TrieNode');
const Trie = require('./Trie');
const text = "/usr/share/dict/words";

let trie = new Trie();

let test = ['a', 'at', 'ate'];

trie.populate(test);
// trie.insert('bat');
// trie.insert('cat');
// trie.insert('dog');

let suggested = trie.suggest('a');

console.log(suggested);

trie.select('ate');

let selected = trie.suggest('a');

console.log(selected);
