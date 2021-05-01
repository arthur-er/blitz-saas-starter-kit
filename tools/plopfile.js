const pluralize = require("pluralize")
module.exports = function (plop) {
  plop.setHelper("plural", (term) => {
    return pluralize.plural(term)
  })
  plop.setGenerator("App Module", {
    description: "generate a app module with domain, repository, queries and mutations",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "module name? (singular please)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../app/modules/{{plural name}}/domain/{{name}}Entity.ts",
        templateFile: "./templates/domain/entity.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "../app/modules/{{plural name}}/domain/{{name}}Factory.ts",
        templateFile: "./templates/domain/factory.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "../app/modules/{{plural name}}/infra/{{plural name}}Repository.ts",
        templateFile: "./templates/infra/repository.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "../app/modules/{{plural name}}/mutations/create{{sentenceCase name}}.ts",
        templateFile: "./templates/mutations/create.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "../app/modules/{{plural name}}/mutations/update{{sentenceCase name}}.ts",
        templateFile: "./templates/mutations/update.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "../app/modules/{{plural name}}/queries/get{{sentenceCase (plural name)}}.ts",
        templateFile: "./templates/queries/getMany.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "../app/modules/{{plural name}}/queries/find{{sentenceCase name}}ById.ts",
        templateFile: "./templates/queries/getOne.hbs",
        skipIfExists: true,
      },
    ],
  })
}
