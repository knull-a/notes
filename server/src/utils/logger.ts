import logger from "pino";
import dayjs from "dayjs";
import pretty from "pino-pretty";

const log = logger({
 timestamp: () => `,"time":"${dayjs().format()}"`,
}, pretty({ colorize: true }));

export default log;
