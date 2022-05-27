type Data = {
  id: string,
  data: object
}

export const formatData = (datas: Array<Data>) => {
  return datas.map(data => ({id: data.id, ...data.data}));
}
