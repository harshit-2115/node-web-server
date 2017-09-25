const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');



app.use((req,res,next) => {
	var now = new Date().toString();
	var log =`${now}: ${req.method} ${req.url} `;
	console.log(log);
	fs.appendFile('server.log', log + "\n",(err) => {
		if (err) {

			console.log("Unable to Append");
		}
	});
	next();
}); 
app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear',() =>
{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});
app.get('/', (req,res) =>{
// res.send("<h1>Hello World</h1>");
res.render('home.hbs', {
	pageTitle: 'Home Page',
	// currentYear: new Date().getFullYear()
})
});
app.get('/about',(req,res) =>{
// res.send('About Page');
res.render('about.hbs', {
	pageTitle: 'About Page',
	// currentYear: new Date().getFullYear()
}); 
});
// req: info about the request
// res: methods about response
app.listen(port, () => {
	console.log("Server is Up");

});