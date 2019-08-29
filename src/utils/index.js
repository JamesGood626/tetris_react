import sanctuary from "sanctuary";

const S = sanctuary.create({
  checkTypes: process.env.NODE_ENV !== "production",
  env: sanctuary.env
});

export default S;
