import { useQuery } from "@tanstack/react-query";
import thingSpeakClient from "@/api/thingSpeakClient";
import type {
  ThingSpeakDataResponse,
  ThingSpeakFeed,
} from "@/types/thingSpeakTypes";

interface FetchParams {
  channelId: number;
  start?: string;
  end?: string;
}

const DEFAULT_STALE_TIME = 1000 * 60;

export const fetchThingSpeakData = async ({
  channelId,
  start,
  end,
}: FetchParams): Promise<ThingSpeakDataResponse> => {
  const response = await thingSpeakClient.get(`/${channelId}/feeds.json`, {
    params: { start, end },
  });
  return response.data;
};

export const fetchLastThingSpeakEntry = async (
  channelId: number
): Promise<ThingSpeakFeed> => {
  const response = await thingSpeakClient.get(`/${channelId}/feeds/last.json`);
  return response.data;
};

export const useThingSpeakData = (
  channelId: number,
  start?: string,
  end?: string
) => {
  const dataQuery = useQuery({
    queryKey: ["thingSpeakData", channelId, start, end],
    queryFn: () => fetchThingSpeakData({ channelId, start, end }),
    staleTime: DEFAULT_STALE_TIME,
    placeholderData: (prev) => prev,
    enabled: !!start,
  });

  const lastEntryQuery = useQuery({
    queryKey: ["thingSpeakLastEntry", channelId],
    queryFn: () => fetchLastThingSpeakEntry(channelId),
    staleTime: DEFAULT_STALE_TIME,
    placeholderData: (prev) => prev,
  });

  return { dataQuery, lastEntryQuery };
};
