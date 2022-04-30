const express = require('express');
const app = express();
app.set('port', 3000);

app.use(express.static(__dirname));

app.listen(app.get('port'), function() {

	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname);
})