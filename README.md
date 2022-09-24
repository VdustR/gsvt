# gst

> Git Semver Tags

Create git semver tags with additional major and minor tags easily.

## Install

```sh
npm install -g gst
```

Or use `npx` directly without installing.

## Usage

`gst` detect the git tags with `v.*.*.*` automatically, and create the next patch
semver tag.

```sh
gst
```

You can increase the version with `major` or `minor`:

```sh
gst major
gst minor
gst patch
```

You can also specify the version manually:

```sh
gst <version>
gst v0.1.0
```

And you can push the commit with tags:

```sh
git push origin main --tags -f
```

## License

[MIT](./LICENSE)

Copyright (c) 2022-preset ViPro (京京)
