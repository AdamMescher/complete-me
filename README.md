# complete-me

Complete-Me is a project that takes a deep dive into the prefix trie data structure. It was fascinating to learn about linked and doubly linked lists, binary trees, and binary search trees along the way. 

### Requirements

#### Phase 1

The first thing your trie should be able to do is take in a word. It should also keep a count of how many words have been inserted.

#### Phase 2

Once the words are placed into the trie it should be able to offer some suggestions based on a word prefix.

#### Phase 3

Our Trie won’t be very useful without a good dataset to populate it. Our computers ship with a special file containing a list of standard dictionary words. It lives at /usr/share/dict/words. Using the unix utility wc (word count), we can see that the file contains 235886 words.

#### Phase 4

The common gripe about autocomplete systems is that they give us suggestions that are technically valid but not at all what we wanted.

A solution to this problem is to “train” the completion dictionary over time based on the user’s actual selections. So, if a user consistently selects “pizza” in response to completions for “pizz”, it probably makes sense to recommend that as their first suggestion.

Your library should support a select method which takes a substring and the selected suggestion. You will need to record this selection in your trie and use it to influence future suggestions.
