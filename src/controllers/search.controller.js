
import db from '../db.js';

export async function searchDishes(req, res) {
    try{

        // reading the query parameter from the request
        const {name,minPrice,maxPrice} = req.query;

        // validating the query parameter
        if(!name || !minPrice || !maxPrice){
            return res.status(400).json({error: 'Missing required query parameters: name, minPrice, maxPrice'});
        }

        // converting minPrice and maxPrice to numbers
        const min = Number(minPrice);
        const max = Number(maxPrice);

        const sql = `
            SELECT
                r.id AS restaurantId,
                r.name AS restaurantName,
                r.city AS city,
                m.dish_name AS dishName,
                m.price AS dishPrice,
                COUNT(o.id) AS orderCount
            FROM menu_items m
            INNER JOIN restaurants r ON r.id = m.restaurant_id
            INNER JOIN orders o ON o.menu_item_id = m.id
            WHERE
                LOWER(m.dish_name) LIKE LOWER(CONCAT('%', ?, '%'))
                AND m.price BETWEEN ? AND ?
            GROUP BY r.id, r.name, r.city, m.id, m.dish_name, m.price
            ORDER BY orderCount DESC
            LIMIT 10 `;

            // executing the query with provided parameters
        const [rows] = await db.execute(sql, [name, min, max]);

        // sending the result as JSON response
        res.json({restaurants: rows});
    }
    catch (error) {
        console.error('Error searching dishes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }   
}

