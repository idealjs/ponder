import { useSchemas, useSetSelectedSchemaId } from "../store";

const Schemas = () => {
  const setSelectedSchemaId = useSetSelectedSchemaId();
  const schemas = useSchemas();
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>schema id</th>
              <th>states</th>
              <th>transitions</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {schemas?.map(({ id, ...restData }) => {
              return (
                <tr
                  className="hover cursor-pointer"
                  key={id}
                  onClick={() => {
                    setSelectedSchemaId(id);
                  }}
                >
                  <th>{id}</th>
                  <td>{restData.states.length} states</td>
                  <td>{restData.transitions.length} transitions</td>
                  <td>{restData.actions.length} actions</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schemas;
