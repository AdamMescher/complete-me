const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

console.log(dictionary.indexOf('ate'));

class TrieNode {
  constructor(val){
    this.value = val;
    this.children = {};
    this.isComplete = false;
    this.frequency = 0;
  }
}

class Trie {
  constructor(){
    this.root = new TrieNode();
    this.counter = 0;
  }

  count(){
    return this.counter;
  }

  insert(word) {
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if( word[i] in currentNode.children === false){
        currentNode.children[ word[i] ] = new TrieNode( word[i] );
        currentNode = currentNode.children[ word[i] ];
      } else {
        currentNode = currentNode.children[ word[i] ];
      }
    }
    currentNode.isComplete = true;
    this.counter++;
  }

  suggest(str){
    let completeObjectList = [];
    let sorted = [];
    let currentNode = this.root;
    let currentString = '';

    findLastNodeOfStringInTrie();

    if (currentNode.isComplete) {
      completeObjectList.push({word: currentString, frequency: currentNode.frequency});
    }

    Object.keys(currentNode.children).forEach( (key) => {
      crawl(currentNode.children[key], currentString)
    } );

    function crawl(node, string){
      string += node.value;

      if(node.isComplete) {
        completeObjectList.push( {word: string, frequency: node.frequency} );
      }

      if(!Object.keys(node.children).length) {
        return '';
      }

      let keys = Object.keys(node.children);
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        crawl(node.children[key], string);
      }
    }

    function findLastNodeOfStringInTrie(){
      for (var i = 0; i < str.length; i++) {
        if (str[i] in currentNode.children === true) {
          currentNode = currentNode.children[ str[i] ];
          currentString += str[i];
        } else {
          return -1;
        }
      }
    }

    completeObjectList.sort( (a,b) => {
      return parseFloat(b.frequency) - parseFloat(a.frequency);
    })

    completeObjectList.forEach( (element) => {
      sorted.push(element.word)
    })
    return sorted;
  }

  populate(list){
    list.forEach( (e) => {
      this.insert(e);
    })
  }

  select(str){
    let currentNode = this.root;

    findLastNodeOfStringInTrie();
    currentNode.frequency++;

    function findLastNodeOfStringInTrie(){
      for (var i = 0; i < str.length; i++) {
        if (str[i] in currentNode.children === true) {
          currentNode = currentNode.children[ str[i] ];
        } else {
          return -1;
        }
      }
    }
  }
}

let trie = new Trie();

let test = ['ate', 'at', 'a'];

trie.populate(dictionary);

let suggested = trie.suggest('yello');

// console.log(suggested);
// console.log(trie.root.children.a.children.t);

// let sug = trie.suggest('A');
// let suggested = trie.suggest('a');
// let suggestion = trie.suggest('ba');

// trie.insert('Adam')
// trie.insert('at');
// trie.insert('ate');
// trie.insert('atm');
// trie.insert('Athlete');
// trie.insert('att');
// trie.insert('adam');
// trie.insert('baby');

// trie.insert('baby');
// trie.insert('cat');
// trie.insert('category');
// trie.insert('dog');

// console.log(sug);
// console.log(suggested);
// console.log(suggestion);
