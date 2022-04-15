export default (object: any) => {
  console.log("--------------------");
  console.log("System Error", object);
  console.log("--------------------");

  return {
    status: object.status || 500,
    message: object.message || "Something wrong happen on backend",
    error: object.error,
  };
};
