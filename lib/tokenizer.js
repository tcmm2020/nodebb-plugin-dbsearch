'use strict';

const nodejieba = require("nodejieba");
const winston = require.main.require('winston');

const tokenizer = module.exports;
const MAX_CONTENT_LENGTH = 1000;

let _initialized = false;
tokenizer.init = () => {
  const start = Date.now();
  // winston.debug('[tokenizer] starts init')
  console.log('[tokenizer] starts init')
  nodejieba.load({
    userDict: __dirname + '/../dict/dict.utf8'
  });
  console.log(`[tokenizer] ends init, spent: ${Date.now() - start} ms`);
  _initialized = true;
};

tokenizer.run = (content) => {
  if (!_initialized) {
    tokenizer.init();
  }

  if (!content) return content;

  const shortConteet = content.slice(0, MAX_CONTENT_LENGTH);
  const start = Date.now();

  if (
    shortConteet.length === 0 ||
    /^[ -~\t\n\r]+$/.test(shortConteet)
  ) {
    console.log(`[tokenizer] meaningful ACSII content length: ${content.length}, spent: ${Date.now() - start} ms`);
    return content;
  } else {
    const result = nodejieba.cut(shortConteet, true);
    // console.log(result);
    console.log(`[tokenizer] non ACSII content length: ${content.length}, spent: ${Date.now() - start} ms`);
    return result.join(' ');
  }
};