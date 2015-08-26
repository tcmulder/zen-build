console.log('sample 2 script loaded');

console.log('sample 2 script error follows (sample-2.js:4):');
doThings(test);

// this will not work if uncommented

console.log('the following would cause a hinting issue with hinting enabled');
var test = function(){ return false; }
