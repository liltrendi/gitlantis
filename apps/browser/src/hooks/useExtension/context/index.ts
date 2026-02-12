import { ExtensionContext } from "@/context/extension/context";
import { useContext } from "react";

export const useExtensionContext = () => useContext(ExtensionContext);
