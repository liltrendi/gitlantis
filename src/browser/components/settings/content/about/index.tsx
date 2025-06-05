import type { useGameSettings } from "@/browser/hooks/useGame/settings";
import { Sparkle } from "lucide-react";

const ATTRIBUTIONS = [
  {
    model: { name: "Tower", link: "#" },
    creator: { name: "Erik M. Bray", link: "#" },
  },
  {
    model: { name: "Boat", link: "#" },
    creator: { name: "Henderson James", link: "#" },
  },
  {
    model: { name: "Buoy", link: "#" },
    creator: { name: "Bruyne de Jeong", link: "#" },
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

        {/* add social links here */}
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
              - a creation by{" "}
              <span>
                <a className="" href={item.creator.link}>
                  {item.creator.name}
                </a>
              </span>
            </span>
          </li>
        ))}
      </ul>
      {/* About models used and attributions */}
    </>
  );
};
