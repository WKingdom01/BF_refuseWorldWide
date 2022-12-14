import { graphql } from "..";
import { NewsletterPageData } from "../../../types/shared";
import { extractPage } from "../../../util";

export async function getNewsletterPage(preview: boolean) {
  const NewsletterPageQuery = /* GraphQL */ `
    query NewsletterPageQuery($preview: Boolean) {
      pageNewsletter(id: "7t2jOQoBCZ6sGK4HgBZZ42", preview: $preview) {
        coverImage {
          sys {
            id
          }
          title
          description
          url
          width
          height
        }
        content {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                contentType
                title
                description
                url
                width
                height
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphql(NewsletterPageQuery, {
    variables: { preview },
    preview,
  });

  return extractPage<NewsletterPageData>(data, "pageNewsletter");
}
