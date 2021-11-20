export const getLocation = function (url: string) {
    var tag = document.createElement("a");
    tag.href = url;
    return tag;
};
