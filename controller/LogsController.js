const LogsRepository = require('../db/repository/LogsRepository');

// Get Logs Page.
exports.getLogs = (req, res) => {
  let page = Number(req.query.page);
  if(!page) {
    page = 0;
  }

  LogsRepository.listLogs(page).then(logs => {
    logs = logs.results;
    const logsCount = logs.length;
    res.render('logs', { logs, page, logsCount });
  });
};
