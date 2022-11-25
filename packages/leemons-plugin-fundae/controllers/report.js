const _ = require('lodash');
const reportService = require('../src/services/report');

async function generate(ctx) {
  const { userAgents, program, course } = ctx.request.body;
  const reports = await reportService.generate(userAgents, program, { course });
  ctx.status = 200;
  ctx.body = { status: 200, reports };
}

async function list(ctx) {
  const validator = new global.utils.LeemonsValidator({
    type: 'object',
    properties: {
      page: { type: ['number', 'string'] },
      size: { type: ['number', 'string'] },
    },
    required: ['page', 'size'],
    additionalProperties: false,
  });
  if (validator.validate(ctx.request.query)) {
    const { page, size } = ctx.request.query;
    const data = await reportService.listReports(parseInt(page, 10), parseInt(size, 10));
    ctx.status = 200;
    ctx.body = { status: 200, data };
  } else {
    throw validator.error;
  }
}

module.exports = {
  generate,
  list,
};