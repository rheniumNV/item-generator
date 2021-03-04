require("dotenv").config();
const { appLogger, LOG } = require("../logger/logger");
const Neos = require("@bombitmanbomb/neosjs");
const neos = new Neos();
const { NEOS_BOT_USERNAME, NEOS_BOT_PASSWORD } = process.env;
const { format, inspect } = require("../helpers/helper");

const login = async () => {
  try {
    appLogger.info(
      LOG.NEOS_BOT.LOGIN,
      format("try login %s", NEOS_BOT_USERNAME)
    );
    const result = await neos.Login(NEOS_BOT_USERNAME, NEOS_BOT_PASSWORD);
    appLogger.info(
      LOG.NEOS_BOT.LOGIN,
      format("Finish login %s", inspect(result))
    );
  } catch (error) {
    appLogger.error(LOG.NEOS_BOT.LOGIN, format("try login %s", inspect(error)));
  }
};

//neos.on("login", (obj) => {});

neos.on("friendAdded", (friend) => {
  try {
    if (friend.FriendStatus == "Requested") {
      neos.AddFriend(friend);
      appLogger.info(
        LOG.NEOS_BOT.FRIEND,
        format("new friend %s", inspect(friend))
      );
    }
  } catch (error) {
    appLogger.error(
      LOG.NEOS_BOT.FRIEND,
      format("event/friendAdded %s", inspect(error))
    );
  }
});

neos.on("messageReceived", async (message) => {
  try {
    appLogger.info(
      LOG.NEOS_BOT.MESSAGE,
      format("received %s", inspect(message))
    );
    const result = await neos.SendTextMessage(
      message.SenderId,
      message.Content
    );
    appLogger.info(LOG.NEOS_BOT.MESSAGE, format("send %s", inspect(result)));
  } catch (error) {
    appLogger.error(
      LOG.NEOS_BOT.MESSAGE,
      format("event/messageReceived %s", inspect(error))
    );
  }
});

module.exports = {
  neos,
  login,
};
