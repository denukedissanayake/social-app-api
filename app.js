import Express from "express";
const app = Express();
const PORT = 3005;

app.listen(PORT, () => console.log(`App is listning to PORT ${PORT}`))