import Loader from "./Loader";
import Page from "./Page";

export default function PageLoader() {
  return (
    <Page>
      <div className="flex align-middle items-center justify-center justify-items-center">
        <Loader />
      </div>
    </Page>
  );
}
