const postHelper = <Body>(url: string, body: Body) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(async (res) => {
    if (!res.ok) {
      throw await res.json();
    }
    return res.json();
  });

export default postHelper;
