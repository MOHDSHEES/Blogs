const openMessage = (messageApi, content) => {
  messageApi.open({
    key: "updatable",
    type: "loading",
    duration: 0,
    content: content,
  });
};
function closeMessage(messageApi, msg, type) {
  messageApi.open({
    key: "updatable",
    type: type,
    content: msg,
    duration: 3,
  });
}

export { openMessage, closeMessage };
