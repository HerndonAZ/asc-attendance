import { parseString } from 'xml2js';

export const convertXmlToJson = (xmlString: string) => {
  return new Promise((resolve, reject) => {
    parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
