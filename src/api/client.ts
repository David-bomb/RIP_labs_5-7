import { MOCK_SERVERS } from "./servers_mock";
import type { IServer } from "./types";

const API_BASE_URL = '/api/v1';

const MINIO_IMAGES_BASE = 'http://localhost:9000/images';

/**
 * Нормализует поле image_url: если это относительный путь - превращает в полный URL на MinIO,
 * если уже полноценный URL (http/https) или null — возвращает как есть.
 */
const normalizeImageUrl = (imageUrl: string | null): string | null => {
    if (!imageUrl) return null;
    const trimmed = imageUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    // Убираем ведущие слэши, затем присоединяем к базовому пути
    const rel = trimmed.replace(/^\/+/, '');
    return `${MINIO_IMAGES_BASE}/${rel}`;
};

/**
 * Выполняет GET-запрос для получения списка серверов с фильтрацией на бэкенде.
 * В случае ошибки сети возвращает данные из mock-объектов.
 * @param filterString - Строка для поиска по названию.
 * @returns Promise, который разрешается массивом серверов.
 */
export const getServers = async (filterString: string = ''): Promise<IServer[]> => {
    const url = `${API_BASE_URL}/servers/?name=${encodeURIComponent(filterString)}`;
    
    try {
        console.log(`Отправка реального запроса: GET ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IServer[] = await response.json();
        return data.map(s => ({ ...s, image_url: normalizeImageUrl(s.image_url) }));
    } catch (error) {
        console.warn('Ошибка при запросе к API. Используются mock-данные.', error);
        
        let servers = MOCK_SERVERS;
        if (filterString) {
            servers = MOCK_SERVERS.filter(server => 
                server.name.toLowerCase().includes(filterString.toLowerCase())
            );
        }
        return servers.map(s => ({ ...s, image_url: normalizeImageUrl(s.image_url) }));
    }
};

/**
 * Выполняет GET-запрос для получения одного сервера по ID.
 * В случае ошибки сети возвращает данные из mock-объектов.
 * @param id - ID сервера.
 * @returns Promise, который разрешается одним сервером или undefined, если не найден.
 */
export const getServerById = async (id: number): Promise<IServer | undefined> => {
    const url = `${API_BASE_URL}/servers/${id}/`;
    
    try {
        console.log(`Отправка реального запроса: GET ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                return undefined;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IServer = await response.json();
        return { ...data, image_url: normalizeImageUrl(data.image_url) };
    } catch (error) {
        console.warn(`Ошибка при запросе к API для сервера ID ${id}. Используются mock-данные.`, error);

        // Логика отката на mock-данные
        const server = MOCK_SERVERS.find(s => s.id === id);
        return server ? { ...server, image_url: normalizeImageUrl(server.image_url) } : undefined;
    }
};