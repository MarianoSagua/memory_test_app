import { MemoRoutes } from "../MemoApp/routes/MemoRoutes";
import { useLanding } from "../hooks";
import { LandingView } from "../MemoApp/views";

export const AppRouter = () => {
  const { showLanding } = useLanding();

  return <>{showLanding ? <LandingView /> : <MemoRoutes />}</>;
};
