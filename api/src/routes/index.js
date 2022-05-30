const { Country, Tourist_activity } = require("../db");

const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAIGO ACTIVIDADES SEGUN ID DE PAIS
router.get('/eager/:id', async(req, res) =>{
  try {
    const {id} = req.params;
    const allData = await Country.findAll({
      include: Tourist_activity,
      where:{
        country_id : id
      }
    });

    res.json(allData)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
})


router.get('/details/:id', async(req, res) =>{  
  try {
    const {id} = req.params
    console.log('id en ruta details ',id)
    const country = await Country.findByPk(id)
    res.json(country)    
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
})

router.get('/activities', async(req, res) => {
  try {
    let activities = await Tourist_activity.findAll();
    res.json(activities)
  } catch (error) {
    res.status(400).json({msg:error.message})
  }
})

router.put('/activity_country', async (req, res) => {
  try {
    const {country_id, touact_id} = req.body
    
    let country = await Country.findByPk(country_id)
    console.log('country para actividad ',country)
    let touact_id2 = await Tourist_activity.findAll({   
      raw: true,   
      order: [
        ["touact_id", "DESC"]
      ],
      limit:1
    })
    // const activity = await Tourist_activity.findByPk()
    console.log('EL ID PARA INSERTAR (EL ULTIMO) ', touact_id2[0].touact_id)
    res.json(await country.addTourist_activity(touact_id2[0].touact_id))        
  } catch (error) {
    res.status(400).json({msg:error.message})
  }
})

router.post('/activity' , async (req, res) => {
  try {

    const {touact_name, touact_difficulty, touact_duration, touact_season} = req.body;

    const activity = await Tourist_activity.create({
      touact_name,
      touact_difficulty,
      touact_duration,
      touact_season
    })

    console.log('Actividad creada ', activity)

    res.send({msg:"done"})

  } catch (error) {
    res.status(400).json({msg: error.message })
  }
})

router.get('/home/all' , async (req, res) => {
  try {
    const allCountries = await Country.findAll()
    res.json(allCountries)
  } catch (error) {
    res.status(400).json({msg: error.message })
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
