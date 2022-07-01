import { useRouter } from "next/router";
import useSWr from "swr";

const Success = () => {
  const router = useRouter();

  const { data, error } = useSWr(
    router.query.session_id
      ? `/api/checkout_session/${router.query.session_id}`
      : null,
    (url) => fetch(url).then((res) => res.json())
  );

  return (
    <div>
      <h1>Success</h1>
      <p>You have successfully submitted your order.</p>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading"}</pre>
    </div>
  );
};

export default Success;
