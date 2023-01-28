const postHelper = <Body>(url: string, body: Body) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());

export default postHelper;
