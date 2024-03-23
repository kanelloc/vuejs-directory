export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style']],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
