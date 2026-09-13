# dsh-use

A minimal [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) plugin bundle.

## What makes it a plugin

`dsh plugin --profile <name> add <spec>` installs a package into that profile and then
reconciles `dsh.profile.bundles`: a dependency whose manifest declares `dsh.bundle.patch`
is appended to the layer stack, anything else is only a plain dependency.

So a usable plugin needs exactly two things:

1. `package.json` declaring the patch file:

   ```json
   "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
   ```

2. that patch file being a top-level YAML array of loader patch entries, inserting the
   module this package exports.

## Layout

| Path | Role |
|---|---|
| `package.json` | package identity plus the `dsh.bundle.patch` declaration |
| `cordis.patch.yml` | the bundle patch: one `insert` entry pointing at this package |
| `lib/index.js` | the Cordis plugin itself (`name`, `inject`, `apply`) |

## Install into a profile

```sh
# from a local checkout
dsh plugin --profile web add /path/to/dsh-use

# or straight from git (needs git on PATH; a prepare script would require an
# allowBuilds entry in the profile's pnpm-workspace.yaml)
dsh plugin --profile web add github:Lix967/dsh-use
```

Restart `dsh` afterwards so the new layer is composed.

Remove it again with:

```sh
dsh plugin --profile web remove dsh-use
```

## Extending

`lib/index.js` currently only registers one system-prompt section, which is enough to
verify the load path. Real behaviour goes inside `apply(ctx)`: inject the services the
plugin needs, register rows, tools, commands, or client UI from there.
