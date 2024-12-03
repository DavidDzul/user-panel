import * as yup from "yup"

export const vacant_name = () => yup.string().required("Campo requerido").label("Nombre")
export const category = () => yup.string().required("Campo requerido").label("Categoría")
export const activities = () => yup.string().required("Campo requerido").label("Actividades o funciones")
export const study_profile = () => yup.string().required("Campo requerido").label("Perfil de estudios")
export const net_salary = () => yup.string().required("Campo requerido").label("Sueldo neto mensual")
export const start_day = () => yup.string().required("Campo requerido").label("Categoría")

export const end_day = () => yup.string().required("Campo requerido").label()
export const start_hour = () => yup.string().required("Campo requerido").label()
export const end_hour = () => yup.string().required("Campo requerido").label()
export const saturday_hour = () => yup.boolean().default(false)
export const saturday_start_day = () => yup.string().notRequired().label()
export const saturday_end_day = () => yup.string().notRequired().label()
export const additional_time_info = () => yup.string().notRequired().label()
export const experience = () => yup.boolean().default(false)
export const experience_description = () => yup.string().notRequired().label()
export const software_use = () => yup.boolean().default(false)
export const software_description = () => yup.string().notRequired().label()
export const skills = () => yup.string().required("Campo requerido").label()
export const observations = () => yup.string().notRequired().label()

export const financial_support = () => yup.string().notRequired().label("Apoyo económico")
export const semester = () => yup.string().required().label()
export const general_knowledge = () => yup.boolean().default(false)
export const knowledge_description = () => yup.string().notRequired().label()

export const employment_contract = () => yup.boolean().default(false)
export const vacation = () => yup.boolean().default(false)
export const christmas_bonus = () => yup.boolean().default(false)
export const social_security = () => yup.boolean().default(false)
export const vacation_bonus = () => yup.boolean().default(false)
export const grocery_vouchers = () => yup.boolean().default(false)
export const savings_fund = () => yup.boolean().default(false)
export const life_insurance = () => yup.boolean().default(false)
export const medical_expenses = () => yup.boolean().default(false)
export const day_off = () => yup.boolean().default(false)
export const sunday_bonus = () => yup.boolean().default(false)
export const paternity_leave = () => yup.boolean().default(false)
export const transportation_help = () => yup.boolean().default(false)
export const productivity_bonus = () => yup.boolean().default(false)
export const automobile = () => yup.boolean().default(false)
export const dining_room = () => yup.boolean().default(false)
export const loans = () => yup.boolean().default(false)
export const other = () => yup.boolean().default(false)
export const benefit_description = () => yup.string().notRequired().label()

export const contact_name = () => yup.string().required().label()
export const contact_position = () => yup.string().required().label()
export const contact_telphone = () => yup.string().required().label()
export const contact_email = () => yup.string().required().label()