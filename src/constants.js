export const API_URL = "http://127.0.0.1:8000/";
export const FILE_URL = import.meta.env.VITE_FILES_URL

export const typeKnowledge = [
    { value: "SOFTWARE", text: "Software" },
    { value: "LANGUAGE", text: "Lenguaje" },
    { value: "OTHER", text: "Otro" },
]

export const levelKnowledge = [
    { value: "BEGINNER", text: "Principiante" },
    { value: "INTERMEDIATE", text: "Intermedio" },
    { value: "ADVANCED", text: "Avanzado" },
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
            text: "Lenguaje",
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