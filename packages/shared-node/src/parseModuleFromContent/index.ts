const parseModuleFromContent = async (moduleContent: string) => {
  let b64moduleData =
    "data:text/javascript;charset=utf-8;base64," +
    Buffer.from(moduleContent).toString("base64");
  const module = await import(/* webpackIgnore: true */ b64moduleData);
  return module;
};

export default parseModuleFromContent;
