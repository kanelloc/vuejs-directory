module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  extends: ['plugin:vue/vue3-recommended','@nuxt/eslint-config', '@vue/eslint-config-prettier'],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
}