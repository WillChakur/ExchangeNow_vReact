const fetchResult = async (base, target) => {
  console.log(base, target);
  const token = localStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;

  const apiRes = await fetch(`${apiUrl}/rates/${base}/${target}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (apiRes.status === 401) {
    alert(
      "It looks like you're not logged in. Please log in to access your currencies.",
    );
  }
  if (!apiRes.ok) {
    throw new Error(`fetching the result from server`);
  }

  const json = await apiRes.json();

  return json;
};

export default fetchResult;
