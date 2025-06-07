import { FAVICON_PATH } from "@/browser/config";
import { DIRECTORY_ERRORS } from "@/extension/config";

const globalUris = (window as any).__GLOBAL_URIS__ || {
  favicon: FAVICON_PATH,
};

export const NoOpenProject = ({
  type,
  message,
  action,
}: {
  type: string;
  message: string;
  action: () => void;
}) => {
  return (
    <div
      className={`fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50 transition-opacity duration-1000`}
    >
      <img
        src={globalUris.favicon}
        alt="Gitlantis Logo"
        className="w-14 h-14 mb-6 object-contain"
      />
      <h1 className="text-2xl font-extrabold text-[#eee] mb-10">{message}</h1>
      {type === DIRECTORY_ERRORS.no_open_project ? (
        <button
          onClick={action}
          className="px-6 py-3 rounded-full bg-[#f2bc07] text-black font-semibold text-lg hover:scale-105 transition-transform"
        >
          Open folder
        </button>
      ) : (
        <a
          href="mailto:brian.njogu@outlook.com"
          className="px-6 py-3 rounded-full bg-[#f2bc07] text-black font-semibold text-lg hover:scale-105 transition-transform"
        >
          Contact support
        </a>
      )}
    </div>
  );
};
