import format from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises'
import path from 'path';

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyy/mm/dd')}`;
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`; // Add parentheses after uuid
    console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, '..' , 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..' , 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..' , 'logs', logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  //logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method} ${req.path}`);
  next();
};

export default { logger , logEvents};
