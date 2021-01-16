# Rush monorepo with project that have build created package.json

- The project `pure-ts` it's a basic out of the box TS library that
follows all Rush and Heft pattern. It's just here to demonstrate a
dependency from the other project.

- The project `angular` it's a basic Angular library crated with the
Angular CLI. Because of how Angular and it's tool-chain works,
the `dist` folder of the project will have the `package.json` that
must be distributed and not the one of the root of the project.

To see the result, just run `rush build` and check [libs/angular/dist](libs/angular/dist)

> NOTE: The build scripts of the Angular project have a `2>&1`.
> This is a workaround because Angular CLI writes to `stderr` for extra logging
> and this makes Rush angry. In a real life project we use a custom Angular CLI
> builder that pipes the stderr to stdout without extra bash magic