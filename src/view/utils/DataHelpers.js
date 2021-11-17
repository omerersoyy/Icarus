export const groupBy = (arr, prop) => {
  const all = [];
  const grouped = {};

  Object.values(arr).forEach((set, _idx) => {
    set.forEach((i, _id) => {
      all.push(i);

      if (i.hasOwnProperty(prop)) {
        i[prop].forEach(({name}, _key) => {
          let _group = grouped[name] || [];
          _group.push(i);
          grouped[name] = _group;
        });
      }
    });
  });

  return {
    all,
    grouped,
  };
};
