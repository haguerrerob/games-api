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
      const games = await axios.get(`https://www.freetogame.com/api/games`)
      for (const el of games.data) {
        // (for..of..) is multiple asynchronous calls.
        genreType.push(el.genre)
        const filename = path
          .join(process.cwd(), '/src/img/')
          .concat(`thumbnail_half_${el.id}.jpg`)
        console.log(filename)
        Jimp.read(el.thumbnail).then((image) => {
          image.greyscale().scale(0.5).write(filename)
        })
        await Game.create({
          id: el.id,
          title: el.title,
          thumbnail: el.thumbnail,
          thumbnail_half: filename,
          short_description: el.short_description,
          game_url: el.game_url,
          genre: el.genre,
          platform: el.platform,
          publisher: el.publisher,
          developer: el.developer,
          release_date: el.release_date,
          freetogame_profile_url: el.freetogame_profile_url
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
