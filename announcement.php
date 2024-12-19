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

// Fetch announcements from the database
$sql = "SELECT * FROM announcements ORDER BY date_posted DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Announcements - Portfolio</title>
</head>
<body>
    <style>
        /* Global Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header, footer {
    background-color: #333;
    color: white;
    padding: 20px 0;
    text-align: center;
}

footer p {
    margin: 0;
}

h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
}

small {
    font-size: 12px;
    color: #777;
}

/* Announcements Section */
.announcements {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.announcement {
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.announcement:last-child {
    border-bottom: none;
}

.announcement img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
}

/* Back Button */
.back {
    text-align: center;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
    .announcements {
        margin: 10px;
        padding: 15px;
    }

    h2 {
        font-size: 20px;
    }
}

    </style>
    <section class="announcements">
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<div class='announcement'>";
                echo "<h2>" . $row["title"] . "</h2>";
                echo "<p>" . $row["content"] . "</p>";

                // Display image if it exists
                if (!empty($row["image_path"])) {
                    echo "<img src='" . $row["image_path"] . "' alt='Announcement Image' style='max-width: 100%; height: auto;'><br><br>";
                }

                echo "<small>Posted on: " . $row["date_posted"] . "</small>";
                echo "</div>";
            }
        } else {
            echo "<p>No announcements found.</p>";
        }
        ?>
        <div class="back">
            <a href="index.html"><button>BACK</button></a>
        </div>
    </section>

    <footer>
        <p>&copy; <?php echo date("Y"); ?> My Portfolio. All rights reserved.</p>
    </footer>
</body>
</html>

<?php
$conn->close();
?>
