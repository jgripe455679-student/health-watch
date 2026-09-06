CREATE TABLE tbl_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE tbl_permissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resource VARCHAR(255) NOT NULL,
    operation VARCHAR(255) NOT NULL,
    CONSTRAINT uq_permission_resource_operation
        UNIQUE (resource, operation)
);

CREATE TABLE tbl_services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tbl_users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    created_by_id BIGINT NULL,
    updated_at DATETIME(6) NULL,
    updated_by_id BIGINT NULL,
    account_non_expired BOOLEAN NOT NULL,
    account_non_locked BOOLEAN NOT NULL,
    credentials_non_expired BOOLEAN NOT NULL,
    enabled BOOLEAN NOT NULL,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id) REFERENCES tbl_roles(id),
    CONSTRAINT fk_user_created_by
        FOREIGN KEY (created_by_id) REFERENCES tbl_users(id),
    CONSTRAINT fk_user_updated_by
        FOREIGN KEY (updated_by_id) REFERENCES tbl_users(id)
);

CREATE TABLE tbl_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    suffix VARCHAR(255),
    date_of_birth DATE NOT NULL,
    age SMALLINT NOT NULL,
    gender VARCHAR(255) NOT NULL,
    marital_status VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email_address VARCHAR(255),
    mobile_number VARCHAR(255) NOT NULL,
    occupation VARCHAR(255),
    educational_background VARCHAR(255),
    created_at DATETIME(6) NOT NULL,
    created_by_id BIGINT,
    updated_at DATETIME(6),
    updated_by_id BIGINT,
    archived BOOLEAN,

    CONSTRAINT fk_profile_created_by
        FOREIGN KEY (created_by_id) REFERENCES tbl_users(id),
    CONSTRAINT fk_profile_updated_by
        FOREIGN KEY (updated_by_id) REFERENCES tbl_users(id)
);

CREATE TABLE tbl_records (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    record_date DATE NOT NULL,
    profile_id BIGINT,
    service_id BIGINT,
    height INT,
    weight INT,
    blood_pressure VARCHAR(255),
    pulse_rate INT,
    health_condition VARCHAR(255),
    medical_problem VARCHAR(255),
    diagnosis VARCHAR(255),
    medication VARCHAR(255),
    notes VARCHAR(255),
    created_at DATETIME(6) NOT NULL,
    created_by_id BIGINT,
    updated_at DATETIME(6),
    updated_by_id BIGINT,

    CONSTRAINT fk_record_profile
        FOREIGN KEY (profile_id) REFERENCES tbl_profiles(id),
    CONSTRAINT fk_record_service
        FOREIGN KEY (service_id) REFERENCES tbl_services(id),
    CONSTRAINT fk_record_created_by
        FOREIGN KEY (created_by_id) REFERENCES tbl_users(id),
    CONSTRAINT fk_record_updated_by
        FOREIGN KEY (updated_by_id) REFERENCES tbl_users(id)
);

CREATE TABLE tbl_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type TINYINT,
    `value` VARCHAR(255),
    expiry_utc DATETIME(6),
    disabled BOOLEAN NOT NULL,
    user_id BIGINT,

    CONSTRAINT fk_token_user
        FOREIGN KEY (user_id) REFERENCES tbl_users(id)
);

CREATE TABLE role_permission (
    role_id BIGINT NOT NULL,
    permission_id BIGINT NOT NULL,
    PRIMARY KEY (role_id, permission_id),

    CONSTRAINT fk_role_permission_role
        FOREIGN KEY (role_id) REFERENCES tbl_roles(id),
    CONSTRAINT fk_role_permission_permission
        FOREIGN KEY (permission_id) REFERENCES tbl_permissions(id)
);