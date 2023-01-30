const getHelper = (url: string, query: string) => {
  console.log("test test", url);
  return fetch(new URL(`${url}?${query}`).toString()).then(async (res) => {
    if (!res.ok) {
      throw await res.json();
    }
    return res.json();
  });
};

export default getHelper;
