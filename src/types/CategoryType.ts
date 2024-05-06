export interface CategoryType {
  category_id: string;
  name: string;
  properties: PropertiesType[];
}

type PropertiesType = {
  propertyName: string;
  propertyValue: string;
};
