import LandingPage from "@/features/landingPage/Components/LandingPage";
import { getAllProjects } from "@/features/project/server/db/project";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-[100vh]">
        <LandingPage />
      </main>
    </HydrationBoundary>
  );
}
