import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      patching: { append },
      print: { highlight, spin, success },
    } = toolbox

    const name = parameters.first

    highlight(`Gerando arquivos do componente ${name}:\n`)
    let spinner = spin('Gerando o componente')
    await generate({
      template: 'component.tsx.ejs',
      target: `packages/design-system/${name}.tsx`,
      props: { name },
    })
    spinner.succeed()

    spinner = spin('Gerando as histórias')
    await generate({
      template: 'stories.tsx.ejs',
      target: `packages/design-system/stories/${name}.stories.tsx`,
      props: { name },
    })
    spinner.succeed()

    spinner = spin('Exportando o componente')
    await append('packages/design-system/index.tsx', `export * from "./${name}";\n`)
    spinner.succeed()

    success('\nUhul! Tudo certo. Partiu customizar ele 🚀')
  },
}
