# Architecture

The conversion core is UI-agnostic and shared by Tauri commands, the CLI, and
platform integrations.

```text
React UI -> Tauri commands -> converter-core
                             -> converter-engines
                             -> converter-models
```

Platform-specific work lives outside the core, primarily in `shell-integration`
and the Tauri shell.

