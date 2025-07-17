import { CLOUDFRONT_ROOT_URL, FAVICON_PATH } from "@/browser/config";
import { useGameContext } from "@/browser/hooks/useGame/context";
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
  const { isBrowserEnvironment } = useGameContext();
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-1000`}
    >
      <img
        src={`${isBrowserEnvironment ? CLOUDFRONT_ROOT_URL : ""}${
          globalUris.favicon
        }`}
        alt="Gitlantis Logo"
        className="mb-6 h-14 w-14 object-contain"
      />
      <h1 className="mb-10 text-2xl font-extrabold text-[#eee]">{message}</h1>
      {type === DIRECTORY_ERRORS.no_open_project ? (
        <button
          onClick={action}
          className="rounded-full bg-[#f2bc07] px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105"
        >
          Open folder
        </button>
      ) : (
        <a
          href="mailto:brian.njogu@outlook.com"
          className="rounded-full bg-[#f2bc07] px-6 py-3 text-lg font-semibold text-black transition-transform hover:scale-105"
        >
          Contact support
        </a>
      )}
    </div>
  );
};
