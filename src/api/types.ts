export interface IServer {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  cpu_cores: number;
  gpu_count: number;
  gpu_vram_gb: number;
  ram_gb: number;
}

export interface ICartInfo {
  scene_render_id: number | null;
  servers_count: number;
}