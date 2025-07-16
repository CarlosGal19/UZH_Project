use candid::{CandidType, Deserialize};
use std::include_bytes;
use std::collections::HashMap;
use std::cell::RefCell;
use ic_cdk::api::time;

mod core;

const IMAGE_SIZE_IN_PIXELS: usize = 256;
const LOGO_TRANSPARENT: &[u8] = include_bytes!("../assets/logo_transparent.png");
const LOGO_WHITE: &[u8] = include_bytes!("../assets/logo_white.png");

// Estructura para almacenar imagen QR con metadatos
#[derive(CandidType, Deserialize, Clone)]
struct StoredQrImage {
    id: String,
    data: Vec<u8>,
    created_at: u64,
    original_input: String,
    options: Options,
    content_type: String,
}

// Almacenamiento en memoria del canister
thread_local! {
    static QR_STORAGE: RefCell<HashMap<String, StoredQrImage>> = RefCell::new(HashMap::new());
    static NEXT_ID: RefCell<u64> = RefCell::new(0);
}

#[derive(CandidType, Deserialize, Clone)]
struct Options {
    add_logo: bool,
    add_gradient: bool,
    add_transparency: Option<bool>,
}

#[derive(CandidType, Deserialize)]
struct QrError {
    message: String,
}

#[derive(CandidType, Deserialize)]
enum QrResult {
    Image(Vec<u8>),
    Err(QrError),
}

// Nuevo resultado que incluye URL de la imagen
#[derive(CandidType, Deserialize)]
struct QrImageResult {
    image_url: String,
    image_data: Vec<u8>,
}

#[derive(CandidType, Deserialize)]
enum QrStorageResult {
    Success(QrImageResult),
    Err(QrError),
}

// Función para generar ID único
fn generate_id() -> String {
    NEXT_ID.with(|id| {
        let current_id = *id.borrow();
        *id.borrow_mut() = current_id + 1;
        format!("qr_{}", current_id)
    })
}

// Función para generar URL de la imagen almacenada
fn generate_image_url(id: &str) -> String {
    let canister_id = ic_cdk::api::id();
    format!("https://{}.ic0.app/qr_image/{}", canister_id.to_text(), id)
}

// Función original mantenida para compatibilidad
fn qrcode_impl(input: String, options: Options) -> QrResult {
    let logo = if options.add_transparency == Some(true) {
        LOGO_TRANSPARENT
    } else {
        LOGO_WHITE
    };
    let result = match core::generate(input, options, logo, IMAGE_SIZE_IN_PIXELS) {
        Ok(blob) => QrResult::Image(blob),
        Err(err) => QrResult::Err(QrError {
            message: err.to_string(),
        }),
    };
    ic_cdk::println!(
        "Executed instructions: {}",
        ic_cdk::api::performance_counter(0)
    );
    result
}

// Nueva función que genera QR, lo almacena y retorna URL
fn generate_and_store_qr(input: String, options: Options) -> QrStorageResult {
    let logo = if options.add_transparency == Some(true) {
        LOGO_TRANSPARENT
    } else {
        LOGO_WHITE
    };

    match core::generate(input.clone(), options.clone(), logo, IMAGE_SIZE_IN_PIXELS) {
        Ok(blob) => {
            let id = generate_id();
            let image_url = generate_image_url(&id);

            let stored_image = StoredQrImage {
                id: id.clone(),
                data: blob.clone(),
                created_at: time(),
                original_input: input,
                options,
                content_type: "image/png".to_string(),
            };

            QR_STORAGE.with(|storage| {
                storage.borrow_mut().insert(id.clone(), stored_image);
            });

            ic_cdk::println!(
                "QR code stored with ID: {}, URL: {}, Executed instructions: {}",
                id,
                image_url,
                ic_cdk::api::performance_counter(0)
            );

            QrStorageResult::Success(QrImageResult {
                image_url,
                image_data: blob,
            })
        }
        Err(err) => QrStorageResult::Err(QrError {
            message: err.to_string(),
        }),
    }
}

// Funciones exportadas originales (mantenidas para compatibilidad)
#[ic_cdk::update]
fn qrcode(input: String, options: Options) -> QrResult {
    qrcode_impl(input, options)
}

#[ic_cdk::query]
fn qrcode_query(input: String, options: Options) -> QrResult {
    qrcode_impl(input, options)
}

// Nueva función principal: generar QR y almacenar con URL
#[ic_cdk::update]
fn generate_qr_image(input: String, options: Options) -> QrStorageResult {
    generate_and_store_qr(input, options)
}

// Función para servir la imagen por ID (HTTP endpoint)
#[ic_cdk::query]
fn qr_image(id: String) -> Option<Vec<u8>> {
    QR_STORAGE.with(|storage| {
        storage.borrow().get(&id).map(|img| img.data.clone())
    })
}

// Función para obtener metadatos de la imagen
#[ic_cdk::query]
fn get_qr_metadata(id: String) -> Option<StoredQrImage> {
    QR_STORAGE.with(|storage| {
        storage.borrow().get(&id).cloned()
    })
}

// Función para obtener URL de imagen existente por ID
#[ic_cdk::query]
fn get_qr_image_url(id: String) -> Option<String> {
    QR_STORAGE.with(|storage| {
        storage.borrow().get(&id).map(|_| generate_image_url(&id))
    })
}

// Función para listar todas las imágenes almacenadas
#[derive(CandidType, Deserialize)]
struct QrImageInfo {
    id: String,
    image_url: String,
    created_at: u64,
    original_input: String,
    data_size: usize,
}

#[ic_cdk::query]
fn list_qr_images() -> Vec<QrImageInfo> {
    QR_STORAGE.with(|storage| {
        storage.borrow().iter().map(|(id, img)| QrImageInfo {
            id: id.clone(),
            image_url: generate_image_url(id),
            created_at: img.created_at,
            original_input: img.original_input.clone(),
            data_size: img.data.len(),
        }).collect()
    })
}

// Función para eliminar imagen almacenada
#[ic_cdk::update]
fn delete_qr_image(id: String) -> bool {
    QR_STORAGE.with(|storage| {
        storage.borrow_mut().remove(&id).is_some()
    })
}

// Función para limpiar todas las imágenes
#[ic_cdk::update]
fn clear_all_qr_images() -> u64 {
    QR_STORAGE.with(|storage| {
        let count = storage.borrow().len() as u64;
        storage.borrow_mut().clear();
        count
    })
}

// Función HTTP handler para servir imágenes
#[ic_cdk::query]
fn http_request(request: HttpRequest) -> HttpResponse {
    let path = request.url.trim_start_matches('/');

    if path.starts_with("qr_image/") {
        let id = path.trim_start_matches("qr_image/");

        return match QR_STORAGE.with(|storage| storage.borrow().get(id).cloned()) {
            Some(image) => HttpResponse {
                status_code: 200,
                headers: vec![
                    ("Content-Type".to_string(), image.content_type),
                    ("Content-Length".to_string(), image.data.len().to_string()),
                    ("Cache-Control".to_string(), "public, max-age=31536000".to_string()),
                ],
                body: image.data,
            },
            None => HttpResponse {
                status_code: 404,
                headers: vec![("Content-Type".to_string(), "text/plain".to_string())],
                body: b"Image not found".to_vec(),
            },
        };
    }

    HttpResponse {
        status_code: 404,
        headers: vec![("Content-Type".to_string(), "text/plain".to_string())],
        body: b"Not found".to_vec(),
    }
}

// Tipos para HTTP
#[derive(CandidType, Deserialize)]
struct HttpRequest {
    method: String,
    url: String,
    headers: Vec<(String, String)>,
    body: Vec<u8>,
}

#[derive(CandidType, Deserialize)]
struct HttpResponse {
    status_code: u16,
    headers: Vec<(String, String)>,
    body: Vec<u8>,
}

// Función especial para NFT: generar QR con datos del reporte
#[ic_cdk::update]
fn generate_nft_qr_image(report_data: String) -> QrStorageResult {
    let options = Options {
        add_logo: true,
        add_gradient: true,
        add_transparency: Some(true),
    };

    // Generar URL que apunte a los detalles del reporte
    let qr_content = format!("https://reports.ic0.app/report/{}", report_data);

    generate_and_store_qr(qr_content, options)
}
