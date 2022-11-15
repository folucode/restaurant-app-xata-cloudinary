import { getXataClient } from '../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { name, price, image_url } = req.body;

  await xata.db.meals.create({
    price: parseFloat(price),
    name,
    image_url,
  });

  res.end();
};

export default handler;
