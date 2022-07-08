import fetcher from "../api/fetcher";
import DropsIndex from "../components/DropsIndex";
import PageLayout from "../components/PageLayout";
import { notification } from "antd";
import { useRouter } from "next/router";

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

const openNotification = () => {
  notification.open({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

export default function Index({ shows, tags }: Props) {
  const { query } = useRouter();
  return (
    <PageLayout>
      {/* {query.session_id && <openNotification />} */}
      <DropsIndex shows={shows} tags={tags} />
    </PageLayout>
  );
}
