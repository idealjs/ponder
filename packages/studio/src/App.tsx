import "./components/monacoWorker";

import { Schemas } from "./features";
import SchemaEditor from "./features/SchemaEditor";
import { useQuerySchemas } from "./hooks";
import { useSelectedSchema } from "./store";

function App() {
  useQuerySchemas();
  const selectedSchema = useSelectedSchema();

  return (
    <div className="App h-screen w-screen">
      {selectedSchema == null ? <Schemas /> : <SchemaEditor />}
    </div>
  );
}

export default App;
