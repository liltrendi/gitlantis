import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { Coffee, Sparkle } from "lucide-react";

const ATTRIBUTIONS = [
  {
    model: {
      name: "Lighthouse",
      link: "https://sketchfab.com/3d-models/sm--bld--lighthouse-07768c38fcf24560aa3520d9796592f5",
    },
    creator: { name: "kirasuinu", link: "https://sketchfab.com/kirasuinu" },
  },
  {
    model: {
      name: "Buoy",
      link: "https://sketchfab.com/3d-models/oceanographic-buoy-ems-toroidal-7b0b7cd7fee04717b3cd2183a96e39ad",
    },
    creator: {
      name: "gerardllorach",
      link: "https://sketchfab.com/gerardllorach",
    },
  },
  {
    model: {
      name: "Boat",
      link: "https://sketchfab.com/3d-models/boat-c6694b9cafe74e7ba46f5612a3e9a7f0",
    },
    creator: { name: "4122", link: "https://sketchfab.com/4122" },
  },
  {
    model: {
      name: "Ocean sounds",
      link: "https://freesound.org/people/MarleneAyni/sounds/731702/",
    },
    creator: {
      name: "MarleneAyni",
      link: "https://freesound.org/people/MarleneAyni/",
    },
  },
  {
    model: {
      name: "Ship horn",
      link: "https://freesound.org/people/monotraum/sounds/208714/",
    },
    creator: {
      name: "monotraum",
      link: "https://freesound.org/people/monotraum/",
    },
  },
];

export const SettingsAbout = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="mb-[15px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[0]}
      </h3>
      <div className="space-y-5 text-gray-400">
        <p className="space-y-2 text-lg">
          <span className="mb-4 block text-[16px]">
            Hi, my name is{" "}
            <a className="text-[#f2bc07] underline" href="https://brayo.co">
              Brian
            </a>
            , the creator of Gitlantis.
          </span>

          <span className="block text-[16px]">
            This extension was designed to make exploring your files more
            engaging and less of a chore. If it’s useful to you, please consider
            donating to help me keep improving it!
          </span>
        </p>
        <a
          href="https://buymeacoffee.com/liltrendi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-[#f2bc07] px-4 py-2 text-sm font-semibold text-gray-900 shadow-md transition-colors duration-200 hover:bg-[#f2bc07] hover:text-gray-900"
        >
          <Coffee className="mr-2 h-5 w-5" />
          Buy Me a Coffee
        </a>
      </div>

      <h3 className="mb-[15px] pt-[20px] text-xl font-semibold text-gray-200">
        {gameProps.activeTab.description[1]}
      </h3>
      <div className="space-y-5 text-gray-400">
        <span className="mb-6 block text-[16px]">
          I'm super grateful for the following creators, without whose work this
          project wouldn't have been successful:
        </span>
      </div>

      <ul>
        {ATTRIBUTIONS.map((item, index) => (
          <li
            key={`attribution-${index}-${item.creator}`}
            className="mb-4 flex items-center space-x-2"
          >
            <Sparkle className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400">
              <span>
                <a className="text-[#f2bc07] underline" href={item.model.link}>
                  {item.model.name}
                </a>
              </span>{" "}
              - by{" "}
              <span>
                <a className="text-gray-200 underline" href={item.creator.link}>
                  {item.creator.name}
                </a>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
