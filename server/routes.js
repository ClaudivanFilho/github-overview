const path = require('path');
const controller = require('./controller');

const defaultReps = [
  {
    owner: 'vtex-apps', name: 'admin-pages',
  }, {
    owner: 'vtex-apps', name: 'render-runtime',
  },
];

module.exports = (app) => {
  // ================== API ROUTES ============================ //

  /** Get all repositories from the session. */
  app.get('/api/repository', async (req, res) => {
    if (!req.session.repositories) {
      req.session.repositories = defaultReps;
    }
    const repositories = await controller.fetchRepositories(req.session.repositories);
    res.json(repositories);
  });

  /** Add a repository to the session. */
  app.post('/api/repository', (req, res) => {
    const { owner, name } = req.body;
    const repositories = req.session.repositories || [];
    const repositoryFound = repositories.filter(rep => (
      rep.owner === owner && rep.name === name
    )).pop();

    // VALIDATION
    if (!owner || !name) {
      res.status(400).json({ error: 'owner or name invalid.' });
      return;
    } if (repositoryFound) {
      res.status(400).json({ error: 'repository already added.' });
      return;
    }

    req.session.repositories = [...repositories, { owner, name }];
    res.json({ message: 'repository saved successfully.' });
  });

  /** Removes a repository from the session. */
  app.delete('/api/repository', (req, res) => {
    const { owner, name } = req.body;

    // VALIDATION
    if (!owner || !name) {
      res.status(400).json({ error: 'owner or name invalid.' });
      return;
    }

    const repositories = req.session.repositories || [];
    const newRepositories = repositories.filter(rep => (
      rep.owner !== owner || rep.name !== name
    ));
    req.session.repositories = newRepositories;
    res.json({ message: 'repository removed successfully.' });
  });

  /** Main route */
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
};
