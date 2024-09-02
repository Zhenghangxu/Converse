type FieldTypes = {
  regex: string;
};

const fieldTypes: Record<string, FieldTypes> = {
  email: {
    regex: "^[^\\s@]+@[^\\s@]+.[^\\s@]+$",
  },
};

export default function validate(value: string, type: string) {
  // compare the value to the correct regex
  const re = new RegExp(fieldTypes[type].regex);
  return re.test(value);
}
