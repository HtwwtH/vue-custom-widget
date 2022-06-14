module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always'
    }]
  }
}
