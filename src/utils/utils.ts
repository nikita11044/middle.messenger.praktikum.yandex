/**
 * Метод для генерации разметки для нескольких компонентов одного типа
 * @param component - имя компонента (classname)
 * @param data - массив объектов с данными для генерации компонентов (1 объект = 1 instance компонета)
 * @param customAttributes - дополнительные аттрибуты, которые будут приписаны каждому instance
 * @returns {string} строка с разметкой
 * @type {(component : string, data : Array<Record<string, any>>, ....customAttributes : Array<string>) => string}
 * */
export function getComponentsLayoutFromArray(component: string, data: Array<Record<string, any>>, ...customAttributes: Array<string>): string {
  return data.reduce((layout: string, dataElement: any) => {
    const mainAttributes = Object.entries(dataElement)
      .reduce((acc, [key, val]) => `${acc} ${key}="${val}"`, '');

    if (customAttributes) {
      return `${layout}{{{${component} ${mainAttributes} ${customAttributes.join(' ')}}}}`;
    }

    return `${layout}{{{${component} ${mainAttributes}}}}`;
  }, '');
}
