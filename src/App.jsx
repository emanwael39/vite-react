import "./App.css";
import MainComponent from "./components/MainComponent";
import "./App.css";
import { Container } from "@mui/material";
// import PrayerTimesByCity from "./components/test";

function App() {
  return (
    <>
      <div style={{ width: "100vw" }}>
        <Container>
          <MainComponent />
        </Container>
      </div>
    </>
  );
}

export default App;
