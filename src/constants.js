export const API_URL = "http://127.0.0.1:8000/";
// export const API_URL = "https://api.develop.iu.org.mx/";

export const sedeArray = [
    { value: 'MERIDA', text: "Mérida" },
    { value: 'VALLADOLID', text: "Valladolid" },
    { value: 'TIZIMIN', text: "Tizimín" },
    { value: 'OXKUTZCAB', text: "Oxkutzcab" },
]

export const typeKnowledge = [
    { value: "SOFTWARE", text: "Software" },
    { value: "LANGUAGE", text: "Idioma" },
    { value: "OTHER", text: "Otro" },
]

export const levelKnowledge = [
    { value: "BEGINNER", text: "Principiante" },
    { value: "INTERMEDIATE", text: "Intermedio" },
    { value: "ADVANCED", text: "Avanzado" },
]

export const lineBusiness = [
    { value: "EDUCATIONAL", text: "Educativo" },
    { value: "GOVERNMENT", text: "Gobierno" },
    { value: "HEALTH", text: "Salud" },
    { value: "ENVIRONMENT", text: "Medio ambiente" },
    { value: "TOURISM", text: "Turismo" },
    { value: "FOOD_AND_DRINKS", text: "Alimentos y bebidas" },
    { value: "COMMUNICATION", text: "Comunicación" },
    { value: "CONSTRUCTION_AND_DESIGN", text: "Construcción y diseño" },
    { value: "ADMINISTRATION", text: "Administración" },
    { value: "MANUFACTURE", text: "Manufactura" },
    { value: "OTHER", text: "Otro" },
]

export const typeKnowledgeMap = new Map([
    [
        'SOFTWARE',
        {
            value: 'SOFTWARE',
            text: "Software",
        },
    ],
    [
        'LANGUAGE',
        {
            value: 'LANGUAGE',
            text: "Idioma",
        },
    ],
    [
        'OTHER',
        {
            value: 'OTHER',
            text: "Otro",
        },
    ],
])

export const levelKnowledgeMap = new Map([
    [
        'BEGINNER',
        {
            value: 'BEGINNER',
            text: "Principiante",
        },
    ],
    [
        'INTERMEDIATE',
        {
            value: 'INTERMEDIATE',
            text: "Intermedio",
        },
    ],
    [
        'ADVANCED',
        {
            value: 'ADVANCED',
            text: "Avanzado",
        },
    ],
])

export const lineBusinessMap = new Map([
    [
        'EDUCATIONAL',
        {
            value: 'EDUCATIONAL',
            text: "Educativo",
        },
    ],
    [
        'GOVERNMENT',
        {
            value: 'GOVERNMENT',
            text: "Gobierno",
        },
    ],
    [
        'HEALTH',
        {
            value: 'HEALTH',
            text: "Salud",
        },
    ],
    [
        'ENVIRONMENT',
        {
            value: 'ENVIRONMENT',
            text: "Medio ambiente",
        },
    ],
    [
        'TOURISM',
        {
            value: 'TOURISM',
            text: "Turismo",
        },
    ],
    [
        'FOOD_AND_DRINKS',
        {
            value: 'FOOD_AND_DRINKS',
            text: "Alimentos y bebidas",
        },
    ],
    [
        'COMMUNICATION',
        {
            value: 'COMMUNICATION',
            text: "Comunicación",
        },
    ],
    [
        'CONSTRUCTION_AND_DESIGN',
        {
            value: 'CONSTRUCTION_AND_DESIGN',
            text: "Construcción y diseño",
        },
    ],
    [
        'ADMINISTRATION',
        {
            value: 'ADMINISTRATION',
            text: "Administración",
        },
    ],
    [
        'MANUFACTURE',
        {
            value: 'MANUFACTURE',
            text: "Manufactura",
        },
    ],
    [
        'OTHER',
        {
            value: 'OTHER',
            text: "Otro",
        },
    ],
])


export const daysValue = [
    { value: "Lunes", text: "Lunes" },
    { value: "Martes", text: "Martes" },
    { value: "Miércoles", text: "Miércoles" },
    { value: "Jueves", text: "Jueves" },
    { value: "Viernes", text: "Viernes" },
    { value: "Sábado", text: "Sábado" },
    { value: "Domingo", text: "Domingo" },

]

export const daysBirth = Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    text: (i + 1).toString(),
}));

export const monthBirth = [
    { value: 1, text: "Enero" },
    { value: 2, text: "Febrero" },
    { value: 3, text: "Marzo" },
    { value: 4, text: "Abril" },
    { value: 5, text: "Mayo" },
    { value: 6, text: "Junio" },
    { value: 7, text: "Julio" },
    { value: 8, text: "Agosto" },
    { value: 9, text: "Septiembre" },
    { value: 10, text: "Octubre" },
    { value: 11, text: "Noviembre" },
    { value: 12, text: "Diciembre" }
]

export const vacantType = [
    { value: 'JOB_POSITION', text: "Laboral" },
    { value: 'PROFESSIONAL_PRACTICE', text: "Prácticas profesionales" },
]

export const statusApplicationMap = new Map([
    [
        'PENDING',
        {
            value: 'PENDING',
            text: "Pendiente",
        },
    ],
    [
        'ACCEPTED',
        {
            value: 'ACCEPTED',
            text: "Aceptado",
        },
    ],
    [
        'REJECTED',
        {
            value: 'REJECTED',
            text: "Descartado",
        },
    ],
])

export const roleNameMap = new Map([
    [
        'BASIC',
        {
            value: 'BASIC',
            text: "BÁSICO",
        },
    ],
    [
        'BRONZE',
        {
            value: 'BRONZE',
            text: "BRONCE",
        },
    ],
    [
        'SILVER',
        {
            value: 'SILVER',
            text: "PLATA",
        },
    ],
    [
        'GOLD',
        {
            value: 'GOLD',
            text: "ORO",
        },
    ],
    [
        'PLATINUM',
        {
            value: 'PLATINUM',
            text: "PLATINO",
        },
    ],
    [
        'DIAMOND',
        {
            value: 'DIAMOND',
            text: "DIAMANTE",
        },
    ],
])

export const modeArray = [
    { value: "IN_PERSON", text: "Presencial" },
    { value: "REMOTE", text: "Remoto" },
    { value: "HYBRID", text: "Híbrido" },
]

export const modeVacantMap = new Map([
    [
        'IN_PERSON',
        {
            value: 'IN_PERSON',
            text: "Presencial",
        },
    ],
    [
        'REMOTE',
        {
            value: 'REMOTE',
            text: "Remoto",
        },
    ],
    [
        'HYBRID',
        {
            value: 'HYBRID',
            text: "Híbrido",
        },
    ],
])