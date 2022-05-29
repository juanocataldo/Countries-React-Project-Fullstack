const { Country } = require("../db");

const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//PAGINACIÓN
router.get("/home", async (req, res) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    let size = 10;

    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }

     console.log(`pageAsNumber is ${pageAsNumber} and sizeAsNumber is ${sizeAsNumber}`)
     console.log(`Page is ${page} and size is ${size}`)

    const allCountries = await Country.findAndCountAll({
      limit: size,
      offset: page * size,
    });

    res.json({
      content: allCountries.rows,
      totalPages: Math.ceil(allCountries.count / size),
    });
  } catch (error) {
    res.status(400).json({ msg: error.msg() });
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

    res.send({msg:"ok"});
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
