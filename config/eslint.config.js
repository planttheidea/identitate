import { createEslintConfig } from '@planttheidea/build-tools';

export default createEslintConfig({
  configs: [
    {
      rules: {
        '@typescript-eslint/no-unnecessary-type-parameters': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ],
  development: 'dev',
  react: false,
  source: 'src',
});
