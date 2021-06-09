const getPaginationParams = (page, size) => {
  const limit = size && size > 0 ? +size : 10;
  const offset = page && page > 0 ? (+page - 1) * limit : 0;

  return { limit, offset };
};

const getPaginationData = (rowData, limit, page) => {
  const { count, rows: data } = rowData;
  const currentPage = page && page > 0 ? +page : 1;
  const pages = Math.ceil(count / limit);

  return { count, pages, currentPage, size: limit, data };
};

module.exports = {
  getPaginationData,
  getPaginationParams,
};
