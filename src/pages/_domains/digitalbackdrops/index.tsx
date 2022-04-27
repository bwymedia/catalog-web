import fetcher from "../../../api/fetcher";
import DropsIndex from "../../../components/DropsIndex";
import PageLayout from "../../../components/PageLayout";

export async function getStaticProps() {
  const { data: shows } = (await fetcher({
    path: "shows",
    params: {
      sort: "title",
      "filter[with_drops]": "1",
    },
  })) as ApiDocument<Show[]>;
  const { data: tags } = (await fetcher({
    path: "tags",
    params: { sort: "name" },
  })) as ApiDocument<Tag[]>;
  return {
    props: { shows, tags },
    revalidate: 60,
  };
}

interface Props {
  shows: Show[];
  tags: Tag[];
}

export default function Index({ shows, tags }: Props) {
  return (
    <PageLayout>
      <DropsIndex shows={shows} tags={tags} />
    </PageLayout>
  );
}
