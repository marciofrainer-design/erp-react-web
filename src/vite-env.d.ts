/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SHOW_DATASNAP_MESSAGE_IN_TOOL_FOOTER?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
