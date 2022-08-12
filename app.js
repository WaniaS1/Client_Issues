var express = require('express')
var bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express()
let db

//connect to db------------------------------------------------
connectToDb((err) => {
  if(!err){
    app.listen(3001, () =>{
      console.log('app listening on port 3001')
    })
    db = getDb()
  }
  else{
    console.log('Connection to the database cannot be established app.js')
  }
})
//routes --------------------------------------------------------------
app.use(express.static('./public'))
app.set('view engine', 'ejs')

let questionsArray = []
app.get('/wsparcie', (req, res) => {
  questionsArray = []
  db.collection('questions_sdf3').find().sort({stars:-1}).forEach(item =>{
    questionsArray.push(item)
  })
  .then((result) => {
    res.status(200).sendFile(__dirname +'/views/wsparcie.html')
  })
  .catch(err=>{
    res.status(500).json({blad: err, commentary: "Could not get data"})
  })

})

app.get('/wsparcieGetDb', (req, res) =>{
  res.json(questionsArray)
})

//development----------------------------------------------------------------------

let question0 = {content: 'Drukarka VTP', intro: '', options: [{option: 'Skąd pobrać aplikacje?', content: 'Aplikacja jest dostępna pod linkiem: <a href ="https://wirtualna.novitus.pl/install/vtp.apk">https://wirtualna.novitus.pl/install/vtp.apk</a></p><p>Proszę pobrać aplikację z powyższego linku na urządzenie mobilne, na którym zainstalowano aplikację kasy wirtualnej SDF-1'}, {option: 'Drukarka nie drukuje raportów', content: 'Proszę się upewnić, że aplikacja SDF-1 została prawidłowo skonfigurowana. W tym celu uruchamiamy aplikację SDF-1 i wciskamy przycisk znajdujący się u dołu ekranu: "USTAWIENIA PODŁ. DRUKARKI". Konfiguracja musi być zgodna ze zdjęciem. W polu IP może widnieć również informacja: <b>"localhost"</b> lub pole może być <b>puste</b> - drukarka będzie działać prawidłowo.</p><p><img src = "/assets/image/vtp2.jpg" alt = "wirtualna drukarka VTP"/>'}]}
let question1 = {content: 'Raport Miesięczny', intro: 'Raport miesięczny jest budowany na podstawie raportów dobowych, więc jeśli raport nie zawiera wszystkich dni to w te dni raport dobowy się nie wykonał. Raport dobowy zawiera sprzedaż od poprzedniego raportu dobowego, więc jeśli danego dnia raport nie został wykonany to sprzedaż z niego zostanie doliczona do kolejnego raportu dobowego.', options: ['Nie mogę wykonać raportu','Na raporcie nie ma wszystkich dni']}
let question2 = {content: 'Uszkodzenie urządzenia', intro: '', options: ['Uszkodzenie telefonu', 'Usunięcie, odinstalowanie aplikacji SDF-1', 'Bład 404 / błąd spójności bazy danych']}
let question3 = {content: "Zakończenie współpracy", intro: "", options: []}
let question4 = {content: "Błędne dane na paragonie", intro: "Wybierz dane, które nie zgadzają się na twoim paragonie:", options: [{option: "Adres firmy", content: "Prosimy o kontakt z wsparciem technicznym kasy wirtualnej dla Partnera, z którym współpracujecie.</p> <p>Dane muszą zostać zmienione na serwerze dlatego niezbędne jest zaangażowanie naszych administratorów danych."},{option:"Stawka VAT", content: "Prosimy o kontakt z wsparciem technicznym kasy wirtualnej dla Partnera, z którym współpracujecie.</p><p>Dane muszą zostać zmienione na serwerze dlatego niezbędne jest zaangażowanie naszych administratorów danych."},{option: "Nr boczny / Nr rejestracyjny", content: "Prosimy o kontakt z partnerem, z którym współpracujecie.</p><p>Dane muszą zostać zmienione na serwerze dlatego niezbędne jest zaangażowanie administratorów danych."}]}
app.post('/wsparcie', (req, res) =>{
  db.collection('questions').insertOne(question0)
    .then((result)=>{
      res.status(200).json(result)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
})

let toDelete = {content: 'Drukarka VTP'}
app.delete('/wsparcie', (req, res) =>{
  db.collection('questions').deleteOne(toDelete)
  .then(result =>{
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})
