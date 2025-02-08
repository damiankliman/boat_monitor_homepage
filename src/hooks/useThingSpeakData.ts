import { useQuery } from "@tanstack/react-query";
import thingSpeakClient from "@/api/thingSpeakClient";
import type { ThingSpeakResponse } from "@/types/thingSpeakTypes";

interface FetchParams {
  channelId: number;
  results?: number;
}

const DEFAULT_STALE_TIME = 1000 * 60;

const fetchThingSpeakData = async ({
  channelId,
  results = 10,
}: FetchParams): Promise<ThingSpeakResponse> => {
  const response = await thingSpeakClient.get(`/${channelId}/feeds.json`, {
    params: { results },
  });
  return response.data;
};

export const useThingSpeakData = (channelId: number, results = 10) => {
  return useQuery({
    queryKey: ["thingSpeakData", channelId, results],
    queryFn: () => fetchThingSpeakData({ channelId, results }),
    staleTime: DEFAULT_STALE_TIME,
  });
};
