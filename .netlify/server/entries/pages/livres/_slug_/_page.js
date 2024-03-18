import { e as error } from "../../../../chunks/index.js";
async function load({ params, parent }) {
  const { books } = await parent();
  let match = null;
  books.forEach((book) => {
    if (book.slug?.fr?.current === params.slug || book.slug?.en?.current === params.slug) {
      match = book;
    }
  });
  if (!match) {
    return error(404, "Not found");
  }
  return match;
}
export {
  load
};
