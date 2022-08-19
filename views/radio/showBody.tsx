import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import { Fragment } from "react";
import Badge from "../../components/badge";
import Date from "../../components/date";
import Pill from "../../components/pill";
import Prose from "../../components/Prose";
import ShareButton from "../../components/shareButton";
import { useGlobalStore } from "../../hooks/useStore";
import PlayCircle from "../../icons/playCircle";
import { ShowInterface } from "../../types/shared";
import { getMixcloudKey, parseGenres } from "../../util";

export default function ShowBody({
  title,
  genresCollection,
  artistsCollection,
  slug,
  date,
  content,
  mixcloudLink,
}: ShowInterface) {
  const genres = parseGenres(genresCollection);

  const artists = artistsCollection.items;

  const persons = (
    <Fragment>
      {artists?.map((artist, i) => {
        const isLast = artists.length === i + 1;

        const a = (
          <Link key={i} href={`/artists/${artist.slug}`}>
            <a className="underline">{artist.name}</a>
          </Link>
        );

        if (artists.length === 1) return a;

        if (isLast) return <Fragment key={i}>and {a}</Fragment>;

        return <Fragment key={i}>{a}, </Fragment>;
      })}
    </Fragment>
  );

  const showKeySet = useGlobalStore((state) => state.showKeySet);

  const onClick = () => showKeySet(getMixcloudKey(mixcloudLink));

  return (
    <Fragment>
      <section>
        <div className="container-md p-4 sm:p-8 bg-white">
          <div className="flex flex-wrap md:flex-nowrap md:space-x-8 lg:space-x-12 justify-between">
            <div className="flex">
              {mixcloudLink && (
                <button
                  className="w-20 h-20 sm:w-28 sm:h-28 rounded-full focus:outline-none focus:ring-4"
                  onClick={onClick}
                >
                  <PlayCircle />
                </button>
              )}
            </div>

            <div className="w-full order-last md:order-none">
              <div className="h-3 block md:hidden" />

              <p className="text-small text-center">
                <Date dateString={date} />
              </p>

              <div className="h-6" />

              <h1 className="text-base sm:text-large text-center">{title}</h1>

              <div className="h-6" />

              <ul className="w-full flex flex-wrap justify-center gap-2">
                {genres.map((genre, i) => (
                  <li key={i}>
                    <Link
                      href={`/radio?genre=${encodeURIComponent(genre)}#shows`}
                    >
                      <Badge as="a" text={genre} />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-6" />

              <p className="font-medium text-center">With {persons}</p>
            </div>

            <div className="flex">
              <ShareButton
                details={{
                  title: title,
                  slug: `/radio/${slug}`,
                }}
              />
            </div>
          </div>

          <div className="h-6" />

          <Prose>{documentToReactComponents(content?.json)}</Prose>
        </div>
      </section>

      <section className="border-t-2 bg-white">
        <div className="container-md p-4 md:p-8">
          <Pill>
            <span className="font-serif">Persons</span>
          </Pill>

          <div className="h-8" />

          <p className="font-medium">{persons}</p>
        </div>
      </section>
    </Fragment>
  );
}
