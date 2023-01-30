const getHelper = (url: string, query: string) =>
  fetch(new URL(`${url}?${query}`).toString()).then(async (res) => {
    if (!res.ok) {
      throw await res.json();
    }
    return res.json();
  });

export default getHelper;
