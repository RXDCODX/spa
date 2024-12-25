import { resolve } from "path";
import { generateApi } from "swagger-typescript-api";

generateApi({
  input: resolve(process.cwd(), "./api/swagger.json"),
  output: resolve(process.cwd(), "./src/shared/api/generated/"),
  name: "baza.ts",
  cleanOutput: true,
  prettier: {
    trailingComma: "all",
    tabWidth: 4,
    printWidth: 160,
  },
  onCreateComponent: onCreateComponent,
  generateClient: false,
});

function onCreateComponent(component) {
  function toPascalCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) =>
      match.toUpperCase().replace(/\s+/g, "")
    );
  }

  function mapEntries(object, mapCallbackFn) {
    return Object.fromEntries(Object.entries(object).map(mapCallbackFn));
  }

  function pascalCaseProperties(object) {
    if (Array.isArray(object)) {
      return object.map(pascalCaseProperties);
    } else if (typeof object === "object" && object !== null) {
      if (object.properties) {
        object.properties = pascalCaseProperties(object.properties);
      }

      if (object.items) {
        object.items = pascalCaseProperties(object.items);
      }

      ["allOf", "anyOf", "oneOf"].forEach((keyword) => {
        if (object[keyword]) {
          object[keyword] = pascalCaseProperties(object[keyword]);
        }
      });

      if (
        object.additionalProperties &&
        typeof object.additionalProperties === "object"
      ) {
        object.additionalProperties = pascalCaseProperties(
          object.additionalProperties
        );
      }

      if (object.required && Array.isArray(object.required)) {
        object.required = object.required.map(toPascalCase);
      }

      return mapEntries(object, ([key, value]) => {
        return [toPascalCase(key), pascalCaseProperties(value)];
      });
    } else {
      return object;
    }
  }

  component.rawTypeData = pascalCaseProperties(component.rawTypeData);
  return component;
}
