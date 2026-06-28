# Contributing

**The issue tracker is only for bug reports and enhancement suggestions.**

If you wish to contribute to the `Syste` codebase or documentation, feel free to fork the repository and submit a
pull request. We use ESLint and prettier to enforce a consistent coding style, so having that set up in your editor of choice
is a great boon to your development process.

## Setup

To get ready to work on the codebase, please do the following:

1. Fork & clone the repository, and make sure you're on the **main** branch
2. Run `pnpm install --frozen-lockfile` ([install](https://pnpm.io/installation))
3. Navigate to the package you are editing `cd packages/<package-name>` to build local packages
4. Code your heart out!
5. Run `pnpm build` to build the package including its Zig, C and Typescript code. If you have only made changes to the typescript running `tsc` may be quicker.
6. Run `pnpm run test` to ensure all tests are valid.
7. Run `pnpm run bench` to see if any performance improvements have been made.
8. [Submit a pull request](https://github.com/systejs/syste/compare)

## Adding new packages

If you'd like to create another package under the `@discordjs` organization run the following command:

```sh
pnpm run create-package
```

This will create new package directory under `packages/` with the required configuration files. You may begin
to make changes within the `src/` and `lib/` directory.