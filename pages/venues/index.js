import PaginationPage from "../../src/components/PaginationPage";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import Head from "next/head";

export const getServerSideProps = async ({ query }) => {
  if (!query.page || isNaN(query.page) || query.page <= 0) {
    return {
      redirect: {
        destination: "/venues?page=1",
        permanent: false,
      },
    };
  }

  const page = Number(query.page);
  const data = await mainFetcher(`/venues?page=${page - 1}&size=20`);

  if (!data.results.length) {
    return {
      notFound: true,
    };
  }

  const venues = data.results;

  const pageCount = data.totalPages;

  return {
    props: {
      venues,
      pageCount,
      page,
    },
  };
};

const VenuesPagination = ({ venues, pageCount, page }) => {
  return (
    <>
      <Head>
        <title>Θεατρικοί Χώροι | Theatrica</title>
      </Head>
      <PaginationPage
        title="Θέατρα"
        items={venues}
        pageCount={pageCount}
        page={page}
        path="/venues"
      />
    </>
  );
};

export default VenuesPagination;
