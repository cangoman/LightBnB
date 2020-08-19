DELETE FROM property_reviews;
DELETE FROM reservations;
DELETE FROM properties;
DELETE FROM users;

INSERT INTO users (name, email, password) 
VALUES ('James Rodriguez', 
'lapelotasiempreal10@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Cristiano Ronaldo', 'madridsux@juventus.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Robert Lewandowski', 'bayern8barca2@championsleague.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('David Beckham', 'intermiami@spicegirls.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ronaldo Nazario', 'therealronaldo@fifa.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Carlos Valderrama', 'needahaircut@covid19.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');



INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, post_code, active) 
VALUES (1, 'Beautiful chalet with soccer field', 'description', 'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-2360673.jpg&fm=jpg', 'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-2360673.jpg&fm=jpg', 500, 2, 2, 4, 'Colombia', 'Pescaito', '155 Gol', 'Bolivar', 110011, TRUE),
(2, 'Cozy place with chimney', 'description', 'https://images.pexels.com/photos/1004682/pexels-photo-1004682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?cs=srgb&dl=pexels-tobias-bj%C3%B8rkli-2360673.jpg&fm=jpg', 1030, 5, 5, 8, 'Canada', 'Trois Rivieres', '234 Polar Bear Drive', 'Quebec', 'J1D 2C3', TRUE),
(5, 'Self powered cabin', 'description', 'https://images.pexels.com/photos/2750135/pexels-photo-2750135.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 'https://images.pexels.com/photos/2750135/pexels-photo-2750135.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 300, 2, 1, 3, 'Switzerland', 'Bern', '234 Chocolate Factory Road', 'Alps', 'J1D 2C3', TRUE);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 3, 6),
('2018-09-11', '2018-09-26', 3, 1),
('2018-12-20', '2018-12-26', 2, 3),
('2021-01-02', '2021-01-15', 1, 6),
('2019-09-11', '2019-09-26', 3, 5),
('2020-09-11', '2020-09-26', 1, 4);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (6,3, 1, 5, 'message'),
(2, 3, 2, 4, 'message'),
(3, 2, 3, 5, 'message'),
(5, 3, 5, 2, 'message');



