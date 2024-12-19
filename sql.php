<?php
// Database connection settings
$servername = "sql12.freesqldatabase.com";
$port = "3306"; // Default MySQL port or change if using a custom port
$username = "sql12753006"; // Your database username
$password = "DHFmYFXbAC"; // Your database password
$dbname = "sql12753006"; // Your database name

// Connect to the database using the custom port
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to create the 'announcements' table
$sql = "
CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255),
    date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";

// Execute the query
if ($conn->query($sql) === TRUE) {
    echo "Table 'announcements' created successfully.";
} else {
    echo "Error creating table: " . $conn->error;
}

// Close the connection
$conn->close();
?>
