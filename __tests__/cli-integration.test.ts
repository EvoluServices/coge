const { system, filesystem } = require('gluegun');

const src = filesystem.path(__dirname, '..');

const cli = async cmd =>
  system.run('node ' + filesystem.path(src, 'bin', 'coge') + ` ${cmd}`);

test('outputs version', async () => {
  const output = await cli('--version');
  expect(output).toContain('0.0.1');
});

test('outputs help', async () => {
  const output = await cli('--help');
  expect(output).toContain('0.0.1');
});

test('generates component', async () => {
  const output = await cli('generate:component Foo');

  expect(output).toContain('Generated Foo component in src/components/Foo.');

  // cleanup artifact
  filesystem.remove('src/components');
});
