# Date Utils 🗓️

[![NPM Latest Version][version-badge]][npm-url] [![Coverage Status][coverage-badge]][coverage-url] [![Socket Status][socket-badge]][socket-url] [![NPM Monthly Downloads][downloads-badge]][npm-url] [![Dependencies][deps-badge]][deps-url]

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

[version-badge]: https://img.shields.io/npm/v/%40alessiofrittoli%2Fdate-utils
[npm-url]: https://npmjs.org/package/%40alessiofrittoli%2Fdate-utils
[coverage-badge]: https://coveralls.io/repos/github/alessiofrittoli/date-utils/badge.svg
[coverage-url]: https://coveralls.io/github/alessiofrittoli/date-utils
[socket-badge]: https://socket.dev/api/badge/npm/package/@alessiofrittoli/date-utils
[socket-url]: https://socket.dev/npm/package/@alessiofrittoli/date-utils/overview
[downloads-badge]: https://img.shields.io/npm/dm/%40alessiofrittoli%2Fdate-utils.svg
[deps-badge]: https://img.shields.io/librariesio/release/npm/%40alessiofrittoli%2Fdate-utils
[deps-url]: https://libraries.io/npm/%40alessiofrittoli%2Fdate-utils

[sponsor-badge]: https://img.shields.io/static/v1?label=Fund%20this%20package&message=%E2%9D%A4&logo=GitHub&color=%23DB61A2
[sponsor-url]: https://github.com/sponsors/alessiofrittoli

## Lightweight TypeScript date utility functions library

This lightweight TypeScript utility library comes with common and utility dates functions.

Everything is exported from the root of this library but specific paths can be used too (especially when dynamically importing functions and tree shaking has no effect).

### Table of Contents

- [Getting started](#getting-started)
- [What's Changed](#whats-changed)
- What's inside
  - [Common utilities](https://github.com/alessiofrittoli/date-utils/blob/master/docs/common/README.md)
  - [Formatting functions](https://github.com/alessiofrittoli/date-utils/blob/master/docs/format/README.md)
  - [Timezone utilities](https://github.com/alessiofrittoli/date-utils/blob/master/docs/timezones/README.md)
  - [Utility functions](https://github.com/alessiofrittoli/date-utils/blob/master/docs/utils/README.md)
- [Development](#development)
  - [Install depenendencies](#install-depenendencies)
  - [Build the source code](#build-the-source-code)
  - [ESLint](#eslint)
  - [Jest](#jest)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#made-with-)

---

### Getting started

Run the following command to start using `date-utils` in your projects:

```bash
npm i @alessiofrittoli/date-utils
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/date-utils
```

---

### What's Changed

#### Updates in the latest release 🎉

- `formatDate`
  - token `T` now outputs time divider.
  - Timezone identifier - short offset is now returned by `o` token.

---

### Development

#### Install depenendencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build the source code

Run the following command to test and build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

warnings / errors check.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test:watch

# Run tests in a CI environment.
pnpm test:ci
```

- See [`package.json`](./package.json) file scripts for more info.

Run tests with coverage.

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```bash
test:coverage:serve
```

---

### Contributing

Contributions are truly welcome!

Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

Help keep this project up to date with [GitHub Sponsor][sponsor-url].

[![GitHub Sponsor][sponsor-badge]][sponsor-url]

---

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img alt="avatar" src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
      </td>
      <td>
        <table style='display:flex;gap:2px;flex-direction:column;'>
          <tbody>
              <tr>
                <td>
                  <a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
                </td>
              </tr>
              <tr>
                <td>
                  <small>
                    <a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
                    <a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
                  </small>
                </td>
              </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
