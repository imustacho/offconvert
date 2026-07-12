# OffConvert Windows Development Setup

## Required tools

- Node.js 24+
- Rust stable toolchain
- Microsoft Visual Studio Build Tools with C++ workload
- Tauri prerequisites
- WebView2 runtime
- Bundled FFmpeg and FFprobe binaries under `binaries/windows/`
- Bundled ImageMagick binaries under `binaries/windows/`

## Install steps

```powershell
npm install
rustup default stable
rustup target add x86_64-pc-windows-msvc
```

## Expected binary layout

```text
binaries/windows/ffmpeg.exe
binaries/windows/ffprobe.exe
binaries/windows/magick.exe
```

## Development commands

```powershell
npm run dev
npm run tauri:dev
cargo test
```

Create a distributable installer with:

```powershell
npm run tauri:build
```

Installers are written below `apps/desktop/src-tauri/target/release/bundle/`.

## Notes

- The application fails with structured errors when required engines are missing.
- Windows context-menu commands are installed through the CLI or app settings.
