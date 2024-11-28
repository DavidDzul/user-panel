import * as yup from "yup"

export const course_name = () => yup.string().required("Campo requerido").label("Nombre del curso")
export const course_institute = () => yup.string().required("Campo requerido").label("Nombre de la institución")
export const course_start_date = () => yup.string().required("Campo requerido").label("Fecha de inicio")
export const course_end_date = () => yup.string().required("Campo requerido").label("Fecha de término")
