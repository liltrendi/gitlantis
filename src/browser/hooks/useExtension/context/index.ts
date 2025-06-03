import { ExtensionContext } from "@/browser/context/extension";
import { useContext } from "react";

export const useExtensionContext = () => useContext(ExtensionContext);