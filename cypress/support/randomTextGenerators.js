const randomTextGenerator = () => {
  const randomtext = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const textlength = Math.floor(Math.random() * 10);
  let text = "";
  while (text.length < textlength) {
    text += randomtext[Math.floor(Math.random() * randomtext.length)];
  }
  return text;
};

const randomEmailGenerator = () => {
  return `${randomTextGenerator()}@mail.com`;
};
