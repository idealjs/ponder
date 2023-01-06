import Menubar from "./features/Menubar";
import PonderAdmin from "./features/PonderAdmin";

function App() {
  return (
    <div className="App h-screen w-screen relative">
      <Menubar>
        <PonderAdmin />
      </Menubar>
    </div>
  );
}

export default App;
