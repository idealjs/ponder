import qs from "qs";

const getHelper = <Query>(url: string, query: Query) =>
  fetch(new URL(`${url}?${qs.stringify(query)}`).toString()).then((res) =>
    res.json()
  );

export default getHelper;
