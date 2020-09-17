import App from './app';
const port = process.env.PORT || 3333;

console.log('### =======================================');
console.log(`Running`);
console.log(`App listening on port ${port}!`);
console.log('### =======================================');

App.app.listen(port);
