import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      patching: { append },
      print: { info },
    } = toolbox

    const name = parameters.first

    await generate({
      template: 'component.tsx.ejs',
      target: `packages/design-system/${name}.tsx`,
      props: { name },
    })

    await generate({
      template: 'stories.tsx.ejs',
      target: `packages/design-system/stories/${name}.stories.tsx`,
      props: { name },
    })

    await append('packages/design-system/index.tsx', `export * from "./${name}"\n`)

    info(`Generated component ${name}`)
  },
}
