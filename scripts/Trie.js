const TrieNode = require ('./TrieNode');

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

    if(!currentNode.isComplete && word !== ''){
      currentNode.isComplete = true;
      this.counter++;
    }
  }

  suggest(str){
    let completeObjectList = [];
    let sorted = [];
    let currentNode = this.root;
    let currentString = '';

    findLastNodeOfStringInTrieAndConcatenateString();
    // console.log(currentNode);

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

      let keys = Object.keys(node.children);
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        crawl(node.children[key], string);
      }
    }

    function findLastNodeOfStringInTrieAndConcatenateString(){
      for (var i = 0; i < str.length; i++) {
        if (str[i] in currentNode.children === false) {
          return -1;
        } else {
          currentNode = currentNode.children[ str[i] ];
          currentString += str[i];
        }
      }
    }

    completeObjectList.sort( (a,b) => {
      return parseFloat(b.frequency) - parseFloat(a.frequency);
    })

    completeObjectList.forEach( (element) => {
      sorted.push(element.word)
    })
    if(!sorted.length){
      return - 1;
    } else {
      return sorted;
    }
  }

  select(str){
    let currentNode = this.root;

    findLastNodeOfStringInTrieAndConcatenateString();
    currentNode.frequency++;

    function findLastNodeOfStringInTrieAndConcatenateString(){
      for (var i = 0; i < str.length; i++) {
        if (str[i] in currentNode.children === false) {
          return -1;
        } else {
          currentNode = currentNode.children[ str[i] ];
        }
      }
    }
  }

  populate(list){
    list.forEach( (e) => {
      this.insert(e);
    });
  }
}

module.exports = Trie;
