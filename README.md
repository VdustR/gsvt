# gsvt

> Git SemVer Tags

Create git semver tags with additional major and minor tags easily.

## Example

Let's say the latest tag is `v2.1.1`:

| Command      | Result                 |
| ------------ | ---------------------- |
| `gsvt`       | `v2.1.2`, `v2.1`, `v2` |
| `gsvt major` | `v3.0.0`, `v3.0`, `v3` |
| `gsvt minor` | `v2.2.0`, `v2.2`, `v2` |
| `gsvt patch` | `v2.1.2`, `v2.1`, `v2` |
| `gsvt 1.2.3` | `v1.2.3`, `v1.2`, `v1` |

If there is no tag matching the pattern `v*.*.*`, the next patch will be `v0.0.1`.

## Install

```sh
npm install -g gsvt
```

Or use `npx gsvt` directly without installing.

## Usage

`gsvt` detect the git tags with `v*.*.*` automatically, and create the next patch
semver tag.

```sh
gsvt
```

You can increase the version with `major` or `minor`:

```sh
gsvt major
gsvt minor
gsvt patch
```

`gsvt patch` is equal to `gsvt`.

You can also specify the version manually:

```sh
gsvt <version>
gsvt v0.1.0
```

And you can push the commit with tags:

```sh
git push origin main --tags -f
```

## License

[MIT](https://github.com/VdustR/gsvt/blob/main/LICENSE)

Copyright (c) 2022-preset ViPro (京京)
