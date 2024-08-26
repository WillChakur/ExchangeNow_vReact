const fetchResult = async (base, target) => {
  console.log(base, target);

  const apiRes = await fetch(`http://localhost:3000/rates/${base}/${target}`, {
    method: "POST",
  });

  if (!apiRes.ok) {
    throw new Error(`Error fetching the result from server`);
  }

  const json = await apiRes.json();

  return json;
};

export default fetchResult;
