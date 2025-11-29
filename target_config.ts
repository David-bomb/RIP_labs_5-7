// Vite автоматически ставит PROD = true при сборке (build)
// const is_production = import.meta.env.PROD;

// ВАЖНО: Замените этот IP на ваш реальный локальный IP, который вы узнали на Этапе 1
export const local_ip = "192.168.1.18"; 

export const api_proxy_target = `http://${local_ip}:8000`;
export const img_proxy_target = `http://${local_ip}:9000`;

// Если мы в продакшене (Tauri build), используем полный адрес.
// Если в разработке (dev server), используем относительный путь для прокси.
// export const dest_api = is_production ? `${api_proxy_addr}/api/v1` : "/api/v1";

// // То же самое для картинок
// export const dest_img = is_production ? `${img_proxy_addr}/images` : "/images";