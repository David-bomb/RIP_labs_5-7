import { tunnel_url } from "./tunnel";

const target_tauri = false;
// const isGithubPages = window.location.hostname === 'david-bomb.github.io';

const isGithubPages = true;


export const api_proxy_addr = isGithubPages && tunnel_url ? tunnel_url : "http://192.168.1.18:8000";
export const img_proxy_addr = isGithubPages && tunnel_url ? tunnel_url : "http://192.168.1.18:9000";

export const dest_api = (target_tauri || isGithubPages) ? api_proxy_addr : "";
export const dest_img =  (target_tauri || isGithubPages) ?  img_proxy_addr : "/images";
export const dest_root = (target_tauri) ? "" : "/";
