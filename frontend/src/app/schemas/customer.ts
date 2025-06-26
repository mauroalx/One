// schemas/customer.ts
import * as yup from "yup";

export const customerSchema = yup.object().shape({
  type: yup.string().required(),
  full_name: yup.string().required("Nome completo é obrigatório"),
  document: yup.string().required("CPF/CNPJ é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.string(),
  mobile1: yup.string(),
  address_street: yup.string().required("Rua é obrigatória"),
  address_number: yup.string().required("Número é obrigatório"),
  address_complement: yup.string(),
  address_neighborhood: yup.string().required("Bairro é obrigatório"),
  address_city: yup.string().required("Cidade é obrigatório"),
  address_state: yup.string().required("Estado é obrigatório"),
  address_zipcode: yup.string().required("CEP é obrigatório"),
  trade_name: yup.string(),
  legal_name: yup.string(),
  rg: yup.string(),
  mother_name: yup.string(),
  father_name: yup.string(),
});
