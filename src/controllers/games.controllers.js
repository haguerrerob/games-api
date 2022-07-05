import path from 'path'
import Jimp from 'jimp'
import axios from 'axios'
import quantityxGen from './gamemodules.js'

import _ from '../db'
const { Game, Genre } = _

export const getGames = async (req, res) => {
  try {
    const result = await Game.findAll()
    if (result.length < 1) {
      const genreType = []
      // Peticióin a la API de todos los juegos...
      const games = await axios.get(`https://www.freetogame.com/api/games`)
      for (const el of games.data) {
        // (for..of..) is multiple asynchronous calls.
        genreType.push(el.genre)
        const filename = path
          .join(process.cwd(), '/public/img/')
          .concat(`thumbnail_half_${el.id}.jpg`)
        Jimp.read(el.thumbnail).then((image) => {
          image.greyscale().scale(0.5).write(filename)
        })
        const dataGame = await axios.get(
          `https://www.freetogame.com/api/game?id=${el.id}`
        )
        await Game.create({
          id: el.id,
          title: el.title,
          thumbnail: el.thumbnail,
          thumbnail_half: filename,
          data: dataGame.data
        })
      }
      res.send(games.data)

      //Determinamos la cantidad de juegos por genero
      const resultA = quantityxGen(genreType)
      for (let clave in resultA) {
        await Genre.create({
          genretype: clave,
          quantity: resultA[clave]
        })
      }
    } else {
      console.log('Hay datos')
      res.send(result)
    }
  } catch (err) {
    console.error(err)
  }
}

export const getGamesbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const data = await Game.findOne({
      where: { id }
    })
    res.send(data)
  } catch (err) {
    console.error(err)
  }
}
