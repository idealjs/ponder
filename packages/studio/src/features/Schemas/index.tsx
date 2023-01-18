import trpc from "../../trpc";

const Schemas = () => {
  const result = trpc.schema.findManySchema.useQuery({
    where: {},
    include: {
      states: true,
      transitions: true,
      actions: true,
    },
    select:{
      states:true
    }
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>states[]</th>
              <th></th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {result.data?.map(({ id, ...restData }) => {
              return (
                <tr className="hover" key={id}>
                  <th>{id}</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
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
