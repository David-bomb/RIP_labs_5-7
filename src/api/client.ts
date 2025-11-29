import { MOCK_SERVERS } from "./servers_mock";
import type { IServer, ICartInfo } from "./types";
import { api_proxy_target, img_proxy_target } from "../../target_config";


// const API_BASE_URL = '/api/v1';
const is_production = import.meta.env.PROD;
const API_BASE_URL = is_production ? `${api_proxy_target}/api/v1` : '/api/v1';
    
const MINIO_BASE_URL = is_production ? `${img_proxy_target}/images` : '/images';
/**
 * Обрабатывает URL изображений в зависимости от окружения.
 * @param servers - Массив серверов, полученный от API или из моков.
 * @returns Массив серверов с корректными image_url.
 */
const processServerImageUrls = (servers: IServer[]): IServer[] => {
    return servers.map(server => {
        if (!server.image_url) {
            return server;
        }
        // Формируем ссылку на картинку
        // Если image_url уже полный (например, в моках), оставляем, иначе добавляем базу
        const imageUrl = server.image_url.startsWith('http') 
            ? server.image_url 
            : `${MINIO_BASE_URL}/${server.image_url}`;
            
        return { ...server, image_url: imageUrl };
    });
};

// --- ОБНОВЛЕННАЯ ФУНКЦИЯ getServers ---
export const getServers = async (filterString: string = ''): Promise<IServer[]> => {
    const url = `${API_BASE_URL}/servers/?name=${encodeURIComponent(filterString)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data: IServer[] = await response.json();
        return processServerImageUrls(data); // <-- Обрабатываем URL
    } catch (error) {
        console.warn('Ошибка API. Используются mock-данные.', error);
        let servers = MOCK_SERVERS;
        if (filterString) {
            servers = MOCK_SERVERS.filter(s => s.name.toLowerCase().includes(filterString.toLowerCase()));
        }
        return processServerImageUrls(servers); // <-- Обрабатываем URL и для моков
    }
};

// --- ОБНОВЛЕННАЯ ФУНКЦИЯ getServerById ---
export const getServerById = async (id: number): Promise<IServer | undefined> => {
    const url = `${API_BASE_URL}/servers/${id}/`;
    try {
        const response = await fetch(url);
        // Убираем специальную проверку на 404. Любой неуспешный ответ - это ошибка.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Ответ от бэкенда - один объект, а не массив.
        const data: IServer = await response.json();
        // Оборачиваем в массив только для передачи в processServerImageUrls
        return processServerImageUrls([data])[0]; 
    } catch (error) {
        console.warn(`Ошибка API для ID ${id}. Используются mock-данные.`, error);
        const server = MOCK_SERVERS.find(s => s.id === id);
        // Обрабатываем URL и для моков
        return server ? processServerImageUrls([server])[0] : undefined;
    }
};
/**
 * Имитирует GET-запрос для получения информации о корзине.
 * @returns Promise, который разрешается объектом с ID заявки и количеством серверов.
 */
export const getCartInfo = async (): Promise<ICartInfo> => {
    const url = `${API_BASE_URL}/scene_renders/draft_info/`;
    
    try {
        console.log(`Отправка реального запроса: GET ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ICartInfo = await response.json();
        return data;
    } catch (error) {
        console.warn('Ошибка при запросе информации о корзине. Возвращаются значения по умолчанию.', error);
        // В случае ошибки возвращаем "два нуля"
        return { scene_render_id: null, servers_count: 0 };
    }
};