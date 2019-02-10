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

/**
 * 이미지 업로드
 */
exports.upload = async ctx => {
  const file = ctx.request.files.file;
  const name = ctx.request.body.name;

  if (!file || !name) {
    ctx.status = 400;
    return;
  }

  try {
    const fileArr = await fs.readdir('./src/images');
    const fileName = file.name;
    const ext = fileName.split('.')[1];

    if (fileArr.includes(name)) {
      ctx.status = 400;
      return;
    }

    const data = await fs.readFile(file.path);
    await fs.writeFile(`./src/images/${name}.${ext}`, data);
  } catch (e) {
    ctx.status = 400;
    return;
  }

  ctx.status = 204;
};
