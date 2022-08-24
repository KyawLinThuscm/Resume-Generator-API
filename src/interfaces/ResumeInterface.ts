export interface Education {
    education: string;
    school: string;
    startdate: string;
    enddate: string;
    description: string;
}
export interface Employment {
    position: string;
    company: string;
    startdate: string;
    enddate: string;
    description: string;
}
export interface Skills {
    skill: string;
    level: string;
}
export interface Languages {
    language: string;
    level: string;
}
 export interface Personal {
    name: string,
    email: string,
    phone: string,
    address: string,
    dob: Date,
    gender: string,
    nationality: string,
    religion: string,
    description: string,
}
export interface ResumeCreate {
    personal: Personal,
    education: [ Education ],
    employment: [ Employment ],
    skills: [Skills],
    languages: [Languages],
    profile: string
}