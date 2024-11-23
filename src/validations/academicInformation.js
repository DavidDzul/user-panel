import * as yup from "yup"

export const postgraduate_name = () => yup.string().required("Campo requerido").label("Nombre del posgrado")
export const institute_name = () => yup.string().required("Campo requerido").label("Nombre de la institución")
export const postgraduate_start_date = () => yup.string().required("Campo requerido").label("Fecha de inicio")
export const postgraduate_end_date = () => yup.string().required("Campo requerido").label("Fecha de término")
export const highlight = () => yup.string().required("Campo requerido").label("Destacado")
