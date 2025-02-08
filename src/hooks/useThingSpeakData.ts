import { useQuery } from "@tanstack/react-query";
import thingspeakClient from "@/api/thingspeakClient";

interface FetchParams {
  channelId: number;
  results?: number;
}

const fetchThingSpeakData = async ({
  channelId,
  results = 10,
}: FetchParams) => {
  const response = await thingspeakClient.get(`/${channelId}/feeds.json`, {
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
