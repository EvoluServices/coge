module.exports = {
  name: 'generate:component',
  description: 'Create a new react component',
  run: async toolbox => {
    const {
      parameters,
      template,
      print: { success, error }
    } = toolbox;

    const name = parameters.first;
    const { storyGroup, folder = 'src/components' } = parameters.options;

    const filesFolder = `${folder}/${name}`;

    if (!name) {
      error('Component name must be specified');
      return;
    }

    let spinner = toolbox.print.spin('Generating component file...');
    await template.generate({
      template: 'component.tsx.ejs',
      target: `${filesFolder}/${name}.tsx`,
      props: { name }
    });
    spinner.succeed('Component file generated!');

    spinner = toolbox.print.spin('Generating component stories file...');
    await template.generate({
      template: 'stories.tsx.ejs',
      target: `${filesFolder}/${name}.stories.tsx`,
      props: { name, storyGroup }
    });
    spinner.succeed('Stories file generated!');

    spinner = toolbox.print.spin('Generating component tests file...');
    await template.generate({
      template: 'test.tsx.ejs',
      target: `${filesFolder}/${name}.test.tsx`,
      props: { name }
    });
    spinner.succeed('Tests file generated!');

    spinner = toolbox.print.spin('Generating component index file...');
    await template.generate({
      template: 'index.tsx.ejs',
      target: `${filesFolder}/index.tsx`,
      props: { name }
    });
    spinner.succeed('Index file generated!');

    success(`Generated ${name} component in ${filesFolder}.`);
  }
};
