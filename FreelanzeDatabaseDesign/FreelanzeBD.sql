-- Creating the Languages table
CREATE TABLE Languages (
    language_id INT NOT NULL,
    language_name CHAR(50) NOT NULL,
    PRIMARY KEY (language_id)
);

-- Creating the Skills table
CREATE TABLE Skills (
    skill_id INT NOT NULL,
    skill_name CHAR(50) NOT NULL,
    PRIMARY KEY (skill_id)
);

-- Creating the Users table
CREATE TABLE Users (
    user_id INT NOT NULL,
    user_name CHAR(50) NOT NULL,
    password CHAR(20) NOT NULL,
    email CHAR(250) NOT NULL,
    title CHAR(40) NOT NULL,
    address CHAR(200) NOT NULL,
    experience INT NULL,
    user_type CHAR(1) NOT NULL,
    summary_rating DECIMAL(12,2) NULL,
    user_status CHAR(1) NOT NULL,
    PRIMARY KEY (user_id)
);

-- Creating the UserLanguage table
CREATE TABLE UserLanguage (
    user_id INT NOT NULL,
    language_id INT NOT NULL,
    language_level INT NOT NULL,
    PRIMARY KEY (user_id, language_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (language_id) REFERENCES Languages(language_id)
);

-- Creating the UserSkill table
CREATE TABLE UserSkill (
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    skill_level INT NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id)
);

-- Creating the Orders table
CREATE TABLE Orders (
    order_id INT NOT NULL,
    freelance_user_id INT NOT NULL,
    employer_user_id INT NOT NULL,
    order_date DATE NOT NULL,
    order_no CHAR(10) NOT NULL,
    service_category CHAR(10) NOT NULL,
    project_details CHAR(200) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    project_fromdate DATE NOT NULL,
    project_todate DATE NOT NULL,
    freelance_reviewer_status CHAR(10) NULL,
    freelance_reviewer_desc CHAR(200) NULL,
    freelance_reviewer_rating INT NULL,
    employer_reviewer_status CHAR(10) NULL,
    employer_reviewer_desc CHAR(200) NULL,
    employer_reviewer_rating INT NULL,
    order_status CHAR(10) NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (freelance_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (employer_user_id) REFERENCES Users(user_id)
);

-- Creating the Chat table
CREATE TABLE Chat (
    chat_id INT NOT NULL,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    text CHAR(200) NOT NULL,
    timestamp DATETIME NOT NULL,
    PRIMARY KEY (chat_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Creating the Payments table
CREATE TABLE Payments (
    payment_id INT NOT NULL,
    order_id INT NOT NULL,
    payment_date DATE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    paid_status CHAR(10) NOT NULL,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
