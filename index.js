const files = "image.jpeg";
// file extension
const ext = files.split(".").pop();
const allExtensions = ["jpeg", "gif", "jpg"];

const checkHasIt = allExtensions.includes(ext);
console.log(checkHasIt);
