import type { PlopTypes } from "@turbo/gen";
import path from "path";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("create-package", {
    description: "Generate a new package in the monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the new package?",
      },
      {
        type: "input",
        name: "description",
        message: "What is the description of the new package?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{name}}/README.md",
        template: "# @erlcjs/{{name}}\n\n{{description}}",
      },
      {
        type: "addMany",
        destination: "packages/{{name}}",
        base: "templates/package",
        templateFiles: "templates/package/**",
      },
    ],
  });
}