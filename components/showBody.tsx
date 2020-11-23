import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import Show from "../pages/radio/[slug]";
import { ShowInterface } from "../types/shared";
import { formatArtistNames } from "../util";
import Badge from "./badge";
import Date from "./date";
import Pill from "./pill";

export default function ShowBody({
  title,
  genresCollection,
  artistsCollection,
  coverImage,
  date,
  location,
  content,
}: ShowInterface) {
  const genres = genresCollection.items;

  const artists = artistsCollection.items;

  const dateAndPlace = (
    <p className="text-small">
      <Date dateString={date} />
      {location && `, ${location}`}
    </p>
  );

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

        if (isLast) return <Fragment>and {a}</Fragment>;

        return <Fragment>{a}, </Fragment>;
      })}
    </Fragment>
  );

  return (
    <Fragment>
      <div>
        <Image
          className="object-cover object-center"
          src={coverImage?.url}
          alt={coverImage?.title}
          width={1280}
          height={720}
        />
      </div>

      {dateAndPlace}

      <h1>{title}</h1>

      <ul className="flex">
        {genres.map((genre, i) => (
          <li key={i}>
            <Badge text={genre.name} />
          </li>
        ))}
      </ul>

      <p className="font-medium">With {persons}</p>

      <div>{documentToReactComponents(content?.json)}</div>

      <Pill>
        <span className="font-serif">Persons</span>
      </Pill>

      <p className="font-medium">{persons}</p>

      <script
        src="https://widget.mixcloud.com/media/js/footerWidgetApi.js"
        type="text/javascript"
      />
    </Fragment>
  );
}
