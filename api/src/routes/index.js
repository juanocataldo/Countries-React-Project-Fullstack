const { Country } = require("../db");

const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/home/all' , async (req, res) => {
  try {
    const allCountries = await Country.findAll()
    res.json(allCountries)
  } catch (error) {
    res.status(400).json({msg: error.message()})
  }
})

//PAGINACIÓN
router.get("/home", async (req, res) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
    const { order, poblation } = req.query;

    let page = 0;
    let size = 10;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }

    if(poblation !== ''){
      const allCountries = await Country.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [
          ["country_poblation", poblation]
        ]
      });

      res.json(allCountries.rows);
    }else{
      const allCountries = await Country.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [
          ["country_name", order]          
        ]
      });

      res.json(allCountries.rows);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      country_id,
      country_name,
      country_flag,
      country_continent,
      country_capital,
      country_subregion,
      country_area,
      country_poblation,
    } = req.body;

    const adding = await Country.create({
      country_id,
      country_name,
      country_flag,
      country_continent,
      country_capital,
      country_subregion,
      country_area,
      country_poblation,
    });

    res.send({ msg: "ok" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
