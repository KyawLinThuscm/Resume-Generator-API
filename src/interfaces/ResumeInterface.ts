export interface Education {
    education: string;
    school: string;
    startdate: string;
    endate: string;
    description: string;
}
export interface Employment {
    position: string;
    company: string;
    startdate: string;
    endate: string;
    description: string;
}
export interface Skills {
    skill: string;
    status: string;
}
export interface Languages {
    language: string;
    level: string;
}
export interface ResumeCreate {
    name: string,
    email: string,
    phone: string,
    address: string,
    dob: Date,
    gender: string,
    nationality: string,
    religion: string,
    description: string,
    education: [ Education ],
    employment: [ Employment ],
    skills: [Skills],
    languages: [Languages],
    profile: string
}