use std::path::Path;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ShellIntegrationError {
    #[error("windows integration is only supported on Windows")]
    UnsupportedPlatform,
}

pub fn install_windows_context_menu(_exe_path: &Path) -> Result<(), ShellIntegrationError> {
    if cfg!(target_os = "windows") {
        Ok(())
    } else {
        Err(ShellIntegrationError::UnsupportedPlatform)
    }
}

pub fn remove_windows_context_menu() -> Result<(), ShellIntegrationError> {
    if cfg!(target_os = "windows") {
        Ok(())
    } else {
        Err(ShellIntegrationError::UnsupportedPlatform)
    }
}
