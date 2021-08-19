CREATE TABLE customer
(
    id         VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(20)  NOT NULL
);

CREATE TABLE user
(
    id         VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    username   VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL

);

CREATE TABLE load_dimensions
(
    id         VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    created_at TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    weight     DECIMAL NOT NULL,
    height     DECIMAL NOT NULL,
    width      DECIMAL NOT NULL,
    depth      DECIMAL NOT NULL
);


CREATE TABLE transport
(
    id               VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    created_at       TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    origin_city      VARCHAR(255) NOT NULL,
    destination_city VARCHAR(255) NOT NULL

);


CREATE TABLE position_quotation
(
    id                VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    created_at        TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    created_by        VARCHAR(36) NOT NULL,
    fk_customer       VARCHAR(36) NOT NULL,
    fk_transport      VARCHAR(36) NOT NULL,
    fk_load_dimension VARCHAR(36) NOT NULL,

    CONSTRAINT fk_created_by_user_id FOREIGN KEY (created_by) REFERENCES user (id),
    CONSTRAINT fk_customer_customer_id FOREIGN KEY (fk_customer) REFERENCES customer (id),
    CONSTRAINT fk_transport_transport_id FOREIGN KEY (fk_transport) REFERENCES transport (id),
    CONSTRAINT fk_load_dimensions_load_dimensions_id FOREIGN KEY (fk_load_dimension) REFERENCES load_dimensions (id)
);
