class TrieNode {
  constructor(val = ''){
    this.value = val;
    this.children = {};
    this.isComplete = false;
    this.frequency = 0;
  }
}

module.exports = TrieNode;
