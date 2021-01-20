# Rush monorepo with project that have build created package.json

- The project `pure-ts` it's a basic out of the box TS library that
follows all Rush and Heft pattern. It's just here to demonstrate a
dependency from the other project.

- The project `angular` it's a basic Angular library crated with the
Angular CLI. Because of how Angular and it's tool-chain works,
the `dist` folder of the project will have the `package.json` that
must be distributed and not the one of the root of the project.

- The project `rush-angular-tools` it's a Angular Builder project crated with
to resolve two problems of Angular working with Rush.
  - Pipe the `stderr` to `stdout` to avoid Rush detecting Angular CLI output as errors
  - Replacing all the `workspace:*` versions from the produced `package.json` with the
  version from the real packages in the monorepository.

To see the result, just run `rush build` and check [libs/angular/dist](libs/angular/dist)