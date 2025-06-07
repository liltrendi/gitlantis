export const ROOT_DIRECTORY_KEY = "__root__";

export const DIRECTORY_COMMANDS = {
  read_directory: "read_directory",
  open_file: "open_file",
  open_explorer: "open_explorer",
  persist_settings: 'persist_settings',
  load_settings: 'load_settings',
  settings_loaded: 'settings_loaded',
};

export const DIRECTORY_RESPONSE = {
  data: "data",
  error: "read_error",
};

export const DIRECTORY_ERRORS = {
  vscode_api_error: "vscode-api-error",
  no_open_project: "no-project-open",
  generic: "generic",
}