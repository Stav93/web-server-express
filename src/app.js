const path = require('path')
const express = require('express')
//אקספרס היא פונקציה ואנחנו נקרא לה כדי ליצור אפליקציה חדשה

// המיקום של הקובץ הנוכחי
console.log(__dirname);
// מעבר לקובץ או תיקייה אחרת - פה לתיקיית פבליק
console.log(path.join(__dirname,"../public"))

const app = express();
//המיקום ממנו נרצה לקבל את הדברים הסטטים, שלא משתנים
const publicDirectoryPath = path.join(__dirname, '../public')

// express.static() -- נותן את הפאט
// app.use(express.static(publicDirectoryPath))

// שמים באקספרס את החבילה שהורדנו
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../public/views'));
// שולחים עם רנדר את קובץ האינדקס שבתיקייה ויוז
app.get('', (req, res) => {
  // אקספרס מרנדרת את הקובץ לhtml
  res.render('index')
  })

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


