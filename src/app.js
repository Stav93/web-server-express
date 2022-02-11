const path = require('path')
const express = require('express')
const hbs = require('hbs')

// המיקום של הקובץ הנוכחי
console.log(__dirname);
// מעבר לקובץ או תיקייה אחרת - פה לתיקיית פבליק
console.log(path.join(__dirname,"../public"))

//אקספרס היא פונקציה ואנחנו נקרא לה כדי ליצור אפליקציה חדשה
const app = express();

//define path for Express config
//המיקום ממנו נרצה לקבל את הדברים הסטטים, שלא משתנים
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// express.static() -- נותן את הפאט
// Setup static directory to serve
// מחפש קבצים בתיקיית פאבליק
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
// שמים באקספרס את החבילה שהורדנו
app.set('view engine', 'hbs')
app.set('views', viewsPath);
// register partial לוקח את המיקום שבו הם נמצאים
hbs.registerPartials(partialsPath);

// שולחים עם רנדר את קובץ האינדקס שבתיקייה ויוז
// app.get('', (req, res) => {
//   res.render('index')
//   })

// אם רוצים להגדיר דינמית מה יהיה בדף
app.get('', (req, res) => {
  // אקספרס מרנדרת את הקובץ לhtml
  res.render('index', {
      title: "Weather",
      name: "Stav Librowski"
    });
 })

app.get('/about', (req, res) => {
    res.render('about', {
      title: "About me",
      name: "Stav Librowski"
    });
 })

app.get('/help', (req, res) => {
    res.render('help', {
      message: "Hellooooooooo!",
      title: "header",
      name: "Stav Librowski",
      
    });
 })



// ----------------------------------------------------------------------------
//מה השרת צריך לעשות כשמבקשים משהו מיוארל מסוים
//האם להחזיר הטמל או להחזיר גייסון
//הפרמטר הראשון הוא הנתיב הספציפי והפרמטר השני הוא הפונקציה של מה עושים

// app.get("",(req,res) => {
//   res.send("Hello!")
// });

//אפשר לשלוח הטמל
// app.get("",(req,res) => {
//   res.send("<h1>Home Page</h1>")
// });

//אפשר לשלוח גייסון והוא יעשה לו סטרינגיפיי אטומטית
//אפשר גם לעשות מערך של כמה אובייקטים
// app.get("/help",(req,res) => {
//   res.send(
//   {
//     name: "Stav",
//     age: 29,
//   }
//   )
// });

// app.get("/about",(req,res) => {
//   res.send("<h3>About Page!</h3>")
// });

app.get("/weather",(req,res) => {
  res.send(
    {
      location: "Tel Aviv",
      forcast: 10,
    }
  )
});

app.listen(3000, () => {
  console.log("Port 3000")
});


