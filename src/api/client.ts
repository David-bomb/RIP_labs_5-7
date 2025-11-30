import axios from 'axios';
import { dest_api } from '../config';
import { MOCK_SERVERS } from "./servers_mock";
import type { IServer, ICartInfo } from "./types";

const apiClient = axios.create({
    baseURL: dest_api,
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }
});

const API_BASE_URL = '/api/v1';

const MINIO_URL = '/images'; // URL для локальной разработки

/**
 * Обрабатывает URL изображений в зависимости от окружения.
 * @param servers - Массив серверов, полученный от API или из моков.
 * @returns Массив серверов с корректными image_url.
 */
const processServerImageUrls = (servers: IServer[]): IServer[] => {
    const useMinio = import.meta.env.VITE_USE_MINIO === 'true';

    return servers.map(server => {
        if (!server.image_url) {
            return server; // Возвращаем как есть, если картинки нет
        }

        if (useMinio) {
            // РЕЖИМ РАЗРАБОТКИ: Строим полный URL к Minio
            return { ...server, image_url: `${MINIO_URL}/${server.image_url}` };
        } else {
            // РЕЖИМ GITHUB PAGES: Строим относительный путь к локальным файлам
            // import.meta.env.BASE_URL здесь вернет /RIP_labs_5-7/
            const imageName = server.image_url.split('/').pop(); // Извлекаем имя файла, например, '1.webp'
            return { ...server, image_url: `${import.meta.env.BASE_URL}servers/${imageName}` };
        }
    });
};

// --- ОБНОВЛЕННАЯ ФУНКЦИЯ getServers ---
export const getServers = async (filterString: string = ''): Promise<IServer[]> => {
    const url = `${API_BASE_URL}/servers/?name=${encodeURIComponent(filterString)}`;
    console.log(`[API Client] Отправка запроса на: ${url}`);
    try {
        const response = await apiClient.get(url);
        console.log('[API Client] getServers СТАТУС ОТВЕТА:', response.status);
        console.log('[API Client] getServers ЗАГОЛОВКИ ОТВЕТА:', response.headers);
        console.log('[API Client] getServers СЫРЫЕ ДАННЫЕ ОТВЕТА:', response.data);

        // Проверяем, что данные - это массив, прежде чем продолжить
        if (!Array.isArray(response.data)) {
            throw new Error('Полученные данные не являются массивом. Возможно, это HTML-страница от ngrok.');
        }

        let data: IServer[] = response.data;
        return processServerImageUrls(data);
    } catch (error) {
        console.error('Ошибка API. Используются mock-данные.', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('[API Client] Детали ошибки Axios:', {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data,
            });
        }
        let servers = MOCK_SERVERS;
        if (filterString) {
            servers = MOCK_SERVERS.filter(s => s.name.toLowerCase().includes(filterString.toLowerCase()));
        }
        return processServerImageUrls(servers);
    }
};

// --- ОБНОВЛЕННАЯ ФУНКЦИЯ getServerById ---
export const getServerById = async (id: number): Promise<IServer | undefined> => {
    const url = `${API_BASE_URL}/servers/${id}/`;
    console.log(`[API Client] Отправка запроса на: ${url}`);
    try {
        const response = await apiClient.get(url);
        console.log('[API Client] getServerById СТАТУС ОТВЕТА:', response.status);
        console.log('[API Client] getServerById СЫРЫЕ ДАННЫЕ ОТВЕТА:', response.data);
        const data: IServer = response.data;
        return processServerImageUrls([data])[0]; 
    } catch (error) {
        console.error(`Ошибка API для ID ${id}. Используются mock-данные.`, error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('[API Client] Детали ошибки Axios:', {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data,
            });
        }
        const server = MOCK_SERVERS.find(s => s.id === id);
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
        console.log(`[API Client] Отправка запроса на: ${url}`);
        const response = await apiClient.get(url);
        console.log('[API Client] getCartInfo СТАТУС ОТВЕТА:', response.status);
        console.log('[API Client] getCartInfo СЫРЫЕ ДАННЫЕ ОТВЕТА:', response.data);
        const data: ICartInfo = response.data;
        return data;
    } catch (error) {
        console.warn('Ошибка при запросе информации о корзине. Возвращаются значения по умолчанию.', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('[API Client] Детали ошибки Axios:', {
                status: error.response.status,
                headers: error.response.headers,
                data: error.response.data,
            });
        }
        return { scene_render_id: null, servers_count: 0 };
    }
};