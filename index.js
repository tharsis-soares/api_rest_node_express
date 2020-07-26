const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var DB = {

    games: [

        {
            id: 23,
            title: 'Call of Duty',
            year: 2020,
            price: 60
        },
        {
            id: 33,
            title: 'Offspring',
            year: 2020,
            price: 60
        },
        {
            id: 32,
            title: 'GTA',
            year: 2020,
            price: 60
        },
        {
            id: 11,
            title: 'Call of Duty War Zone',
            year: 2020,
            price: 160
        },
    ]
}

app.get('/games',(req, res) => {
    res.statusCode = 200
    res.json(DB.games)

})

app.get('/games/:id',(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        
        var id = parseInt(req.params.id)
        
        var game = DB.games.find(g => g.id == id)
        
        if(game != undefined){
            res.statusCode = 200
            res.json(game)
        }else{
            res.sendStatus(404)
        }
    }
})


app.post('/game',(req, res) => {
    var {title, price, year} = req.body
    // falta validar todos os dados
    DB.games.push({
        id: 233,
        title,
        price,
        year
    })
    res.sendStatus(200)
})


app.put('/game/:id',(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)
        
        if(game != undefined){
            var {title, price, year} = req.body    
            if(title != undefined){
                game.title = title
            }
            
            if(price != undefined){
                game.price = price
            }

            if(year != undefined){
                game.year = year
            }

            res.sendStatus(200)
            
        }else{
            res.sendStatus(404)
        }
    }
})



// somente axios, ajax, fetch api JS usam delete()

app.delete('/game/:id',(req, res) => {
    var id = req.body.id

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex(g => g.id == id)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index,1)
            res.sendStatus(200)
        }
    }   
})

app.listen(45678,() => {
    console.log('Api rodando!!')
})