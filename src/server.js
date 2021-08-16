const express = require("express");
const app = express();
const mercadopago = require("mercadopago");
const pool= require("./database");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken("TEST-7129100571881140-081600-6aa73f687457a64ddbd00f6cc84f4e73-15128532"); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./client"));

app.get("/", function (req, res) {
  res.status(200).sendFile("index.html");
}); 

app.get('/getArticulos', async(req, res)=>{
    try {
        const Articulos = await pool.query(
            "SELECT * FROM \"Tabla1\""
           // "INSERT INTO \"Articulos\"(name) VALUES($1)", [name]
        );
        res.json(Articulos.rows);
    } catch (error) {
        console.log(`error : ${error.message}`);
    }
});

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [{
			title: req.body.description,
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: 'approved',
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function(request, response) {
	 response.json({
		Payment: request.query.payment_id,
		Status: request.query.status,
		MerchantOrder: request.query.merchant_order_id
	})
});

app.listen(8080, () => {
  console.log("The server is now running on Port 8080");
});
