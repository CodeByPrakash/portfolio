<?php
// Connect to the database
$servername = "sql12.freesqldatabase.com";
$port = "3306"; // Default MySQL port or change if using a custom port
$username = "sql12753006"; // Your database username
$password = "DHFmYFXbAC"; // Your database password
$dbname = "sql12753006"; // Your database name

// Connect to the database using the custom port
$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $title = $_POST['title'];
    $content = $_POST['content'];
    
    // Handle file upload
    $target_dir = "uploads/"; // Folder where image will be stored
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
    // Check if the file is an actual image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check === false) {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }
    
    // Check file size (limit to 5MB)
    if ($_FILES["image"]["size"] > 5000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }
    
    // Allow certain file formats (e.g., JPG, JPEG, PNG, GIF)
    if ($imageFileType != "jpg" && $imageFileType != "jpeg" && $imageFileType != "png" && $imageFileType != "gif") {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }
    
    // Try to upload file if no error
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            // Insert data into the database including the image path
            $sql = "INSERT INTO announcements (title, content, image_path, date_posted) 
                    VALUES ('$title', '$content', '$target_file', NOW())";
            
            if ($conn->query($sql) === TRUE) {
                echo "New announcement added successfully!";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Add Announcement</title>
</head>
<body>
    <style>
        /* Global Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
}

header {
    background-color: #333;
    color: white;
    padding: 20px 0;
    text-align: center;
}

header h1 {
    margin: 0;
}

nav ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
}

nav ul li {
    display: inline;
    margin-right: 20px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

nav ul li a:hover {
    text-decoration: underline;
}

/* Main Section */
main {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

/* Form Styles */
form {
    display: flex;
    flex-direction: column;
}

form label {
    font-size: 16px;
    margin-bottom: 5px;
}

form input[type="text"], 
form textarea, 
form input[type="file"] {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 15px;
    width: 100%;
    box-sizing: border-box;
}

form textarea {
    resize: vertical;
}

button[type="submit"] {
    padding: 12px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button[type="submit"]:hover {
    background-color: #45a049;
}

/* Footer Styling */
footer {
    background-color: #333;
    color: white;
    padding: 15px 0;
    text-align: center;
}

footer p {
    margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
    main {
        margin: 10px;
        padding: 15px;
    }

    h2 {
        font-size: 20px;
    }

    form input[type="text"],
    form textarea,
    form input[type="file"] {
        font-size: 14px;
    }

    button[type="submit"] {
        font-size: 14px;
    }
}

    </style>
    <header>
        <h1>Admin Panel</h1>
        <nav>
            <ul>
                <li><a href="admin_dashboard.php">Dashboard</a></li>
                <li><a href="admin_insert.php">Add Announcement</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h2>Add New Announcement</h2>
        <form action="admin_insert.php" method="POST" enctype="multipart/form-data">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required><br><br>

            <label for="content">Content:</label><br>
            <textarea id="content" name="content" rows="5" cols="50" required></textarea><br><br>

            <label for="image">Image:</label>
            <input type="file" name="image" id="image" required><br><br>

            <button type="submit" name="submit">Submit Announcement</button>
        </form>
    </main>

    <footer>
        <p>&copy; <?php echo date("Y"); ?> My Portfolio. All rights reserved.</p>
    </footer>
</body>
</html>
