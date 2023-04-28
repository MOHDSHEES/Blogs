const loadTwitter = (callback) => {
  const existingScript = document.getElementById("twitter");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.id = "twitter";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadTwitter;
