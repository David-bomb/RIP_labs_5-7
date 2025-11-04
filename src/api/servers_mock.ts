// src/api/servers_mock.ts

import type { IServer } from './types';

export const MOCK_SERVERS: IServer[] = [
    {
        "id": 1,
        "name": "CPU Powerhouse S",
        "description": "Высокопроизводительная станция, оптимизированная для рендеринга на CPU. Подходит для задач, требующих большого количества потоков и памяти, обеспечивает стабильную работу при длительных сборках.",
        "image_url": "servers_imgs/2.webp",
        "cpu_cores": 48,
        "gpu_count": 0,
        "gpu_vram_gb": 0,
        "ram_gb": 128
    },
    {
        "id": 2,
        "name": "GPU Beast M",
        "description": "Мощная конфигурация на базе 64-ядерного процессора AMD EPYC и четырёх GPU с высокой вместимостью VRAM для параллельного рендеринга сцен и обучения моделей машинного обучения.",
        "image_url": "servers_imgs/1.webp",
        "cpu_cores": 64,
        "gpu_count": 4,
        "gpu_vram_gb": 24,
        "ram_gb": 256
    },
    {
        "id": 3,
        "name": "Balance Workhorse",
        "description": "Сбалансированная рабочая станция для универсальных задач: сочетание производительного CPU, двух GPU и достаточного объёма памяти для большинства студийных проектов.",
        "image_url": "servers_imgs/3.webp",
        "cpu_cores": 24,
        "gpu_count": 2,
        "gpu_vram_gb": 12,
        "ram_gb": 64
    },
    {
        "id": 4,
        "name": "CPU Powerhouse L",
        "description": "Экстремальная CPU-станция с 96 физическими ядрами и большим объёмом оперативной памяти, предназначенная для самых тяжёлых вычислительных задач и больших параллельных сборок.",
        "image_url": "servers_imgs/4.webp",
        "cpu_cores": 96,
        "gpu_count": 0,
        "gpu_vram_gb": 0,
        "ram_gb": 512
    },
    {
        "id": 5,
        "name": "VRAM Monster XL",
        "description": "Специализированная конфигурация с большим объёмом видеопамяти для рендеринга и работы с крупными сценами, подходит для сложных композиционных задач и текстур высокого разрешения.",
        "image_url": "servers_imgs/5.webp",
        "cpu_cores": 64,
        "gpu_count": 8,
        "gpu_vram_gb": 80,
        "ram_gb": 512
    },
    {
        "id": 6,
        "name": "Starter GPU Rig",
        "description": "Стартовая конфигурация для GPU-рендеринга, оптимальна для обучения небольших моделей и быстрого тестирования сцен на одном GPU.",
        "image_url": "servers_imgs/6.webp", 
        "cpu_cores": 16,
        "gpu_count": 1,
        "gpu_vram_gb": 12,
        "ram_gb": 64
    },
    {
        "id": 7,
        "name": "VRAM Monster XXL",
        "description": "Очень, очень большой и сильный компьютер. Обработает любую сцену быстро и эффективно.",
        "image_url": null,
        "cpu_cores": 128,
        "gpu_count": 32,
        "gpu_vram_gb": 120,
        "ram_gb": 1024
    },
    
];