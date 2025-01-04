import * as yup from "yup";
export const ContactSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  phone: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("Campo obrigatório"),
  msg: yup.string().required("Campo obrigatório"),
});