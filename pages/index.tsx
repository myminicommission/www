import Box from "../components/Box";

export default function Home() {
  return (
    <div>
      <div className="lg:px-4">
        <div className="max-w-none lg:max-w-7xl mx-auto my-0 lg:my-16">
          <Box
            header="My Mini Commission"
            subheader="Coming Soon!"
            className="p-8 lg:p-16"
          >
            My Mini Commission is the brainchild of{" "}
            <a href="https://twitch.tv/ExtremeModeration" target="_blank">
              ExtremeModeration
            </a>{" "}
            and is being developed as a way to organize and communicate about
            miniature commission painting. Originally designed to be a personal
            tool, Extreme has decided to open his tool to the global miniature
            painting community. Stay tuned for further developments (pun
            intended)!
          </Box>
        </div>
      </div>
    </div>
  );
}
