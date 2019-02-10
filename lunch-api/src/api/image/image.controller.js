const fs = require('fs-extra');
const _ = require('lodash');

/**
 * 무작위 이미지 선택
 */
exports.list = async ctx => {
  const fileArr = await fs.readdir('./src/images');
  const randomNum = _.random(0, fileArr.length - 1);
  const name = fileArr[randomNum];

  if (!name) {
    ctx.status = 500;
    return;
  }

  const buffer = await fs.readFile(`./src/images/${name}`);
  const base64data = Buffer.from(buffer).toString('base64');

  ctx.body = {
    base64data: base64data
  };
};
