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
      name: "Audio",
      link: "https://freesound.org/people/MarleneAyni/sounds/731702/",
    },
    creator: {
      name: "MarleneAyni",
      link: "https://freesound.org/people/MarleneAyni/",
    },
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
];

export const SettingsAbout = (
  gameProps: ReturnType<typeof useGameSettings>
) => {
  return (
    <>
      <h3 className="text-xl text-gray-200 font-semibold mb-[15px]">
        {gameProps.activeTab.description[0]}
      </h3>
      <div className="space-y-5 text-gray-400">
        <p className="text-lg space-y-2">
          <span className="text-[16px] block mb-4">
            Hi, my name is{" "}
            <a className="text-[#f2bc07] underline" href="https://brayo.co">
              Brian
            </a>
            , the creator of Gitlantis.
          </span>

          <span className="text-[16px] block">
            This extension was designed to make exploring your files more
            engaging and less of a chore. If it’s useful to you, please consider
            donating to help me keep improving it!
          </span>
        </p>
        <a
          href="https://buymeacoffee.com/liltrendi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm items-center px-4 py-2 bg-[#f2bc07] hover:bg-[#f2bc07] hover:text-gray-900 text-gray-900 font-semibold rounded-lg shadow-md transition-colors duration-200"
        >
          <Coffee className="w-5 h-5 mr-2" />
          Buy Me a Coffee
        </a>
      </div>

      <h3 className="text-xl text-gray-200 font-semibold mb-[15px] pt-[20px]">
        {gameProps.activeTab.description[1]}
      </h3>
      <div className="space-y-5 text-gray-400">
        <span className="text-[16px] block mb-6">
          I'm super grateful for the following creators, without whose models
          this project wouldn't have been successful:
        </span>
      </div>

      <ul>
        {ATTRIBUTIONS.map((item, index) => (
          <li
            key={`attribution-${index}-${item.creator}`}
            className="flex items-center space-x-2 mb-4"
          >
            <Sparkle className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">
              <span>
                <a className="text-[#f2bc07] underline" href={item.model.link}>
                  {item.model.name}
                </a>
              </span>{" "}
              - by{" "}
              <span>
                <a className="underline text-gray-200" href={item.creator.link}>
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
