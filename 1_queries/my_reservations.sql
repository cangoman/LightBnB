SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
FROM reservations 
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON property_reviews.id = reservations.property_id
WHERE reservations.guest_id = 1 AND end_date > now()::date
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;