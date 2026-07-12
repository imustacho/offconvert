use offconvert_core::inspection::inspect_path;
use offconvert_core::queue::QueueState;
use offconvert_models::{ConversionJob, ConversionRequest, MediaCategory};
use serde::Serialize;
use std::sync::OnceLock;

static QUEUE: OnceLock<QueueState> = OnceLock::new();

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct UiMediaFile {
    path: String,
    detected_format: String,
    category: String,
}

#[tauri::command]
fn inspect_files(paths: Vec<String>) -> Result<Vec<UiMediaFile>, String> {
    paths
        .into_iter()
        .map(|path| {
            let info =
                inspect_path(std::path::Path::new(&path)).map_err(|error| error.to_string())?;
            Ok(UiMediaFile {
                path,
                detected_format: info.detected_format,
                category: match info.category {
                    MediaCategory::Image => "image".into(),
                    MediaCategory::Video => "video".into(),
                    MediaCategory::Audio => "audio".into(),
                },
            })
        })
        .collect()
}

#[tauri::command]
fn queue_conversion(request: ConversionRequest) -> Result<Vec<ConversionJob>, String> {
    let queue = QUEUE.get_or_init(QueueState::default);
    let jobs = request
        .input_paths
        .into_iter()
        .map(|input| {
            queue.add_job(
                input,
                request.target_format.clone(),
                request.preset_id.clone(),
            )
        })
        .collect();
    Ok(jobs)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![inspect_files, queue_conversion])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
