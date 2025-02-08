import { useQuery } from "@tanstack/react-query";
import thingSpeakClient from "@/api/thingSpeakClient";
import type { ThingSpeakResponse } from "@/types/thingSpeakTypes";

interface FetchParams {
  channelId: number;
  results?: number;
}

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
  });
};
