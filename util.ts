import { ArtistInterface, ArtistFilterType } from "./types/shared";

interface PageResponse {
  data: {
    [key: string]: any;
  };
}

export const extractPage = (fetchResponse: PageResponse, key: string) =>
  fetchResponse?.data?.[key];

interface CollectionResponse {
  data: {
    [key: string]: {
      items: any[];
    };
  };
}

export const extractCollection = (
  fetchResponse: CollectionResponse,
  key: string
) => fetchResponse?.data?.[key]?.items;

export const extractCollectionItem = (
  fetchResponse: CollectionResponse,
  key: string
) => fetchResponse?.data?.[key]?.items?.[0];

export const sortAndGroup = (
  data: ArtistInterface[],
  role: ArtistFilterType
): {
  alphabet: string;
  artists: ArtistInterface[];
}[] => {
  return Object.values(
    data
      .filter((artist) => {
        if (role === "All" || artist.isResident === null) return artist;
        if (role === "Residents" && artist.isResident === false) return artist;
        if (role === "Guests" && artist.isResident === false) return artist;
      })
      .reduce((accumulator, current) => {
        let alphabet = current.name[0];

        if (!accumulator[alphabet]) {
          accumulator[alphabet] = {
            alphabet,
            artists: [current],
          };
        } else {
          accumulator[alphabet].artists.push(current);
        }

        return accumulator;
      }, {})
  );
};

export const formatArtistNames = (data: ArtistInterface[]) => {
  const names = data.map(({ name }) => name);

  if (names.length === 1) {
    return `With ${names[0]}`;
  }

  if (names.length === 2) {
    return `With ${names[0]} and ${names[1]}`;
  }

  if (names.length === 3) {
    return `With ${names.slice(0, 2).join(", ")} and ${names[3]}`;
  }

  return `With ${names.slice(0, 2).join(", ")} and others`;
};

export const getMixcloudKey = (url: string) =>
  url.replace("https://www.mixcloud.com", "");

export const isServer = typeof window === "undefined";

/**
 * Sorting functions for Arrays
 */
export const sort = {
  alpha: (a: string, b: string) =>
    a.localeCompare(b, "en", { sensitivity: "base" }),
};
