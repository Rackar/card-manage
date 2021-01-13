const config = (route = "api/cards", production = true) => {
  const productionHOST = "https://tools.codingyang.com/api/";
  const developHOST = "http://localhost:3006/";

  let Config = {
    URL: "",
  };
  if (production) {
    Config.URL = productionHOST + route;
  } else {
    Config.URL = developHOST + route;
  }
  return Config;
};

export { config };
