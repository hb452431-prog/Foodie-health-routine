import { useLocation as useLocationContext } from "../context/LocationContext";

export function useLocation() {
  return useLocationContext();
}

export default useLocation;
