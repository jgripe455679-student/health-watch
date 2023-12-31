export interface NewUser extends BasicInformation, Address, Credential {
    readonly user_role: string;
}

export interface BasicInformation {
    first_name: string;
    middle_name: string;
    last_name: string;
    date_of_birth: string;
    sex: string;
    relationship_status: string;
    phone_number: string;
}

export interface Address {
    address_line_one: string;
    address_line_two: string;
    address_line_three: string;
    province: string;
    city: string;
    barangay: string;
    zip_code: string;
}

export interface Credential {
    email: string;
    password: string;
    re_password: string;
}

export type NewUserContextType = {
    newUser: NewUser;
    mergeData: (data: NewUser) => void; 
}