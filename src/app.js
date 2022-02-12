const path = require('path')
const express = require('express')
const hbs = require('hbs');
const { url } = require('inspector');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

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

 app.get ("/help/*", (req, res) => {
  // res.send("help article not found")
  res.render("404", { 
    title: "404",
    name: "Stav Librowski",
    errorMessage: "help article not found",
  })
})

app.get("/weather",(req,res) => {
  if (!req.query.address) {
    return res.send({
        error: 'You must provide an address'
    })
}
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({error});
      }
      res.send(
        {
          address: req.query.address,
          forcast: forcastData,
          location: location
        }
      )
    })
  });
});

app.get('/products', (req, res) => {
  // נבדוק אם יש פרמטר חיפוש ואם לא אז נעצור את הפונקציה על ידי הריטורן כדי שלא יישלח פעמיים לקליינט
  if (!req.query.search) {
      return res.send({
          error: 'You must provide a search term'
      })
  }

  console.log(req.query.search)
  res.send({
      products: []
  })
})

//  לכל העמודים שלא קיימים - כלומר, שלא צויינו למעלה
app.get ("*", (req, res) => {
  // res.send("404 error")
  res.render("404", { 
    title: "404",
    name: "Stav Librowski",
    errorMessage: "not found"
  })
})

app.listen(3000, () => {
  console.log("Port 3000")
});








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

