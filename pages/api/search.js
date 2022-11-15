import { getXataClient } from '../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { searchTerm } = req.body;

  const results = await xata.search.all(searchTerm);

  res.send(results);
};

export default handler;
