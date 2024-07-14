import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query-nextjs";
import { createWebStoragePersister } from "@tanstack/query-sync-storage-persister";
import { api } from "./dataFetch";
import { useQueryClient } from "@tanstack/react-query";

// making a post request
const checkUserTempAndUpdate = async (data) => {
  // check if the user is temporary
  try {
    const data = await api.put(
      "http://localhost:5060/user/temp-user/check",
      data
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export async function getServerSideProps(dataInfo) {
  const queryClient = new QueryClient();
  const data = await checkUserTempAndUpdate(dataInfo);
  queryClient.setQueriesData("userTemp", data);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

/* const MyPage = () => {
  const queryClient = useQueryClient();

  // Hydrate the cache using the dehydrated state passed from getServerSideProps
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      queryClient.hydrate(dehydratedState);
    }
  }, [queryClient, dehydratedState]);

  // ... rest of your component code
};
 */
/* export default MyPage;

export function useQueryClient() {
  return useQueryClient({ client: queryClient });
}
 */


/* 
// pages/user-temp.js

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { checkUserTempAndUpdate } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export async function getServerSideProps(context) {
  const queryClient = new QueryClient();
  const { username, password, devID } = context.query;

  try {
    const data = await checkUserTempAndUpdate({ username, password, devID });
    queryClient.setQueryData(["userTemp", { username, password, devID }], data);
  } catch (error) {
    console.error("Error fetching data in getServerSideProps:", error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const UserTempPage = ({ dehydratedState }) => {
  const { data, isLoading, error } = useQuery(["userTemp"], () => {
    return dehydratedState;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Temp Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserTempPage;


*/