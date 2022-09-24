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

## Why?

Unlike [`npm`](https://www.npmjs.com/), some registry services like [GitHub Actions](https://github.com/features/actions) didn't resolve the version with semantically versioned tags by default. For example, we can install the latest `1.x.x` package with `npm install package@1` but we can't do the same thing with `actions/my-action@v1`. We have to specify the exact version like `actions/my-action@v1.3.5`.

> We recommend creating releases using semantically versioned tags – for example, `v1.1.3` – and keeping major (`v1`) and minor (`v1.1`) tags current to the latest appropriate commit. For more information, see "[About custom actions](https://docs.github.com/en/actions/creating-actions/about-custom-actions#using-release-management-for-actions)" and "[About semantic versioning](https://docs.npmjs.com/about-semantic-versioning). -- [Releasing and maintaining actions - GitHub Docs](<https://docs.github.com/en/actions/creating-actions/releasing-and-maintaining-actions#:~:text=We%20recommend%20creating%20releases%20using%20semantically%20versioned%20tags%20%E2%80%93%20for%20example%2C%20v1.1.3%20%E2%80%93%20and%20keeping%20major%20(v1)%20and%20minor%20(v1.1)%20tags%20current%20to%20the%20latest%20appropriate%20commit.%20For%20more%20information%2C%20see%20%22About%20custom%20actions%22%20and%20%22About%20semantic%20versioning.>)

The way to let the user use the action semantically is creating tags with the major version like `v1` and the minor version like `v1.1`, but it's not easy to create these tags manually, so I created this tool to resolve this with one command simply.

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
