import * as yup from "yup"

import { typeKnowledge } from "@/constants"

export const type = () => yup.string().required("Campo requerido").label("Categoría")
export const other_knowledge = () => yup.string().notRequired("Campo requerido").label("Otro")
export const description_knowledge = () => yup.string().required("Campo requerido").label("Descripción")
export const level = () => yup.string().required("Campo requerido").label("Nivel de dominio")
