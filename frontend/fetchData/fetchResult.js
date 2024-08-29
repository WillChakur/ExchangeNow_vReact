const fetchResult = async (base, target) => {
  console.log(base, target);
  const token = localStorage.getItem("token");

  const apiRes = await fetch(`http://localhost:3000/rates/${base}/${target}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!apiRes.ok) {
    throw new Error(`fetching the result from server`);
  }

  const json = await apiRes.json();

  return json;
};

export default fetchResult;
