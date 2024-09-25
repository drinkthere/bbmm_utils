const { v4: uuidv4 } = require("uuid");

function genClientOrderId() {
    return uuidv4().replace(/-/g, "");
}

module.exports = {
    genClientOrderId,
};
