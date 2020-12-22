import Image from "next/image";
import Link from "next/link";
import PlayLarge from "../icons/playLarge";
import type { ShowInterface } from "../types/shared";
import { sort } from "../util";
import Badge from "./badge";
import Date from "./date";

export default function ShowPreview({
  slug,
  title,
  coverImage,
  genresCollection,
  date,
}: ShowInterface) {
  const genres = genresCollection.items
    .map((genre) => genre.name)
    .sort(sort.alpha)
    .slice(0, 3);

  return (
    <article className="text-small">
      <div className="flex relative group">
        <Image
          key={slug}
          src={coverImage.url}
          width={590}
          height={345}
          objectFit="cover"
          objectPosition="center"
          alt={title}
        />
        <div className="inset-0 absolute bg-black bg-opacity-0 transition-colors duration-150 group-hover:bg-opacity-60 flex items-center justify-center text-white text-opacity-0 group-hover:text-opacity-100">
          <div className="-mr-4">
            <PlayLarge />
          </div>
        </div>
      </div>

      <div className="h-2" />

      <Link href={`/radio/${slug}`}>
        <a aria-labelledby={`show-${slug}`}>
          <h2 id={`show-${slug}`} className="font-sans font-medium truncate">
            {title}
          </h2>

          <p>
            <Date dateString={date} />
          </p>

          <div className="h-2" />

          <ul className="w-full flex flex-wrap -mr-2 -mb-2">
            {genres.map((genre, i) => (
              <li key={i} className="pr-2 pb-2">
                <Badge small text={genre} />
              </li>
            ))}
          </ul>
        </a>
      </Link>
    </article>
  );
}
